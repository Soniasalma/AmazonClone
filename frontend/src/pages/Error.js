import React from 'react';
import { motion } from 'framer-motion';

const Error = ({ message }) => {
  return (
    <div>
      <motion.div
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-center items-center  py-10 "
      >
        <div
          className=" w-full p-2 md:w-96 md:p-4 bg-white flex flex-col items-center rounded-md
        shadow-lg
        "
        >
          <h1 className="font-titleFont text-lg md:text-xl font-semibold md:font-bold">
            {message}
          </h1>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;
