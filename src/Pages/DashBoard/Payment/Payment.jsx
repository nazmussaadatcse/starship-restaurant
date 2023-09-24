import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK); //TODO: provide pk

const Payment = () => {
    return (
        <div className="w-full p-8">
            <SectionTitle heading={'Payment'} subHeading={'Please Pay Now'}></SectionTitle>
            <h3>Payment</h3>

            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;