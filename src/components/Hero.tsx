import  { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-primary-600 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Advance Your Medical Career
                  </h1>
                  <p className="mt-3 text-base text-primary-100 sm:mt-5 sm:text-xl">
                    Access premium medical education with certification programs taught by leading medical professionals.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link to="/courses" className="btn bg-white text-primary-700 hover:bg-gray-100 flex items-center">
                      Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link to="/register" className="btn bg-primary-800 text-white hover:bg-primary-900">
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1530026454774-50cce722a1fb?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww"
          alt="Medical education - human heart model"
        />
      </div>
    </div>
  );
}
 