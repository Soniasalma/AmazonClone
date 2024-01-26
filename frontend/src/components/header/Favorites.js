import React from 'react';

import { useDispatch } from 'react-redux';
import { removeFromWishList } from '../../redux/amazonSlice';

const Favorites = ({ id, title, image }) => {
  const dispatch = useDispatch();

  //console.log(image);
  return (
    <div>
      <li className=" flex items-center justify-between text-sm tracking-wide font-titleFont  p-2  border-b-[1px] border-b-black hover:bg-gray-200 hover:rounded-md cursor-pointer duration-200">
        <p>{title.substring(0, 20)}</p>
        <div className="flex items-center gap-2">
          <img className="h-10 w-10 rounded-sm" src={image} alt="favoriteimg" />
          <button
            onClick={() => dispatch(removeFromWishList({ id }))}
            className="cursor-pointer text-sm rounded-md px-1 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300"
          >
            {' '}
            remove
          </button>
        </div>
      </li>
    </div>
  );
};

export default Favorites;
