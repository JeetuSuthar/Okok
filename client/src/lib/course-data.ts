export interface Course {
  id: number;
  name: string;
  duration: string;
  annualFee: number;
  category: string;
  description?: string;
}

export interface ScholarshipCalculation {
  originalFee: number;
  feeAfterScholarship: number;
  annualSavings: number;
  totalSavings: number;
  scholarshipPercentage: number;
  duration: number;
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function calculateScholarship(course: Course, scholarshipPercentage: number = 20): ScholarshipCalculation {
  const discount = scholarshipPercentage / 100;
  const feeAfterScholarship = course.annualFee * (1 - discount);
  const annualSavings = course.annualFee - feeAfterScholarship;
  
  // Parse duration to get years
  const durationYears = course.duration.includes("3 + 1") ? 4 : 
                       course.duration.includes("3") ? 3 : 
                       course.duration.includes("2") ? 2 : 1;
  
  const totalSavings = annualSavings * durationYears;
  
  return {
    originalFee: course.annualFee,
    feeAfterScholarship: Math.round(feeAfterScholarship),
    annualSavings: Math.round(annualSavings),
    totalSavings: Math.round(totalSavings),
    scholarshipPercentage,
    duration: durationYears
  };
}

export function getCourseIcon(category: string): string {
  switch (category.toLowerCase()) {
    case 'undergraduate':
      return 'fas fa-graduation-cap';
    case 'postgraduate':
      return 'fas fa-user-graduate';
    case 'certificate':
      return 'fas fa-certificate';
    case 'it':
      return 'fas fa-laptop-code';
    default:
      return 'fas fa-book';
  }
}

export function getCoursesByCategory(courses: Course[], category: string): Course[] {
  if (category === 'all') return courses;
  if (category === 'it') {
    return courses.filter(course => 
      course.name.toLowerCase().includes('computer') || 
      course.name.toLowerCase().includes('it') ||
      course.name.toLowerCase().includes('bca') ||
      course.name.toLowerCase().includes('mca')
    );
  }
  return courses.filter(course => course.category.toLowerCase() === category.toLowerCase());
}
