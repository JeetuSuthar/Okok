import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Laptop, Tag, Book, Info } from 'lucide-react';
import { formatCurrency, calculateScholarship, getCoursesByCategory, type Course } from '@/lib/course-data';

const categoryButtons = [
  { key: 'all', label: 'All Courses', icon: Book },
  { key: 'undergraduate', label: 'Undergraduate', icon: GraduationCap },
  { key: 'postgraduate', label: 'Postgraduate', icon: Tag },
  { key: 'it', label: 'IT & Computer Science', icon: Laptop }
];

// Static course data for the voice counselor (exact requirements data)
const staticCourses: Course[] = [
  { id: 1, name: "BSc IT (with industry certificates)", duration: "3 yrs", annualFee: 112000, category: "undergraduate" },
  { id: 2, name: "BCA (with industry certificates)", duration: "3 yrs", annualFee: 112000, category: "undergraduate" },
  { id: 3, name: "BBA (with industry certificates)", duration: "3 yrs", annualFee: 112000, category: "undergraduate" },
  { id: 4, name: "MSc IT (with industry certificates)", duration: "2 yrs", annualFee: 112000, category: "postgraduate" },
  { id: 5, name: "BCom (with industry certificates)", duration: "3 yrs", annualFee: 83000, category: "undergraduate" },
  { id: 6, name: "BCom (without certificates)", duration: "3 yrs", annualFee: 64000, category: "undergraduate" },
  { id: 7, name: "BCom (Hons) (with industry certificates)", duration: "3 yrs", annualFee: 90000, category: "undergraduate" },
  { id: 8, name: "BA (Hons) Journalism & Mass Com (no certificates)", duration: "3 yrs", annualFee: 53000, category: "undergraduate" },
  { id: 9, name: "BA (Hons) Journalism & Mass Com (with AI/ML certificates)", duration: "3 yrs", annualFee: 70000, category: "undergraduate" },
  { id: 10, name: "BSc Animation (with AI/ML certificates)", duration: "3 yrs", annualFee: 100000, category: "undergraduate" },
  { id: 11, name: "BHM", duration: "3 + 1 yrs", annualFee: 83000, category: "undergraduate" },
  { id: 12, name: "BLIS", duration: "1 yr", annualFee: 43000, category: "certificate" }
];

export function CourseGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const courses = staticCourses;

  const getCourseIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'undergraduate':
        return <GraduationCap className="text-primary text-xl" />;
      case 'postgraduate':
        return <Tag className="text-primary text-xl" />;
      case 'certificate':
        return <Badge className="text-primary text-xl" />;
      default:
        return <Book className="text-primary text-xl" />;
    }
  };

  const filteredCourses = getCoursesByCategory(courses, selectedCategory);

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Available Courses</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive range of undergraduate and postgraduate programs
        </p>
      </div>
      
      {/* Course Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categoryButtons.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              variant={selectedCategory === category.key ? "default" : "outline"}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {category.label}
            </Button>
          );
        })}
      </div>
      
      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course: Course) => {
          const scholarship = calculateScholarship(course);
          
          return (
            <Card key={course.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    {getCourseIcon(course.category)}
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">
                      20% OFF
                    </Badge>
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-900 mb-2">{course.name}</h4>
                <p className="text-sm text-gray-600 mb-4">Duration: {course.duration}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Annual Fee:</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(course.annualFee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">After Scholarship:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(scholarship.feeAfterScholarship)}
                    </span>
                  </div>
                  <div className="text-xs text-green-600 flex items-center">
                    <Info className="h-3 w-3 mr-1" />
                    You save {formatCurrency(scholarship.annualSavings)} annually
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  onClick={() => {
                    // This would typically open a course detail modal or navigate to a detail page
                    console.log('Show course details for:', course.name);
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            No courses found in this category.
          </div>
        </div>
      )}
    </div>
  );
}
