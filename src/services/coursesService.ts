import  { Course } from '../types';
import { featuredCourses } from '../data/courses';
import { 
  saveEnrollmentToLocalStorage, 
  getEnrollmentsFromLocalStorage, 
  updateEnrollmentProgressInLocalStorage 
} from './localStorageService';

// Mock enrollments for initial state (these will be used if localStorage is empty)
let MOCK_ENROLLMENTS = [
  {
    id: '1',
    userId: '2',
    courseId: '1',
    enrollmentDate: new Date().toISOString(),
    completedModules: ['m1'],
    isCompleted: false
  },
  {
    id: '2',
    userId: '2',
    courseId: '2',
    enrollmentDate: new Date().toISOString(),
    completedModules: [],
    isCompleted: false
  }
];

// Get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return featuredCourses;
};

// Get course by ID
export const getCourseById = async (id: string): Promise<Course | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return featuredCourses.find(course => course.id === id) || null;
};

// Check if user is enrolled in course
export const isUserEnrolled = (userId: string, courseId: string): boolean => {
  // First check localStorage
  const localStorageEnrollments = getEnrollmentsFromLocalStorage(userId);
  if (localStorageEnrollments.length > 0) {
    return localStorageEnrollments.some(
      enrollment => enrollment.courseId === courseId
    );
  }
  
  // Fall back to mock data if localStorage is empty
  return MOCK_ENROLLMENTS.some(
    enrollment => enrollment.userId === userId && enrollment.courseId === courseId
  );
};

// Enroll user in course
export const enrollUserInCourse = async (userId: string, courseId: string): Promise<boolean> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if already enrolled
    if (isUserEnrolled(userId, courseId)) {
      return false;
    }
    
    // Get course details
    const course = await getCourseById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    // Get current enrollments from localStorage
    const localStorageEnrollments = getEnrollmentsFromLocalStorage(userId);
    
    // Add new enrollment
    const newEnrollment = {
      id: Date.now().toString(),
      userId,
      courseId,
      enrollmentDate: new Date().toISOString(),
      completedModules: [],
      isCompleted: false
    };
    
    // Save to localStorage
    const saved = saveEnrollmentToLocalStorage(
      userId, 
      courseId,
      course.title,
      newEnrollment.enrollmentDate
    );
    
    if (saved) {
      console.log('Enrollment saved to localStorage successfully');
    } else {
      console.warn('Failed to save enrollment to localStorage, using in-memory storage');
      // Update mock enrollments as fallback
      MOCK_ENROLLMENTS.push(newEnrollment);
    }
    
    return true;
  } catch (error) {
    console.error('Error enrolling user:', error);
    throw error;
  }
};

// Get user enrollments with localStorage persistence
export const getUserEnrollments = async (userId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get enrollments from localStorage
  const localStorageEnrollments = getEnrollmentsFromLocalStorage(userId);
  
  if (localStorageEnrollments.length > 0) {
    // Map the enrollment data to include course details
    const formattedEnrollments = localStorageEnrollments.map(enrollment => {
      const course = featuredCourses.find(c => c.id === enrollment.courseId);
      return {
        ...enrollment,
        course
      };
    });
    
    return formattedEnrollments;
  }
  
  // Fall back to mock data if localStorage is empty
  return MOCK_ENROLLMENTS
    .filter(enrollment => enrollment.userId === userId)
    .map(enrollment => {
      const course = featuredCourses.find(c => c.id === enrollment.courseId);
      return {
        ...enrollment,
        course
      };
    });
};

// Mark module as complete
export const markModuleComplete = async (userId: string, courseId: string, moduleId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get current enrollments from local storage
  const localStorageEnrollments = getEnrollmentsFromLocalStorage(userId);
  let enrollmentToUpdate;
  let isLocalStorage = false;
  
  // First check if the enrollment exists in localStorage
  if (localStorageEnrollments.length > 0) {
    const enrollmentIndex = localStorageEnrollments.findIndex(
      e => e.courseId === courseId
    );
    
    if (enrollmentIndex >= 0) {
      enrollmentToUpdate = localStorageEnrollments[enrollmentIndex];
      isLocalStorage = true;
    }
  }
  
  // If not found in localStorage, check mock data
  if (!enrollmentToUpdate) {
    const enrollmentIndex = MOCK_ENROLLMENTS.findIndex(
      e => e.userId === userId && e.courseId === courseId
    );
    
    if (enrollmentIndex === -1) {
      return false;
    }
    
    enrollmentToUpdate = MOCK_ENROLLMENTS[enrollmentIndex];
  }
  
  // Update the enrollment
  if (!enrollmentToUpdate.completedModules) {
    enrollmentToUpdate.completedModules = [];
  }
  
  if (!enrollmentToUpdate.completedModules.includes(moduleId)) {
    enrollmentToUpdate.completedModules.push(moduleId);
    
    // Check if all modules are completed
    const course = featuredCourses.find(c => c.id === courseId);
    if (course && enrollmentToUpdate.completedModules.length === course.modules.length) {
      enrollmentToUpdate.isCompleted = true;
    }
    
    // Update in localStorage if that's where we found it
    if (isLocalStorage) {
      updateEnrollmentProgressInLocalStorage(
        userId,
        courseId,
        enrollmentToUpdate.completedModules,
        enrollmentToUpdate.isCompleted
      );
    } else {
      // Update the mock enrollment
      const mockIndex = MOCK_ENROLLMENTS.findIndex(
        e => e.userId === userId && e.courseId === courseId
      );
      
      if (mockIndex >= 0) {
        MOCK_ENROLLMENTS[mockIndex] = enrollmentToUpdate;
      }
    }
  }
  
  return true;
};

// Simulate payment processing and course enrollment
export const processPayment = async (userId: string, courseId: string): Promise<boolean> => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Enroll user in course
  return enrollUserInCourse(userId, courseId);
};
 