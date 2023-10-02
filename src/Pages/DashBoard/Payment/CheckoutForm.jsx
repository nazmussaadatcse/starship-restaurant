import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, cart }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');


    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.log('An error occurred while fetching the clientSecret:', error);
                })
        }
    }, [price, axiosSecure])

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
                // save to server 
                const payment = {
                    email: user?.email,
                    transactionId,
                    price,
                    date: new Date(),
                    orderStatus: 'service pending',
                    quantity: cart.length,
                    cartItems: cart.map(item => item._id),
                    menuItems: cart.map(item => item.menuItemId),
                    itemsNames: cart.map(item => item.name)
                }
                axiosSecure.post('/payments', payment)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertResult.insertedId) {
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Payment Successful!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })

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
            <div className="text-green-700 text-lg p-2 font-semibold">total paying ${price}</div>
            <form className="w-2/3 p-8 bg-slate-200 shadow-md rounded-md" onSubmit={handleSubmit}>

                <CardElement className="bg-white p-2 rounded-md"
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

                {transactionId ? <p className="w-1/2 p-1 rounded-md text-xs font-bold mt-2 text-white bg-green-600 my-1">transaction complete. <br /> TxID: {transactionId}</p> : ''
                }

            </form>
        </div>
    );
};

export default CheckoutForm;