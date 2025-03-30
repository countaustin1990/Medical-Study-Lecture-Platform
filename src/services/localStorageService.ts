//  Local Storage Service for enrollment persistence
// This handles saving and retrieving user enrollments from local storage

/**
 * Save enrollments to local storage
 */
export const saveEnrollmentsToLocalStorage = (userId: string, enrollments: any[]) => {
  try {
    // Get existing data from localStorage
    const allEnrollmentsData = localStorage.getItem('medlecture_enrollments');
    const allEnrollments = allEnrollmentsData ? JSON.parse(allEnrollmentsData) : {};
    
    // Update with the current user's enrollments
    allEnrollments[userId] = enrollments;
    
    // Save back to localStorage
    localStorage.setItem('medlecture_enrollments', JSON.stringify(allEnrollments));
    
    return true;
  } catch (error) {
    console.error('Error saving enrollments to localStorage:', error);
    return false;
  }
};

/**
 * Get user enrollments from local storage
 */
export const getEnrollmentsFromLocalStorage = (userId: string): any[] => {
  try {
    const allEnrollmentsData = localStorage.getItem('medlecture_enrollments');
    if (!allEnrollmentsData) return [];
    
    const allEnrollments = JSON.parse(allEnrollmentsData);
    return allEnrollments[userId] || [];
  } catch (error) {
    console.error('Error getting enrollments from localStorage:', error);
    return [];
  }
};

/**
 * Save a single enrollment to local storage
 */
export const saveEnrollmentToLocalStorage = (
  userId: string, 
  courseId: string, 
  courseName: string, 
  enrollmentDate: string
) => {
  try {
    // Get current enrollments
    const currentEnrollments = getEnrollmentsFromLocalStorage(userId);
    
    // Check if enrollment already exists
    const existingIndex = currentEnrollments.findIndex(e => e.courseId === courseId);
    
    if (existingIndex >= 0) {
      // Update existing enrollment
      currentEnrollments[existingIndex] = {
        ...currentEnrollments[existingIndex],
        courseName,
        enrollmentDate
      };
    } else {
      // Add new enrollment
      currentEnrollments.push({
        id: Date.now().toString(),
        userId,
        courseId,
        courseName,
        enrollmentDate,
        completedModules: [],
        isCompleted: false
      });
    }
    
    // Save updated enrollments
    return saveEnrollmentsToLocalStorage(userId, currentEnrollments);
  } catch (error) {
    console.error('Error saving enrollment to localStorage:', error);
    return false;
  }
};

/**
 * Update enrollment progress in local storage
 */
export const updateEnrollmentProgressInLocalStorage = (
  userId: string,
  courseId: string,
  completedModules: string[],
  isCompleted: boolean
) => {
  try {
    // Get current enrollments
    const currentEnrollments = getEnrollmentsFromLocalStorage(userId);
    
    // Find the enrollment to update
    const enrollmentIndex = currentEnrollments.findIndex(e => e.courseId === courseId);
    
    if (enrollmentIndex >= 0) {
      // Update the enrollment
      currentEnrollments[enrollmentIndex] = {
        ...currentEnrollments[enrollmentIndex],
        completedModules,
        isCompleted
      };
      
      // Save updated enrollments
      return saveEnrollmentsToLocalStorage(userId, currentEnrollments);
    }
    
    return false;
  } catch (error) {
    console.error('Error updating enrollment progress in localStorage:', error);
    return false;
  }
};
 