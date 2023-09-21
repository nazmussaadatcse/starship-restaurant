import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { } from 'autoprefixer';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const SignUp = () => {

    const { register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const [disabled, setDisabled] = useState(true);
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSignUp = e => {
        console.log(e);
        createUser(e.email, e.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(e.name, e.photoURL)
                    .then(() => {
                        console.log('user profile info updated!');

                        const saveUser = {name: e.name, email: e.email};
                        fetch('http://localhost:5000/users',{
                            method: 'POST',
                            headers:{
                                'content-type':'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {

                                    reset();
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'User Created Successfully!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/');
                                }
                            })

                    })
                    .catch(err => console.log(err));
            })

    }
    // captcha 
    const handleValidateCaptcha = (e) => {
        const userCaptchaValue = e.target.value;
        console.log(userCaptchaValue);

        if (validateCaptcha(userCaptchaValue)) {
            setDisabled(false);
        }
        else if (userCaptchaValue.length < 6) {
            setDisabled(true);
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
                            <input type="text" {...register('name', { required: true })} name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className='text-red-700'>name is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register('photoURL', { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.PhotoURL && <span className='text-red-700'>Photo URL is required</span>}

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register('email', { required: true })} type="text" name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className='text-red-700'>email is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register('password', { required: true, minLength: 6, maxLength: 20, pattern: /[#?!@$%^&*-]/ })} type="password" name="password" placeholder="password" className="input input-bordered" />

                            {/* password validate  */}
                            {errors.password?.type === 'required' && <span className='text-red-700'>password is required</span>}

                            {(errors.password?.type === 'minLength') && <span className='text-red-700'>At least 6 character</span>}
                            {(errors.password?.type === 'maxLength') && <span className='text-red-700'>max 20 character</span>}
                            {(errors.password?.type === 'pattern') && <span className='text-red-700'>one special character</span>}

                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                        </div>
                        <div className="form-control">

                            <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type captcha" className="input input-bordered" />
                            <div className='btn btn-outline btn-xs mt-2 font-bold'>validate</div>
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disabled} className="btn btn-primary" type="submit" value="signup" />
                        </div>
                    </form>
                    <p className='flex justify-center p-2 text-lg font-bold'>Already have an Account? <Link className='text-orange-600 ml-2' to={"/login"}>Login</Link></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignUp;