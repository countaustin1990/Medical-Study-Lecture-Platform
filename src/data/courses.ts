import  { Course, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Anatomy',
    description: 'Study of the structure of organisms and their parts',
    imageUrl: 'https://images.unsplash.com/photo-1530026454774-50cce722a1fb?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww'
  },
  {
    id: '2',
    name: 'Physiology',
    description: 'Study of the function of body parts and the body as a whole',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww'
  },
  {
    id: '3',
    name: 'Surgery',
    description: 'Medical specialty that uses operative techniques to treat diseases',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww'
  },
  {
    id: '4',
    name: 'Internal Medicine',
    description: 'Medical specialty dealing with the prevention, diagnosis, and treatment of adult diseases',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw4fHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww'
  },
  {
    id: '5',
    name: 'Laboratory Science',
    description: 'Study of diagnostic laboratory tests and biomedical science',
    imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww'
  }
];

export const featuredCourses: Course[] = [
  {
    id: '1',
    title: 'Human Anatomy Fundamentals',
    description: 'Comprehensive overview of human body systems and structures',
    imageUrl: 'https://images.unsplash.com/photo-1530026454774-50cce722a1fb?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww',
    price: 199,
    category: 'Anatomy',
    instructor: 'Dr. Sarah Johnson',
    duration: '12 weeks',
    level: 'Beginner',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Anatomy',
        description: 'Overview of anatomical terminology and body planes',
        content: 'Detailed content about anatomical terminology'
      },
      {
        id: 'm2',
        title: 'Skeletal System',
        description: 'Structure and function of bones and joints',
        content: 'Detailed content about the skeletal system'
      },
      {
        id: 'm3',
        title: 'Muscular System',
        description: 'Types of muscles and their functions',
        content: 'Detailed content about the muscular system'
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced Cardiovascular Physiology',
    description: 'In-depth exploration of heart function and circulatory system',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww',
    price: 249,
    category: 'Physiology',
    instructor: 'Dr. Michael Chen',
    duration: '10 weeks',
    level: 'Advanced',
    modules: [
      {
        id: 'm1',
        title: 'Cardiac Cycle',
        description: 'Understanding the mechanical and electrical events in a heartbeat',
        content: 'Detailed content about cardiac cycle'
      },
      {
        id: 'm2',
        title: 'Blood Vessels',
        description: 'Structure and function of arteries, veins, and capillaries',
        content: 'Detailed content about blood vessels'
      },
      {
        id: 'm3',
        title: 'Heart Disorders',
        description: 'Common cardiovascular diseases and treatments',
        content: 'Detailed content about heart disorders'
      }
    ]
  },
  {
    id: '3',
    title: 'Surgical Techniques & Procedures',
    description: 'Essential skills and knowledge for modern surgical practice',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww',
    price: 299,
    category: 'Surgery',
    instructor: 'Dr. Robert Torres',
    duration: '16 weeks',
    level: 'Intermediate',
    modules: [
      {
        id: 'm1',
        title: 'Aseptic Techniques',
        description: 'Principles and practices of maintaining sterility in the operating room',
        content: 'Detailed content about aseptic techniques'
      },
      {
        id: 'm2',
        title: 'Suturing Methods',
        description: 'Different suturing techniques and their applications',
        content: 'Detailed content about suturing methods'
      },
      {
        id: 'm3',
        title: 'Wound Management',
        description: 'Proper care and closure of surgical wounds',
        content: 'Detailed content about wound management'
      }
    ]
  },
  {
    id: '4',
    title: 'Clinical Pharmacology',
    description: 'Understanding drug actions, interactions, and therapeutic applications',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww',
    price: 179,
    category: 'Internal Medicine',
    instructor: 'Dr. Lisa Wong',
    duration: '8 weeks',
    level: 'Intermediate',
    modules: [
      {
        id: 'm1',
        title: 'Pharmacokinetics',
        description: 'How drugs move through the body',
        content: 'Detailed content about pharmacokinetics'
      },
      {
        id: 'm2',
        title: 'Drug Interactions',
        description: 'Understanding how medications affect each other',
        content: 'Detailed content about drug interactions'
      },
      {
        id: 'm3',
        title: 'Therapeutic Applications',
        description: 'Clinical applications of pharmacology',
        content: 'Detailed content about therapeutic applications'
      }
    ]
  },
  {
    id: '5',
    title: 'Modern Laboratory Techniques',
    description: 'Hands-on training in essential diagnostic methods',
    imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww',
    price: 219,
    category: 'Laboratory Science',
    instructor: 'Dr. James Peterson',
    duration: '14 weeks',
    level: 'Beginner',
    modules: [
      {
        id: 'm1',
        title: 'Sample Collection',
        description: 'Proper techniques for collecting biological specimens',
        content: 'Detailed content about sample collection'
      },
      {
        id: 'm2',
        title: 'Laboratory Safety',
        description: 'Essential safety protocols in the clinical laboratory',
        content: 'Detailed content about laboratory safety'
      },
      {
        id: 'm3',
        title: 'Diagnostic Testing',
        description: 'Methods and interpretation of common diagnostic tests',
        content: 'Detailed content about diagnostic testing'
      }
    ]
  }
];
 