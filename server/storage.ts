import { users, courses, voiceCallLogs, type User, type InsertUser, type Course, type InsertCourse, type VoiceCallLog, type InsertVoiceCallLog } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course methods
  getCourse(id: number): Promise<Course | undefined>;
  getCourseByName(name: string): Promise<Course | undefined>;
  getAllCourses(): Promise<Course[]>;
  searchCourses(query: string): Promise<Course[]>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Voice call log methods
  createVoiceCallLog(log: InsertVoiceCallLog): Promise<VoiceCallLog>;
  getVoiceCallLog(id: number): Promise<VoiceCallLog | undefined>;
  getVoiceCallLogsBySessionId(sessionId: string): Promise<VoiceCallLog[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private voiceCallLogs: Map<number, VoiceCallLog>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentVoiceCallLogId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.voiceCallLogs = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentVoiceCallLogId = 1;
    
    // Initialize with course data
    this.initializeCourseData();
  }

  private initializeCourseData() {
    const courseData = [
      { name: "BBA (with industry certificates)", duration: "3 yrs", annualFee: 112000, category: "undergraduate" },
      { name: "BSc IT", duration: "3 yrs", annualFee: 120000, category: "undergraduate" },
      { name: "BCA", duration: "3 yrs", annualFee: 110000, category: "undergraduate" },
      { name: "BSc Computer Science", duration: "3 yrs", annualFee: 115000, category: "undergraduate" },
      { name: "BSc Mathematics", duration: "3 yrs", annualFee: 105000, category: "undergraduate" },
      { name: "BSc Physics", duration: "3 yrs", annualFee: 108000, category: "undergraduate" },
      { name: "MSc Computer Science", duration: "2 yrs", annualFee: 140000, category: "postgraduate" },
      { name: "MSc IT", duration: "2 yrs", annualFee: 135000, category: "postgraduate" },
      { name: "MSc Mathematics", duration: "2 yrs", annualFee: 125000, category: "postgraduate" },
      { name: "MSc Physics", duration: "2 yrs", annualFee: 130000, category: "postgraduate" },
      { name: "MCA", duration: "3 + 1 yrs", annualFee: 145000, category: "postgraduate" },
      { name: "MBA (Digital Marketing)", duration: "2 yrs", annualFee: 180000, category: "postgraduate" },
      { name: "Certificate in Web Development", duration: "6 months", annualFee: 50000, category: "certificate" },
      { name: "Certificate in Data Science", duration: "8 months", annualFee: 60000, category: "certificate" },
      { name: "Certificate in AI/ML", duration: "10 months", annualFee: 70000, category: "certificate" }
    ];

    courseData.forEach(course => {
      const id = this.currentCourseId++;
      this.courses.set(id, { id, ...course, description: null });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Course methods
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCourseByName(name: string): Promise<Course | undefined> {
    return Array.from(this.courses.values()).find(course => 
      course.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async searchCourses(query: string): Promise<Course[]> {
    const queryLower = query.toLowerCase();
    return Array.from(this.courses.values()).filter(course =>
      course.name.toLowerCase().includes(queryLower) ||
      course.category.toLowerCase().includes(queryLower)
    );
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course =>
      course.category.toLowerCase() === category.toLowerCase()
    );
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }

  // Voice call log methods
  async createVoiceCallLog(insertLog: InsertVoiceCallLog): Promise<VoiceCallLog> {
    const id = this.currentVoiceCallLogId++;
    const log: VoiceCallLog = { ...insertLog, id };
    this.voiceCallLogs.set(id, log);
    return log;
  }

  async getVoiceCallLog(id: number): Promise<VoiceCallLog | undefined> {
    return this.voiceCallLogs.get(id);
  }

  async getVoiceCallLogsBySessionId(sessionId: string): Promise<VoiceCallLog[]> {
    return Array.from(this.voiceCallLogs.values()).filter(log => log.sessionId === sessionId);
  }
}

export const storage = new MemStorage();
