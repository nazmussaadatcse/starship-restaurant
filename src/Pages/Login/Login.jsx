import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';


const Login = () => {

    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const clearErrorMessage = () => {
        setErrorMessage('');
    };

    const handleLogin = e => {

        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log('email: ', email, 'pass: ', password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log('signIn user: ', user)

                Swal.fire({
                    title: 'user login in successful!',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(from,{replace:true});
            })
            .catch(err=> {
                console.log(err);
                setErrorMessage('Incorrect Email/Password.');
                setTimeout(clearErrorMessage, 2000); //error message timer 2 sec
            });
    }
    // captcha validate
    const handleValidateCaptcha = (e) => {
        const userCaptchaValue = e.target.value;
        console.log(userCaptchaValue);

        if (validateCaptcha(userCaptchaValue)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
            alert('Wrong Captcha. Try Again!');
        }
    }

    return (
        <div className="hero min-h-screen">
            <Helmet>
                <title>Starship | Login</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body bg-slate-100">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            {/* captcha load  */}
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            {/* validate button  */}
                            <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type captcha" className="input input-bordered" />
                            <div className='btn btn-outline btn-xs mt-2 font-bold'>validate</div>
                        </div>
                        {/* error message  */}
                        <div className='text-red-600 text-center bg-yellow-500 font-bold rounded'>{errorMessage}</div>
                        {/* login button  */}
                        <div className="form-control mt-6">
                            <input disabled={disabled} className="btn btn-primary" type="submit" value="login" />
                        </div>
                    </form>
                    <p className='flex justify-center p-2 text-lg font-bold'>New Here? <Link className='text-orange-600 ml-2' to={"/signup"}>Create an Account</Link></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;