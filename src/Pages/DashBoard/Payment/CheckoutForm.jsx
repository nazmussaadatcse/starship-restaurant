import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ price }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
            .catch(error => {
                console.log('An error occurred while fetching the clientSecret:', error);
            });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        setProcessing(true);
        console.log('setProcessing(true)');

        try {
            //payment method and type
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            })

            if (error) {
                console.log('[error]', error);
                setCardError(error.message)
                setTimeout(() => {
                    setCardError('');
                    setProcessing(false);
                }, 4000);
            }
            else {
                setCardError('');
                console.log('[PaymentMethod]', paymentMethod);
            }


            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: user?.displayName || 'anonymous',
                            email: user?.email || 'unknown',
                        },
                    },
                },
            );

            if (confirmError) {
                console.log(confirmError);
                setCardError(confirmError.message);
                setTimeout(() => {
                    setCardError('');
                }, 4000);
                return;
            }
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
            console.log('paymentIntent:', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                const transactionId = paymentIntent.id;
                setTransactionId(transactionId);

                console.log('setProcessing(false)');
                setProcessing(false);
            }
        }
        catch (err) {
            console.error('An unexpected error occurred:', err);
            setCardError('An unexpected error occurred. Please try again.');
            setTimeout(() => {
                setCardError('');
                setProcessing(false);
                console.log('setProcessing(false)');
            }, 4000);
        }

    }

    return (
        // 0-Card-Minimal.js 
        <div className="flex flex-col justify-center items-center">
            <form className="w-2/3 p-8 bg-slate-100 shadow-md" onSubmit={handleSubmit}>

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn px-6 mt-4 btn-sm bg-success text-white  hover:bg-emerald-500 " type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
                <p className="w-1/2 text-sm font-bold mt-2 text-red-700 bg-yellow-200 my-1">{cardError}</p>
                
                {transactionId ? <p className="w-1/2 p-1 rounded-md text-xs font-bold mt-2 text-white bg-green-600 my-1">transaction complete. <br /> TxID: {transactionId}</p> :''  
                }

            </form>
        </div>
    );
};

export default CheckoutForm;