import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


const Login = () => {

    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);

    useEffect(()=>{
        loadCaptchaEnginge(6);
    },[])

    const handleLogin = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
    }
    const handleValidateCaptcha = ()=>{
        const userCaptchaValue = captchaRef.current.value;
        console.log(userCaptchaValue);

        if(validateCaptcha(userCaptchaValue)){
            setDisabled(false);
        }
        else{
            setDisabled(true);
            alert('Wrong Captcha. Try Again!');
        }
    }

    return (
        <div className="hero min-h-screen">
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
                            <label className="label">
                            <LoadCanvasTemplate />
                            </label>
                            <input ref={captchaRef}  type="text" name="captcha" placeholder="type captcha" className="input input-bordered" />
                            <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2 font-bold'>validate</button>
                        </div>
                        <div className="form-control mt-6">
                        <input disabled={disabled} className="btn btn-primary" type="submit" value="login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;