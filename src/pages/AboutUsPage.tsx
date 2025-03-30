import  { Book, Award, CheckCircle, Users } from 'lucide-react';

export default function AboutUsPage() {
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      bio: 'Harvard Medical School graduate with over 15 years of experience in medical education.',
      image: 'https://randomuser.me/api/portraits/women/11.jpg'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Head of Physiology',
      bio: 'Board-certified cardiologist specializing in advanced cardiovascular physiology and research.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Dr. Robert Torres',
      role: 'Director of Surgical Education',
      bio: 'Experienced surgeon with a passion for teaching modern surgical techniques and procedures.',
      image: 'https://randomuser.me/api/portraits/men/46.jpg'
    },
    {
      name: 'Dr. Lisa Wong',
      role: 'Clinical Pharmacology Lead',
      bio: 'Pharmaceutical researcher with expertise in drug interactions and therapeutic applications.',
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="relative bg-white overflow-hidden rounded-xl shadow-md mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <div className="pt-10 pb-8 sm:pt-16 sm:pb-16 lg:pt-8 lg:pb-16">
                <div className="relative px-4 sm:px-6 lg:px-8">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    About <span className="text-primary-600">MedLecture</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg">
                    Founded in 2018, MedLecture is committed to providing high-quality medical education to healthcare professionals worldwide. Our comprehensive programs help students and practitioners develop their skills and advance their careers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww"
              alt="Medical education books"
            />
          </div>
        </div>

        {/* Mission and values */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To provide accessible, high-quality medical education that empowers healthcare professionals to deliver exceptional patient care and advance medical science through innovative teaching methods and cutting-edge research.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be the global leader in medical education, setting the standard for excellence in healthcare training and professional development while fostering a community of lifelong learners dedicated to improving health outcomes worldwide.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-2 rounded-full mr-3">
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Excellence</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  We strive for excellence in all aspects of our educational programs, ensuring the highest standards of quality.
                </p>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-2 rounded-full mr-3">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Collaboration</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  We foster a collaborative environment that encourages teamwork, knowledge sharing, and interdisciplinary learning.
                </p>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-2 rounded-full mr-3">
                    <Book className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Innovation</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  We embrace innovative teaching methods and technologies to enhance the learning experience and outcomes.
                </p>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-2 rounded-full mr-3">
                    <Award className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Integrity</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  We uphold the highest ethical standards and promote professionalism in all our interactions and teachings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Expert Team</h2>
            <p className="text-gray-600 max-w-3xl mb-10">
              Our faculty consists of experienced medical professionals who are leaders in their respective fields. They bring real-world expertise and a passion for teaching to provide you with the best educational experience.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-primary-600 text-sm mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
            
            <div className="relative max-w-3xl mx-auto">
              {/* Line */}
              <div className="absolute left-4 sm:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                <div className="relative flex items-start">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="flex justify-start w-full mx-auto items-center">
                      <div className="w-full sm:w-1/2 sm:pr-8">
                        <div className="p-4 bg-primary-50 rounded shadow">
                          <h3 className="text-lg font-semibold text-primary-600">2018</h3>
                          <p className="text-sm text-gray-600">MedLecture was founded with a vision to revolutionize medical education through accessible online learning.</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-4 sm:left-1/2 -ml-2 sm:-ml-3 mt-3">
                      <div className="rounded-full h-5 w-5 bg-primary-600 border-4 border-white shadow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="flex justify-end w-full mx-auto items-center">
                      <div className="w-full sm:w-1/2 sm:pl-8">
                        <div className="p-4 bg-primary-50 rounded shadow">
                          <h3 className="text-lg font-semibold text-primary-600">2019</h3>
                          <p className="text-sm text-gray-600">Launched our first 5 courses in Anatomy and Physiology, attracting over 1,000 students worldwide.</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-4 sm:left-1/2 -ml-2 sm:-ml-3 mt-3">
                      <div className="rounded-full h-5 w-5 bg-primary-600 border-4 border-white shadow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="flex justify-start w-full mx-auto items-center">
                      <div className="w-full sm:w-1/2 sm:pr-8">
                        <div className="p-4 bg-primary-50 rounded shadow">
                          <h3 className="text-lg font-semibold text-primary-600">2021</h3>
                          <p className="text-sm text-gray-600">Expanded our curriculum to include specialized courses in Surgery, Internal Medicine, and Laboratory Science.</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-4 sm:left-1/2 -ml-2 sm:-ml-3 mt-3">
                      <div className="rounded-full h-5 w-5 bg-primary-600 border-4 border-white shadow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="flex justify-end w-full mx-auto items-center">
                      <div className="w-full sm:w-1/2 sm:pl-8">
                        <div className="p-4 bg-primary-50 rounded shadow">
                          <h3 className="text-lg font-semibold text-primary-600">2023</h3>
                          <p className="text-sm text-gray-600">Received accreditation from leading medical education authorities and surpassed 10,000 enrolled students.</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-4 sm:left-1/2 -ml-2 sm:-ml-3 mt-3">
                      <div className="rounded-full h-5 w-5 bg-primary-600 border-4 border-white shadow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="flex justify-start w-full mx-auto items-center">
                      <div className="w-full sm:w-1/2 sm:pr-8">
                        <div className="p-4 bg-primary-50 rounded shadow">
                          <h3 className="text-lg font-semibold text-primary-600">Today</h3>
                          <p className="text-sm text-gray-600">Continuing to innovate and expand our offerings to meet the evolving needs of healthcare professionals globally.</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-4 sm:left-1/2 -ml-2 sm:-ml-3 mt-3">
                      <div className="rounded-full h-5 w-5 bg-primary-600 border-4 border-white shadow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 