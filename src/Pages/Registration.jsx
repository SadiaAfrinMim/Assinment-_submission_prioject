import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Authprovider/Authprovider';
import pen from '../assets/pen.json';
import { useLottie } from 'lottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import { Helmet } from 'react-helmet-async';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Add import for password eye icons

const Registration = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 }); // Customize the duration for animations
  }, []);

  const navigate = useNavigate();
  const { signInWithGoogle, createUser, updateUserProfile, setUser, logOut } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add showPassword state

  const options = {
    animationData: pen, // Use the imported animation data
    loop: true,
    autoplay: true,
  };

  // Use the useLottie hook to get the View component
  const { View } = useLottie(options);

  // Password Validation Function
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const pass = form.password.value;

    if (!validatePassword(pass)) {
      setErrorMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long.');
      return;
    }

    try {
      // User Registration
      const result = await createUser(email, pass);
      await updateUserProfile(name, photo);
      setUser({ ...result.user, photoURL: photo, displayName: name });
      toast.success('Signup Successful');
      
      // Automatically log out the user after registration and navigate to login
      await handleLogout();
      
      setTimeout(() => navigate('/login'), 1500); // Redirect to Login after success
    } catch (err) {
      console.log(err);
      toast.error(err?.message || 'Something went wrong!');
    }
  };

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signin Successful');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err?.message || 'Something went wrong!');
    }
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      await logOut();  // Assuming 'logOut' method from your AuthContext
      toast.success('You have logged out');
    } catch (err) {
      toast.error(err?.message || 'Logout failed!');
    }
  };

  return (
    <div data-aos="zoom-in" className="flex overflow-hidden justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <Helmet>
        <title>Registration || CollabStudy</title>
      </Helmet>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl border border-white">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        
          <div className="flex justify-center mx-auto">
            <div>
            {View}
            </div>
           
          </div>
          <p className="mt-3 text-xl text-center text-gray-600">Get Your Free Account Now.</p>
          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
              </svg>
            </div>
            <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase hover:underline">or Registration with email</div>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSignUp}>
            {/* Form Inputs */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="name">Username</label>
              <input
                id="name"
                name="name"
                className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter your username"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="photo">Photo URL</label>
              <input
                id="photo"
                name="photo"
                className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter your photo URL"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Enter your email address"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errorMessage && <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 mt-4 font-bold text-white bg-cyan-500 rounded "
            >
              Sign Up
            </button>
          </form>
          
          <div className="mt-6 text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
            <span className='w-1/5 border-b  md:w-1/4'></span>
          </div>
        </div>
        <div
          className='hidden bg-cover bg-center lg:block lg:w-1/2'
         
        >
          {View}
        </div>
      </div>
    </div>
         
   
  );
};

export default Registration;
