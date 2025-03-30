import  { useState } from 'react';
import { Mail, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ status: 'submitting', message: '' });

    // Simulate form submission
    try {
      // In a real application, you would send this to your server or a form submission service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({
        status: 'success',
        message: 'Thank you! Your message has been received.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        status: 'error',
        message: 'An error occurred. Please try again later.'
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Have questions about our courses or need assistance? We're here to help. Fill out the form below or use one of our contact methods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact form */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {formStatus.status === 'success' && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{formStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {formStatus.status === 'error' && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{formStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="input"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="Course Inquiry">Course Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="input"
                    placeholder="How can we help you?"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={formStatus.status === 'submitting'}
                  >
                    {formStatus.status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Contact information and map */}
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        123 Medical Center Drive<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900">Email</h3>
                      <a href="mailto:info@medlecture.com" className="text-primary-600 hover:text-primary-800">
                        info@medlecture.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900">Phone</h3>
                      <a href="tel:+12125551234" className="text-primary-600 hover:text-primary-800">
                        +1 (212) 555-1234
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Support Hours</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Monday - Friday</h3>
                    <p className="text-gray-600">9:00 AM - 6:00 PM EST</p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Saturday</h3>
                    <p className="text-gray-600">10:00 AM - 2:00 PM EST</p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Sunday</h3>
                    <p className="text-gray-600">Closed</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <h3 className="text-base font-medium text-primary-800 mb-2">Technical Support</h3>
                  <p className="text-gray-600 text-sm">
                    For urgent technical issues, email <a href="mailto:support@medlecture.com" className="text-primary-600 hover:text-primary-800">support@medlecture.com</a> with "URGENT" in the subject line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">How do I enroll in a course?</h3>
                <p className="text-gray-600">
                  You can browse our available courses and enroll directly through our website. Simply create an account, select the course you're interested in, and complete the payment process to gain immediate access.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Are the courses self-paced?</h3>
                <p className="text-gray-600">
                  Yes, most of our courses are self-paced, allowing you to learn on your own schedule. Each course has a recommended timeline, but you can progress through the material at a pace that works for you.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">How long do I have access to a course after purchasing?</h3>
                <p className="text-gray-600">
                  Once you purchase a course, you'll have lifetime access to the course materials. This allows you to revisit the content whenever you need to refresh your knowledge.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Are the certificates accredited?</h3>
                <p className="text-gray-600">
                  Yes, our certificates are recognized by major medical institutions and can be used for continuing education credits. Each course description includes specific accreditation details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 