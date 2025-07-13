import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter required" });
      }
      const courses = await storage.searchCourses(query);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to search courses" });
    }
  });

  app.get("/api/courses/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const courses = await storage.getCoursesByCategory(category);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses by category" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const course = await storage.getCourse(id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });

  // Scholarship calculation endpoint
  app.post("/api/scholarship/calculate", async (req, res) => {
    try {
      const { courseName, duration } = req.body;
      const course = await storage.getCourseByName(courseName);
      
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      const originalFee = course.annualFee;
      const scholarshipDiscount = 0.2; // 20% discount
      const feeAfterScholarship = originalFee * (1 - scholarshipDiscount);
      const annualSavings = originalFee - feeAfterScholarship;
      
      // Calculate total savings based on duration
      const durationYears = duration.includes("3 + 1") ? 4 : 
                           duration.includes("3") ? 3 : 
                           duration.includes("2") ? 2 : 1;
      const totalSavings = annualSavings * durationYears;

      res.json({
        originalFee,
        feeAfterScholarship,
        annualSavings,
        totalSavings,
        scholarshipPercentage: scholarshipDiscount * 100,
        duration: durationYears
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate scholarship" });
    }
  });

  // Vapi.ai webhook endpoint for voice interactions
  app.post("/api/vapi/webhook", async (req, res) => {
    try {
      const { type, call, message } = req.body;
      
      if (type === "function-call" && message?.function_call) {
        const { name, arguments: args } = message.function_call;
        
        switch (name) {
          case "getCourseInfo":
            const courseQuery = JSON.parse(args).courseName;
            const course = await storage.getCourseByName(courseQuery);
            
            if (course) {
              const feeAfterScholarship = course.annualFee * 0.8; // 20% discount
              return res.json({
                result: `I found information about ${course.name}. It's a ${course.duration} program with an annual fee of ₹${course.annualFee.toLocaleString('en-IN')}. With our 20% scholarship, you'll pay ₹${feeAfterScholarship.toLocaleString('en-IN')} per year, saving ₹${(course.annualFee - feeAfterScholarship).toLocaleString('en-IN')} annually.`
              });
            } else {
              return res.json({
                result: "I'm afraid I don't have that information yet, but I can pass your query to our human counselor."
              });
            }
            
          case "searchCourses":
            const category = JSON.parse(args).category;
            const courses = await storage.getCoursesByCategory(category);
            
            if (courses.length > 0) {
              const courseList = courses.map(c => `${c.name} (${c.duration})`).join(", ");
              return res.json({
                result: `Here are the available ${category} courses: ${courseList}. Would you like more details about any specific course?`
              });
            } else {
              return res.json({
                result: "I couldn't find any courses in that category. Let me check what other options we have available."
              });
            }
            
          case "getScholarshipInfo":
            const scholarshipCourse = JSON.parse(args).courseName;
            const foundCourse = await storage.getCourseByName(scholarshipCourse);
            
            if (foundCourse) {
              const originalFee = foundCourse.annualFee;
              const discountedFee = originalFee * 0.8;
              const savings = originalFee - discountedFee;
              
              return res.json({
                result: `For ${foundCourse.name}, the original annual fee is ₹${originalFee.toLocaleString('en-IN')}. With our 20% scholarship, you'll pay ₹${discountedFee.toLocaleString('en-IN')} per year, saving ₹${savings.toLocaleString('en-IN')} annually.`
              });
            } else {
              return res.json({
                result: "I need more information about which course you're interested in to calculate the scholarship details."
              });
            }
            
          default:
            return res.json({
              result: "I'm not sure how to help with that. Could you please rephrase your question?"
            });
        }
      }
      
      // Log the call for analytics
      if (type === "call-ended" && call) {
        await storage.createVoiceCallLog({
          sessionId: call.id,
          transcript: call.transcript || "",
          duration: call.duration || 0,
          coursesDiscussed: call.coursesDiscussed || [],
          scholarshipCalculated: call.scholarshipCalculated || false,
          timestamp: new Date().toISOString()
        });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Vapi webhook error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });

  // Voice call logs endpoint
  app.get("/api/voice-logs", async (req, res) => {
    try {
      const sessionId = req.query.sessionId as string;
      if (sessionId) {
        const logs = await storage.getVoiceCallLogsBySessionId(sessionId);
        res.json(logs);
      } else {
        res.status(400).json({ error: "Session ID required" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch voice logs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
