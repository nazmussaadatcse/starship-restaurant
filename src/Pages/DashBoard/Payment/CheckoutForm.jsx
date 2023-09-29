import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ price }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');


    useEffect(() => {
        axiosSecure.post('/create-payment-intent',{price})
        .then(res=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

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
            }, 4000);
        }
        else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }
    }

    return (
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
                <button className="btn px-6 mt-4 btn-sm bg-success text-white  hover:bg-emerald-500 " type="submit" disabled={!stripe}>
                    Pay
                </button>
                <p className="w-1/2 text-sm font-bold mt-2 text-red-700 bg-yellow-200 my-1">{cardError}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;