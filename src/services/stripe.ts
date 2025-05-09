import  { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createCheckoutSession(courseId: string, price: number) {
  try {
    // In a real app, this would be a server endpoint to create a Stripe checkout session
    // For demo purposes, we'll simulate the response
    const response = await fetch('https://hooks.jdoodle.net/proxy?url=https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Course ID: ${courseId}`,
                description: 'Medical Education Course',
              },
              unit_amount: price * 100, // Stripe uses cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${window.location.origin}/payment-success?course=${courseId}`,
        cancel_url: `${window.location.origin}/courses/${courseId}`,
      }),
    });

    const session = await response.json();
    
    // Redirect to checkout
    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}
 