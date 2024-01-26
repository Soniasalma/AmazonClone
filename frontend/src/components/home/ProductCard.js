import React, { useContext, useEffect, useState } from 'react';
//import ApiIcon from '@mui/icons-material/Api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  addToCart,
  addToWishList,
  removeFromWishList,
} from '../../redux/amazonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Rating from '../Rating';

const ProductCard = ({ item }) => {
  const [isExist, setIsExist] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.amazon.favorites);

  useEffect(() => {
    const checkExist = () => {
      const check = favorites.find((product) => product.id === item.id);
      if (check) {
        setIsExist(true);
      }
    };
    checkExist();
  }, [favorites, item.id, isExist]);
  const handleRemove = () => {
    if (isExist) {
      dispatch(
        removeFromWishList({
          id: item.id,
        })
      );
      setIsExist(false);
      toast.success(
        `${item.title.substring(0, 20)} is removed from your Wish list`,
        {
          className: 'toast-message',
        }
      );
    } else {
      toast.success(
        `${item.title.substring(
          0,
          20
        )} is not exist  in your wish list, You can not remove it `,
        {
          className: 'toast-message',
        }
      );
    }
  };
  const handleAdd = () => {
    if (!isExist) {
      dispatch(
        addToWishList({
          id: item.id,
          title: item.title,
          image: item.image,
        })
      );
      setIsExist(true);
      toast.success(
        `${item.title.substring(0, 20)} is added to your Wish list`,
        {
          className: 'toast-message',
        }
      );
    } else {
      toast.success(
        `${item.title.substring(
          0,
          20
        )} is exist in your Wish list, you can not add it`,
        {
          className: 'toast-message',
        }
      );
    }
  };
  return (
    <div>
      <div
        key={item.id}
        className="bg-white h-full border-[1px] border-gray-200 py-8 z-30
        hover:border-transparent shadow-none hover:shadow-testShadow duration-200
        flex flex-col gap-4 relative items-center justify-between

        "
      >
        <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
          {item.category}
        </span>
        <div className="w-full h-full flex items-center justify-center relative group">
          <img
            className="w-52 h-64 object-contain"
            src={item.image}
            alt="ProductImg"
          />
          <ul
            className="w-full h-36 bg-gray-100 absolute -bottom-[170px]
             flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r
            group-hover:bottom-0 duration-700
            "
          >
            {/*<li className="productLi">
              Compare{' '}
              <span>
                <ApiIcon />
              </span>
  </li>*/}
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    quantity: 1,
                  })
                ) &
                toast.success(`${item.title.substring(0, 20)} is added`, {
                  className: 'toast-message',
                })
              }
              className="productLi"
            >
              Add to Cart{' '}
              <span>
                <ShoppingCartIcon />
              </span>
            </li>
            {/* <li onClick={handleDetails} className="productLi">
              View Details{' '}
              <span>
                <ArrowCircleRightIcon />
              </span>
            </li>*/}

            {/* <li className="productLi">
              <Link to={item.id.toString()}>
                <div>
                  View Details{' '}
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                </div>
              </Link>
          </li>*/}

            <li onClick={handleRemove} className="productLi">
              Remove from Wish List{' '}
              <span>
                <FavoriteIcon />
              </span>
            </li>

            <li onClick={handleAdd} className="productLi">
              Add to Wish List{' '}
              <span>
                <FavoriteIcon />
              </span>
            </li>
          </ul>
        </div>
        <div className="px-4 z-10 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
              {item.title.substring(0, 20)}
            </h3>
            <p className="text-sm text-gray-600 font-semibold">${item.price}</p>
          </div>
          <div>
            <p className="text-sm mb-1">
              {item.description.substring(0, 100)}...
            </p>
            <div className="text-yellow-500 ">
              <Rating rating={item.rating.rate} />
            </div>
          </div>
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  price: item.price,
                  category: item.category,
                  image: item.image,
                  quantity: 1,
                })
              ) &
              toast.success(`${item.title.substring(0, 20)} is added`, {
                className: 'toast-message',
              })
            }
            className="w-full font-titleFont font-medium text-base bg-gradient-to-tr
            from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500
            border-yellow-500 hover:border-yellow-700 active:bg-gradiant-to-bl
            active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3 
            "
          >
            Add to Cart
          </button>
        </div>
      </div>

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
        className="w-[75%] md:w-[350px]"
      />
    </div>
  );
};

export default ProductCard;
