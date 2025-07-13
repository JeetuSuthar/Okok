import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Calculator, TrendingUp, Award } from 'lucide-react';
import { formatCurrency, calculateScholarship, type Course } from '@/lib/course-data';

// Static course data for the scholarship calculator
const staticCourses: Course[] = [
  { id: 1, name: "BBA (with industry certificates)", duration: "3 yrs", annualFee: 112000, category: "undergraduate" },
  { id: 2, name: "BSc IT", duration: "3 yrs", annualFee: 120000, category: "undergraduate" },
  { id: 3, name: "BCA", duration: "3 yrs", annualFee: 110000, category: "undergraduate" },
  { id: 4, name: "BSc Computer Science", duration: "3 yrs", annualFee: 115000, category: "undergraduate" },
  { id: 5, name: "BSc Mathematics", duration: "3 yrs", annualFee: 105000, category: "undergraduate" },
  { id: 6, name: "BSc Physics", duration: "3 yrs", annualFee: 108000, category: "undergraduate" },
  { id: 7, name: "MSc Computer Science", duration: "2 yrs", annualFee: 140000, category: "postgraduate" },
  { id: 8, name: "MSc IT", duration: "2 yrs", annualFee: 135000, category: "postgraduate" },
  { id: 9, name: "MSc Mathematics", duration: "2 yrs", annualFee: 125000, category: "postgraduate" },
  { id: 10, name: "MSc Physics", duration: "2 yrs", annualFee: 130000, category: "postgraduate" },
  { id: 11, name: "MCA", duration: "3 + 1 yrs", annualFee: 145000, category: "postgraduate" },
  { id: 12, name: "MBA (Digital Marketing)", duration: "2 yrs", annualFee: 180000, category: "postgraduate" },
  { id: 13, name: "Certificate in Web Development", duration: "6 months", annualFee: 50000, category: "certificate" },
  { id: 14, name: "Certificate in Data Science", duration: "8 months", annualFee: 60000, category: "certificate" },
  { id: 15, name: "Certificate in AI/ML", duration: "10 months", annualFee: 70000, category: "certificate" }
];

export function ScholarshipCalculator() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  
  const courses = staticCourses;

  const selectedCourse = courses.find((course: Course) => course.id.toString() === selectedCourseId);
  const scholarship = selectedCourse ? calculateScholarship(selectedCourse) : null;

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Scholarship Calculator</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate your potential savings with our 20% scholarship program
        </p>
      </div>
      
      <Card className="bg-white rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course Selection */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Course Details
              </h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Course
                  </Label>
                  <Select 
                    value={selectedCourseId} 
                    onValueChange={setSelectedCourseId}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a course..." />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course: Course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedCourse && (
                  <>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Duration
                      </Label>
                      <Input 
                        type="text" 
                        value={selectedCourse.duration} 
                        readOnly 
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Fee
                      </Label>
                      <Input 
                        type="text" 
                        value={formatCurrency(selectedCourse.annualFee)} 
                        readOnly 
                        className="bg-gray-50"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Scholarship Breakdown */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Scholarship Breakdown
              </h4>
              
              <div className="space-y-4">
                {scholarship ? (
                  <>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Original Annual Fee</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(scholarship.originalFee)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Scholarship (20%)</span>
                        <span className="font-semibold text-red-600">
                          -{formatCurrency(scholarship.annualSavings)}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">Fee After Scholarship</span>
                          <span className="font-bold text-green-600 text-lg">
                            {formatCurrency(scholarship.feeAfterScholarship)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-center">
                        <TrendingUp className="mx-auto h-8 w-8 text-green-600 mb-2" />
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {formatCurrency(scholarship.totalSavings)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Savings ({scholarship.duration} years)
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                      <Phone className="mr-2 h-4 w-4" />
                      Discuss with Counselor
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p>Select a course to see scholarship details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
