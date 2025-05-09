export  interface User {
  id: string;
  email: string;
  displayName: string | null;
  role: 'student' | 'admin' | 'instructor';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrollmentDate: Date;
  completedModules: string[];
  isCompleted: boolean;
}
 