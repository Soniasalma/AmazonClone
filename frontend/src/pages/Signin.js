import React, { useState } from 'react';
import { darkLogo } from '../assets/index';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { setUserInfo } from '../redux/amazonSlice';
import { useDispatch } from 'react-redux';
import LoadingBox from '../components/LoadingBox';

const Signin = () => {
  const navigate = useNavigate();

  const auth = getAuth();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errCredential, setErrCredential] = useState('');
  const [isShownPass, setIsSHownPass] = useState(false);

  //firebase error
  //loading state start
  const [userEmailErr, setUserEmailErr] = useState(false);
  const [userPassErr, setUserPassErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail('');
    setErrCredential('');
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword('');
    setErrCredential('');
  };
  const handleSigin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail('Enter your email');
    }
    if (!password) {
      setErrPassword('Enter your password');
    }
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //console.log(user);
          dispatch(
            setUserInfo({
              _id: user.uid,
              userName: user.displayName,
              email: user.email,
              image: user.photoURL,
            })
          );
          setLoading(false);
          setSuccessMsg('Login Successfully! welcome you back!');
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1000);
          // ...
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;

          //console.log(errorCode);
          //console.log(errorMessage);
          if (errorCode.includes('auth/invalid-email')) {
            setUserEmailErr('Invalid Email');
          }
          if (errorCode.includes('auth/invalid-password')) {
            setUserPassErr('Wrong Password! try again');
          }
          if (errorCode.includes('auth/invalid-credential'))
            setErrCredential('Something is up, Try with correct credential');
        });

      setEmail('');
      setPassword('');
    }
  };
  return (
    <div className="w-full  ">
      <div className="w-full flex items-center justify-center h-screen bg-gray-100 pb-10">
        {successMsg ? (
          <div className="flex items-center justify-center ">
            <p
              className="text-lg font-titleFont font-semibold text-green-500 border-[1px]
         border-green-600 px-6 py-2 text-center
         "
            >
              {successMsg}
            </p>
          </div>
        ) : (
          <form className="w-[350px] mx-auto flex flex-col items-center">
            <Link to="/">
              <img className="w-32" src={darkLogo} alt="darkLogo" />
            </Link>
            <div className="w-full border border-zinc-200 p-6">
              <h2 className="font-titleFont text-3xl font-medium mb-4">
                Sign in
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    Email or mobile phone number
                  </p>
                  <input
                    onChange={handleEmail}
                    className="w-full lowercase p-1 border border-zinc-400px-2 text-base rounded-sm 
                outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100
                "
                    type="email "
                    value={email}
                  />
                  {errEmail && (
                    <p
                      className="text-red-600 text-xs font-semibold tracking-wide flex
                items-center gap-2 -mt-1.5
                "
                    >
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {errEmail}
                    </p>
                  )}
                  {userEmailErr && (
                    <p
                      className="text-red-600 text-xs font-semibold tracking-wide flex
                items-center gap-2 -mt-1.5
                "
                    >
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {userEmailErr}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Password</p>
                  <input
                    onChange={handlePassword}
                    className="w-full lowercase p-1 border border-zinc-400px-2 text-base rounded-sm 
                outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100
                "
                    type={isShownPass ? 'text' : 'password'}
                    value={password}
                  />
                  <div className="flex items-center gap-2 -mt-1 mb-2">
                    <input
                      id="checkbox"
                      type="checkbox"
                      checked={isShownPass}
                      onChange={() => setIsSHownPass(!isShownPass)}
                    />
                    <label htmlFor="checkbox" className="text-sm  ">
                      Show password?
                    </label>
                  </div>
                  {errPassword && (
                    <p
                      className="text-red-600 text-xs font-semibold tracking-wide flex
                items-center gap-2 -mt-1.5
                "
                    >
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {errPassword}
                    </p>
                  )}
                  {userPassErr && (
                    <p
                      className="text-red-600 text-xs font-semibold tracking-wide flex
                items-center gap-2 -mt-1.5
                "
                    >
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {userPassErr}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSigin}
                  className="w-full py-1.5 text-sm font-normal rounded-sm
                bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b 
              border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput
              "
                >
                  Continue
                </button>

                {loading && <LoadingBox color="#febd69" />}
                {errCredential && (
                  <p
                    className="text-red-600 text-xs font-semibold tracking-wide flex
                items-center gap-2 -mt-1.5
                "
                  >
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errCredential}
                  </p>
                )}
              </div>
              <p className="text-xs text-black leading-4 mt-4">
                {' '}
                Contiuing, you agree to Amazon's{' '}
                <span className="text-blue-600">
                  Conditions of Use{' '}
                </span> and{' '}
                <span className="text-blue-600">Privace Notice.</span>
              </p>
              <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
                <ArrowRightIcon />
                <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                  Need help?
                </span>
              </p>
            </div>
            <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
              <span className="w-1/3 text-center">New to Amazon?</span>
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            </p>
            <Link to="/registration">
              <button
                className="w-full p-1.5 text-sm font-normal rounded-sm mt-4
         bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border
         border-zinc-400 active:border-yellow-800 active:shadow-amazonInput

          "
              >
                Create your Amazon account
              </button>
            </Link>
          </form>
        )}
      </div>
      <div
        className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4
      items-center justify-center py-10
      "
      >
        <div className="flex items-center   gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
        </div>
        <p className="text-xs text-gray-600">
          {' '}
          @ 1996-2023, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Signin;
