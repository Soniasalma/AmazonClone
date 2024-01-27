import React, { useRef, useState } from 'react';
import { darkLogo } from '../assets/index';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { motion } from 'framer-motion';
import LoadingBox from '../components/LoadingBox';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();
  const capRef = useRef();
  const auth = getAuth();
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  // Error Message start
  const [errClientName, setErrClientName] = useState('');
  const [errEmail, setErrEmail] = useState('');

  const [errPassword, setErrPassword] = useState('');
  const [errCPassword, setErrCPassword] = useState('');
  const [firebaseErr, setFirebaseErr] = useState('');

  //loading state start
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [valid_token, setValidToken] = useState(null);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsgOfRe, setSuccessMsgOfRe] = useState();
  const [isShownPass, setIsSHownPass] = useState(false);
  const [errorRecaptcha, setErrorRecaptcha] = useState(false);

  //Handle function start

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName('');
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail('');
    setFirebaseErr('');
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword('');
  };
  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword('');
  };

  //email validation start
  //regex validation
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);
  };

  const verifyToken = async (token) => {
    let APIResponse = [];

    try {
      let response = await axios.post(
        'https://my-amazon-clone-rxyz.onrender.com/post',
        {
          reCAPTCHA_TOKEN: token,
        }
      );

      APIResponse.push(response['data']);
      //console.log(APIResponse);
      return APIResponse;
    } catch (error) {
      //console.log(error);
    }
  };

  //submit button start
  const handleRegistration = async (e) => {
    e.preventDefault();
    //const inputVal = await e.target.value;
    //console.log(inputVal);
    const token = capRef.current.getValue();
    console.log(token);
    if (token) {
      setLoading(true);
      setErrorMsg('');
      let valid_token = await verifyToken(token);
      if (valid_token) {
        // console.log(valid_token);
        setValidToken(valid_token);
        if (valid_token[0].success === true) {
          setErrorRecaptcha(false);
          // console.log('verified');
          setSuccessMsgOfRe('Hurray!! you have submitted the form');
        } else {
          //console.log('not verified');
          setErrorMsg(' Sorry!! Verify you are not a bot');
        }
        setLoading(false);
        if (!clientName) {
          setErrClientName('Enter your name');
          capRef.current.reset();
        }
        if (!email) {
          setErrEmail('Enter your email');
          setFirebaseErr('');
          capRef.current.reset();
        } else {
          if (!emailValidation(email)) {
            setErrEmail('Enter a valid email');
            capRef.current.reset();
          }
        }
        if (!password) {
          setErrPassword('Enter your passwoed');
          capRef.current.reset();
        } else {
          if (password.length < 6) {
            setErrPassword('Passwords must be at least 6 characters');
            capRef.current.reset();
          }
        }

        if (!cPassword) {
          setErrCPassword('Confirm your password');
          capRef.current.reset();
        } else {
          if (cPassword !== password) {
            setErrCPassword('Password not matched');
            capRef.current.reset();
          }
        }

        /*This code is an axios.post request that sends the generated token and input field value 
      from reCAPTCHA and input field to the Node.js backend.*/

        if (
          clientName &&
          email &&
          emailValidation(email) &&
          password &&
          password.length >= 6 &&
          cPassword === password
        ) {
          //console.log(clientName, email, password, cPassword);
          setLoading(true);
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              updateProfile(auth.currentUser, {
                displayName: clientName,
                photoURL:
                  'https://www.noormohammad.live/static/media/roundedProfile.477a194221d255c8ce26.png',
              });
              // Signed up
              const user = userCredential.user;
              //console.log(user);
              setLoading(false);
              setSuccessMsg('Account Created Successfully!');
              setTimeout(() => {
                navigate('/signin');
              }, 3000);
              // ...
            })
            .catch((error) => {
              setLoading(false);
              const errorCode = error.code;
              const errorMessage = error.message;

              //console.log(error, errorCode);
              if (errorCode.includes('auth/email-already-in-use')) {
                setFirebaseErr('Email Already in use, Try another one');
              }
              // ..
            });
          setClientName('');
          setEmail('');
          setPassword('');
          setCPassword('');
          setErrCPassword('');
          setFirebaseErr('');
          setErrorRecaptcha(false);

          capRef.current.reset();
        }
      } else {
        setErrorRecaptcha(true);
        setLoading(false);
      }
    } else {
      setErrorMsg('please verify ');
    }

    //setLoading(true);
  };
  return (
    <div className="w-full ">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[370px] mx-auto flex flex-col items-center">
          <Link to="/">
            <img className="w-32" src={darkLogo} alt="darkLogo" />
          </Link>

          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your name</p>
                <input
                  onChange={handleName}
                  className="w-full  p-1 border border-zinc-400px-2 text-base rounded-sm 
              outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100 
              "
                  type="text "
                  value={clientName}
                />
                {errClientName && (
                  <p
                    className="text-red-600 text-xs font-semibold tracking-wide flex
              items-center gap-2 -mt-1.5
              "
                  >
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email or phone number</p>
                <input
                  onChange={handleEmail}
                  className="w-full lowercase p-1 border border-zinc-400 px-2 text-base rounded-sm 
              outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100
              "
                  type="email "
                  value={email}
                />
                {errEmail ? (
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
                ) : firebaseErr ? (
                  <p
                    className="text-red-600 text-xs font-semibold tracking-wide flex
              items-center gap-2 -mt-1.5
              "
                  >
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {firebaseErr}
                  </p>
                ) : (
                  ''
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  className="w-full  p-1 border border-zinc-400px-2 text-base rounded-sm 
              outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100
              "
                  type={isShownPass ? 'text' : 'password'}
                  value={password}
                />

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
              </div>
              <div className="flex flex-col gap-2 mb-2">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  onChange={handleCPassword}
                  className="w-full  p-1 border border-zinc-400px-2 text-base rounded-sm 
              outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100
              "
                  type={isShownPass ? 'text' : 'password'}
                  value={cPassword}
                />
                <div className="flex items-center gap-2 -mt-1">
                  <input
                    id="checkbox"
                    type="checkbox"
                    checked={isShownPass}
                    onChange={() => setIsSHownPass(!isShownPass)}
                    className=""
                  />
                  <label htmlFor="checkbox" className="text-sm  ">
                    Show password?
                  </label>
                </div>
                {errCPassword && (
                  <p
                    className="text-red-600 text-xs font-semibold tracking-wide flex
              items-center gap-2 -mt-1.5
              "
                  >
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errCPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Passwords must be at least 6 characters.
                </p>
              </div>
              <div className="flex items-center justify-center w-full">
                <ReCAPTCHA
                  sitekey="6LenrFUpAAAAAPYE3GcYCjeBRmu5tOQ5Sm86Gekg"
                  ref={capRef}
                  onChange={() => setErrorRecaptcha(false)}
                />
              </div>
              {errorMsg && (
                <p
                  className="text-red-600 text-xs font-semibold tracking-wide flex
              items-center gap-2 -mt-1.5
              "
                >
                  <span className="italic font-titleFont font-extrabold text-base">
                    !
                  </span>
                  {errorMsg}
                </p>
              )}
              {errorRecaptcha && (
                <p
                  className="text-red-600 text-xs font-semibold tracking-wide flex
                     items-center gap-2 -mt-1.5
                     "
                >
                  An error occured
                </p>
              )}

              <button
                onClick={handleRegistration}
                disabled={loading}
                className="w-full py-1.5 text-sm font-normal rounded-sm
              bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b 
            border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput
            "
              >
                Continue
              </button>
              {loading && <LoadingBox color="#febd69" />}
              {successMsg && (
                <div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-base font-titleFont font-semibold text-green-500 border-[1px]
                 border-green-500 px-2 text-center
                 "
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              {' '}
              Continuing, you agree to Amazon's{' '}
              <span className="text-blue-600">Conditions of Use </span> and{' '}
              <span className="text-blue-600">Privace Notice.</span>
            </p>
            <div>
              <p className="text-xs text-black">
                Already have an account?{' '}
                <Link to="/signin">
                  <span
                    className="text-xs text-blue-600 hover:text-orange-600
              hover:underline underline-offset-1 cursor-pointer duration-100
              "
                  >
                    sign in{' '}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black -mt-2">
                Buying for work?
                <span
                  className="text-xs text-blue-600 hover:text-orange-600
              hover:underline underline-offset-1 cursor-pointer duration-100
              "
                >
                  Create a free business account
                </span>
              </p>
            </div>
          </div>
        </form>
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

export default Registration;
