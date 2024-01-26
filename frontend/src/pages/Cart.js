import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from '../redux/amazonSlice';
import { emptyCart } from '../assets/index';
import { Link } from 'react-router-dom';
import CatContext from '../hooks/CatContext';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const [totalPrice, setTotalPrice] = useState('');

  const [payNow, setPayNow] = useState(false);
  const { setSearch, setFilter } = useContext(CatContext);

  useEffect(() => {
    setSearch('');
    setFilter('All');
  }, []);
  useEffect(() => {
    let total = 0;
    total = products.reduce((a, b) => a + b.quantity * b.price, 0).toFixed(2);
    setTotalPrice(total);
  }, [products]);
  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error('Please sign in to Checkout');
    }
  };
  const payment = async (token) => {
    await axios
      .post('http://localhost:8000/pay', {
        amount: totalPrice * 100,
        token: token,
      })
      .then((response) => {
        // console.log(response);
        alert('Payment Success');
        dispatch(resetCart({}));
      })
      .catch((error) => {
        //console.log('Payment Error: ', error);
        alert('Payment Error');
      });
  };
  return (
    <div className="w-full bg-gray-100 p-4">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="w-full h-full bg-white px-4  xl:col-span-4">
            <div
              className="font-titleFont flex items-center justify-between border-b-[1px]
            border-b-gray-400 py-3
            "
            >
              <h2 className=" text-base xl:text-3xl font-medium">
                Shopping Cart
              </h2>
              <h4 className=" text-base xl:text-xl font-normal hidden xl:block">
                Subtotal
              </h4>
            </div>
            {/* Products start here*/}
            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full  border-b-[1px] border-b-gray-300 py-1 xl:p-4 "
                >
                  <div className="w-full  flex items-center justify-between  gap-6">
                    <div className="w-1/5">
                      <img
                        className="w-full h-44 object-contain "
                        src={item.image}
                        alt=" Productimg"
                      />
                    </div>
                    <div className="w-4/5 flex flex-col gap-2">
                      <h2 className="xl:text-lg text-sm font-semibold ">
                        {item.title}
                      </h2>
                      <p className="text-xs xl:text-sm">{item.description}</p>
                      <div className="flex items-center gap-8">
                        <p className="text-base font-titleFont  font-semibold ">
                          Unit Price
                        </p>
                        <p className=" font-titleFont font-semibold">
                          ${item.price}
                        </p>
                      </div>

                      <div
                        className="bg-[#F0F2F2] flex justify-center items-center gap-1 w-36
                  py-1 text-center drop-shadow-lg rounded-md
                  "
                      >
                        <p className="">quantity :</p>
                        <p
                          onClick={() =>
                            dispatch(decrementQuantity({ id: item.id }))
                          }
                          className="cursor-pointer bg-gray-200 px-1 rounded-md
                    hover:bg-gray-400 duration-300
                    "
                        >
                          -
                        </p>
                        <p>{item.quantity}</p>
                        <p
                          onClick={() =>
                            dispatch(incrementQuantity({ id: item.id }))
                          }
                          className="cursor-pointer bg-gray-200 px-1 rounded-md
                    hover:bg-gray-400 duration-300
                    "
                        >
                          +
                        </p>
                      </div>
                      <div className="flex items-center justify-between flex-wrap">
                        <div className="flex items-center gap-8  xl:hidden ">
                          <h4 className="text-base font-titleFont  font-semibold ">
                            Subtotal
                          </h4>
                          <p className=" font-titleFont font-semibold  ">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => dispatch(deleteItem({ id: item.id }))}
                          className="bg-red-500 w-36 py-1 text-white rounded-lg my-2 
                  hover:bg-red-700 active:bg-red-900 duration-300 
                  "
                        >
                          Delete Item
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-titleFont font-semibold hidden xl:block">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full py-2 xl:py-4">
              <button
                onClick={() => dispatch(resetCart({}))}
                className=" px-5 xl:px-10 py-1 xl:py-2 bg-red-500 hover:bg-red-600 active:bg-red-500
                 text-base xl:text-lg tracking-wide text-white rounded-lg font-titleFont font-semibold
            "
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full h-64 bg-white  xl:col-span-1 flex flex-col items-center justify-center p-4">
            <div>
              <p className="flex gap-2 items-start text-sm">
                <span className="bg-white text-green-500 rounded-full">
                  <CheckCircleIcon />
                </span>
                Your order qualifies for FREE Shipping this option at checkout.
                see details....
              </p>
            </div>
            <div>
              <p className="font-semibold px-10 py-1 flex items-center gap-2 justify-between">
                Total <span className="text-lg font-bold">${totalPrice}</span>
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full font-titleFont font-medium text-base bg-gradient-to-tr
            from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500
            border-yellow-500 hover:border-yellow-700 active:bg-gradiant-to-bl
            active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3 
            "
            >
              Proceed to checkout
            </button>
            {payNow && (
              <div className="w-full mt-6 flex items-center justify-center ">
                <StripeCheckout
                  className="bg-gradient-to-tr
                from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500
                border-yellow-500 hover:border-yellow-700 active:bg-gradiant-to-bl
                active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3 "
                  stripeKey="pk_test_51OQjpdIN8hcCm4F9jNWJkYztPPkFEoKqCzaknQp0Vse6xztXG9udayBa17D6CNgjrPzzuwPBnBH6jRxrU8TGfFjx0098nhYgZT"
                  name="Amazona Online Shopping"
                  amount={totalPrice * 100}
                  label="Pay to Amazon"
                  description={`your payment amount is ${totalPrice}`}
                  token={payment}
                  email={userInfo.email}
                  onClose={() => console.log('payment closed')}
                  onSuccess={() => console.log('payment successful')}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col mdl:flex-row  justify-center items-center gap-4 py-10 "
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptycart"
            />
          </div>
          <div
            className="w-64 sm:w-80 md:w-96 p-4 bg-white flex flex-col items-center rounded-md
        shadow-lg
        "
          >
            <h1 className="font-titleFont text-base mdl:text-xl font-bold">
              Your Cart feels Lonely.
            </h1>
            <p className="text-sm text-center">
              {' '}
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos,etc. and make it happy.
            </p>
            <Link to="/">
              <button
                className="mt-6 bg-yellow-400 rounded-md cursor-pointer
            hover:bg-yellow-500 active:bg-yellow-700 px-2 md:px-8 py-1 md:py-2 font-titleFont font-semibold text-base md:text-lg
            "
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Cart;
