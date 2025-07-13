import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Phone, Clock, Brain, Shield, Mic, Calculator, Smartphone, HelpCircle } from 'lucide-react';
import { VoiceInterface } from '@/components/voice-interface';
import { CourseGrid } from '@/components/course-grid';
import { ScholarshipCalculator } from '@/components/scholarship-calculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Voice Admissions Counselor</h1>
                <p className="text-sm text-gray-600">AI-Powered University Guidance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Available 24/7</span>
              </div>
              <Button variant="outline" className="text-sm font-medium">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get Instant Admissions Guidance
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Speak directly with our AI-powered voice counselor to get personalized course recommendations, fee information, and scholarship details.
            </p>
            
            {/* Voice Call Interface */}
            <VoiceInterface />
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-white/80">Available Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">20%</div>
              <div className="text-white/80">Scholarship Discount</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI voice counselor guides you through the admissions process with personalized recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Start Call</h4>
              <p className="text-sm text-gray-600">Click the button to begin your voice consultation</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Share Interests</h4>
              <p className="text-sm text-gray-600">Tell us about your course preferences and goals</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Get Recommendations</h4>
              <p className="text-sm text-gray-600">Receive personalized course and scholarship information</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">4. Make Decision</h4>
              <p className="text-sm text-gray-600">Get all the details you need to choose your path</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Information */}
      <section className="py-16 px-4 bg-white">
        <CourseGrid />
      </section>

      {/* Scholarship Calculator */}
      <section className="py-16 px-4 bg-gray-50">
        <ScholarshipCalculator />
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Voice Counselor?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of educational guidance with our AI-powered voice technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">24/7 Availability</h4>
              <p className="text-sm text-gray-600">Get instant guidance anytime, anywhere with our AI counselor</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Matching</h4>
              <p className="text-sm text-gray-600">Advanced algorithms match you with the perfect courses</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-sm text-gray-600">Your conversations are encrypted and completely confidential</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Natural Voice</h4>
              <p className="text-sm text-gray-600">Professional voice synthesis that sounds human and friendly</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Calculations</h4>
              <p className="text-sm text-gray-600">Get real-time scholarship and fee calculations during your call</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h4>
              <p className="text-sm text-gray-600">Works seamlessly on all devices and browsers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary p-2 rounded-lg">
                  <GraduationCap className="text-white h-6 w-6" />
                </div>
                <div>
                  <h5 className="font-bold">Voice Counselor</h5>
                  <p className="text-sm text-gray-400">AI-Powered Guidance</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Get personalized admissions guidance through our advanced AI voice technology.
              </p>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#courses" className="hover:text-white transition-colors">Available Courses</a></li>
                <li><a href="#calculator" className="hover:text-white transition-colors">Scholarship Calculator</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#technical" className="hover:text-white transition-colors">Technical Support</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Connect</h6>
              <div className="text-sm text-gray-400">
                <p>Available 24/7</p>
                <p>Powered by Vapi.ai & OpenAI</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Voice Admissions Counselor. All rights reserved. | Powered by Vapi.ai & Replit</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
