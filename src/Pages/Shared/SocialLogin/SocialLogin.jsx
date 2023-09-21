import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSIgnIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })


            })
    }
    return (
        <div>
            <div className='divider'></div>
            <div className="text-center mb-4">
                <h2 className="text-green-600 font-semibold p-2">Login with Google</h2>
                <button onClick={handleGoogleSIgnIn} className="btn btn-circle btn-outline bg border-red-600 hover:bg-white hover:border-yellow-600">
                    <FaGoogle className="text-red-600"></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;