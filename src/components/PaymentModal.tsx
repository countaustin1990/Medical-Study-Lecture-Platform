import  { useState } from 'react';
import { X, CreditCard, AlertCircle } from 'lucide-react';
import { processPayment } from '../services/coursesService';
import { useAuth } from '../contexts/AuthContext';
import { Course } from '../types';
import { redirectToSuccess } from '../services/paymentService';

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
}

export default function PaymentModal({ course, onClose }: PaymentModalProps) {
  const { currentUser } = useAuth();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('You must be logged in to complete this purchase');
      return;
    }
    
    // Simple validation
    if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
      setError('Please fill out all payment fields');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Simulate payment processing and enroll user
      const success = await processPayment(currentUser.id, course.id);
      
      if (success) {
        // Redirect to success page
        redirectToSuccess(course.id);
      } else {
        setError('There was an issue processing your payment. Please try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred while processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format card number with spaces after every 4 digits
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Complete Your Purchase</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium">{course.title}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Duration:</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                <span className="text-gray-900 font-medium">Total:</span>
                <span className="text-gray-900 font-bold">${course.price}</span>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  id="card-number"
                  type="text"
                  className="input pr-10"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                id="card-name"
                type="text"
                className="input"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  id="card-expiry"
                  type="text"
                  className="input"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  id="card-cvv"
                  type="text"
                  className="input"
                  placeholder="123"
                  maxLength={3}
                  value={cardCVV}
                  onChange={(e) => setCardCVV(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-4">
                For demo purposes, you can use any valid-looking credit card information. No actual payment will be processed.
              </p>
              <p className="text-sm text-gray-600 mb-2 font-medium">Test Card Information:</p>
              <p className="text-sm text-gray-600">Card: 4242 4242 4242 4242</p>
              <p className="text-sm text-gray-600">Exp: 12/25</p>
              <p className="text-sm text-gray-600">CVV: 123</p>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay $${course.price}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
 