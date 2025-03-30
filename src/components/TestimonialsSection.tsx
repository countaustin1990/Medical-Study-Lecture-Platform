import  { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      content: "The Anatomy course was incredibly detailed and helped me excel in my medical exams.",
      author: "Dr. Emily Williams",
      role: "Resident Physician",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5
    },
    {
      id: 2,
      content: "As a practicing surgeon, the advanced techniques course provided valuable insights.",
      author: "Dr. Mark Thompson",
      role: "Cardiothoracic Surgeon",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      id: 3,
      content: "The physiology modules were comprehensive and the instructors were highly knowledgeable.",
      author: "Dr. Sarah Chen",
      role: "Family Medicine Physician",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 4
    }
  ];

  return (
    <section className="py-12 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Hear from medical professionals who have advanced their careers through our courses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 