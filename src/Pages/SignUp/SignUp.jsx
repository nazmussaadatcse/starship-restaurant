import { useRef } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {

    const {register,
        handleSubmit,
        formState: { errors },
      } = useForm()

    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const { createUser } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSignUp = e => {
        console.log(e);
        createUser(e.email, e.password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        
    }
    // captcha 
    const handleValidateCaptcha = () => {
        const userCaptchaValue = captchaRef.current.value;
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
                <title>Starship | SignUp</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">SignUp now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleSignUp)} className="card-body bg-slate-100">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register('name', {required:true})} name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className='text-red-700'>name is required</span>}

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register('email',{required:true})} type="text" name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className='text-red-700'>email is required</span>}
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register('password',{required:true, minLength: 6, maxLength:20, pattern:/[#?!@$%^&*-]/})} type="password" name="password" placeholder="password" className="input input-bordered" />

                            {/* password validate  */}
                            {errors.password?.type==='required' && <span className='text-red-700'>password is required</span>}

                            {(errors.password?.type ==='minLength') && <span className='text-red-700'>At least 6 character</span>}
                            {(errors.password?.type ==='maxLength') && <span className='text-red-700'>max 20 character</span>}
                            {(errors.password?.type ==='pattern') && <span className='text-red-700'>one special character</span>}

                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                        </div>
                        <div className="form-control">

                            <input ref={captchaRef} type="text" name="captcha" placeholder="type captcha" className="input input-bordered" />
                            <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2 font-bold'>validate</button>
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disabled} className="btn btn-primary" type="submit" value="signup" />
                        </div>
                    </form>
                    <p className='flex justify-center p-2 text-lg font-bold'>Already have an Account? <Link className='text-orange-600 ml-2' to={"/login"}>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;