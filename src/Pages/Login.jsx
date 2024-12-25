import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLottie } from "lottie-react";
import animation from '../assets/porasuna 1734807272196.json'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../Authprovider/Authprovider';
import { Helmet } from 'react-helmet-async';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import FaEye and FaEyeSlash

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // Define the showPassword state
  useEffect(() => {
    AOS.init({ duration: 2000 });  // Customize the duration for animations
  }, []);
  const navigate = useNavigate()
  const location = useLocation()
 
  const { signIn, signInWithGoogle } = useContext(AuthContext)

  const options = {
    animationData: animation,  // Use the imported animation data
    loop: true,                       // Set loop to true for continuous playback
    autoplay: true,                   // Set autoplay to true to start animation automatically
  };

  // Use the useLottie hook to get the View component
  const { View } = useLottie(options); 

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      toast.success('Signin Successful')
      navigate(location?.state ? location.state : '/')
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'An error occurred during login');
    }
  }

  // Email Password Signin
  const handleSignIn = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const pass = form.password.value
    console.log({ email, pass })
    try {
      await signIn(email, pass)
      toast.success('Signin Successful')
      navigate(location?.state ? location.state : '/')
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'An error occurred during login');
    }
  }

  return (
    <div data-aos="zoom-in" className='flex overflow-hidden justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <Helmet>
        <title>PendingAssaignment || CollabStudy</title>
      </Helmet>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden border border-white rounded-lg shadow-lg lg:max-w-4xl'>
        <div className='hidden bg-cover bg-center lg:block flex-1'>
          {View}
        </div>

        <div className='w-full px-6 py-8 md:px-8 flex-1'>
          <div className='flex justify-center mx-auto'>
          </div>

          <p className='mt-3 text-xl text-center text-gray-600'>
            Welcome back!
          </p>

          <div
            onClick={handleGoogleSignIn}
            className='flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 '
          >
            <div className='px-4 py-2'>
              <svg className='w-6 h-6' viewBox='0 0 40 40'>
                {/* Google SVG */}
              </svg>
            </div>

            <span className='w-5/6 px-4 py-3 font-bold text-center'>
              Sign in with Google
            </span>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b lg:w-1/4'></span>

            <div className='text-xs text-center text-gray-500 uppercase hover:underline'>
              or login with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>

          <form onSubmit={handleSignIn}>
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-700' htmlFor='LoggingEmailAddress'>
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                className='w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#267696]'
                type='email'
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#267696]"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-7 right-5"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className='mt-6'>
              <button
                type='submit'
                className='w-full bg-[#06B6D4]'
              >
                Sign In
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b md:w-1/4'></span>

            <Link
              to='/registration'
              className='text-xs text-gray-500 uppercase hover:underline'
            >
              or sign up
            </Link>

            <span className='w-1/5 border-b md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
