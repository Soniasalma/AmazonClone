import React, { useContext, useEffect, useRef, useState } from 'react';
import { logo } from '../../assets/index';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { categories } from '../../constants/index';
import HeaderBottom from './HeaderBottom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { userSignOut } from '../../redux/amazonSlice';
import Categories from './Categories';
import CatContext from '../../hooks/CatContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

import useLocationInfo from '../../api/useLocationInfo';
import Favorites from './Favorites';

const Header = () => {
  const auth = getAuth();
  const catMenu = useRef();
  const userMenu = useRef();
  const wishRef = useRef();
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);

  const [showListUser, setShowListUser] = useState(false);
  const [showWishList, setShowWishList] = useState(false);

  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const favorites = useSelector((state) => state.amazon.favorites);
  const { filter, setFilter, setSearch, search } = useContext(CatContext);

  //console.log(userInfo);
  //console.log(products);
  //console.log(favorites);
  const [geoInfo, loading, error] = useLocationInfo();

  useEffect(() => {
    setShowAll(false);
    setShowListUser(false);
    setShowWishList(false);
    const handleClickOutside = (event) => {
      if (catMenu.current && !catMenu.current.contains(event.target)) {
        setShowAll(false);
      }
    };
    const handleClickOutsideuserMenu = (event) => {
      if (userMenu.current && !userMenu.current.contains(event.target)) {
        setShowListUser(false);
      }
    };
    const handleClickOutsideWishList = (event) => {
      if (wishRef.current && !wishRef.current.contains(event.target)) {
        setShowWishList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideuserMenu);
    document.addEventListener('mousedown', handleClickOutsideWishList);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideuserMenu);
      document.removeEventListener('mousedown', handleClickOutsideWishList);
    };
  }, [filter, catMenu, wishRef, userMenu]);
  {
    /*if (geoInfo) {
    console.log(geoInfo);
  }*/
  }
  const handleFilterAll = () => {
    setFilter('All');
    setShowAll(!showAll);
  };
  const handleChangeOfCategory = () => {
    setShowAll(!showAll);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    //const searchTerm = searchRef.current.value;
    //console.log(searchTerm);
    setSearch(searchTerm);
  };

  const handleLogout = () => {
    //console.log('logged out');
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // console.log('Sign out successfully ');
        dispatch(userSignOut({}));
      })
      .catch((error) => {
        // An error happened.
      });
    setShowListUser(false);
  };

  return (
    <div>
      <div className="w-full sticky top-0 z-50 ">
        <div className="w-full relative bg-amazon_blue text-white px-1 py-1 xl:px-4 md:py-3 flex items-center  flex-wrap gap-1 xl:gap-4">
          {/* ============ Image Start here ================ */}
          <Link to="/">
            <div className="headerHover">
              <img className=" w-14 lg:w-24 mt-2" src={logo} alt="logo" />
            </div>
          </Link>

          {/* ============ Image End here ================== */}
          {/* ============ Deliver Start here ============== */}
          <div className="headerHover hidden lg:inline-flex ">
            <LocationOnOutlinedIcon />
            <p className="text-sm  text-lightText font-light flex flex-col">
              Deliver to{'  '}
              <span className="text-sm font-semibold -mt-1 text-whiteText">
                {loading ? (
                  <span>Loading...</span>
                ) : error ? (
                  <span>error</span>
                ) : (
                  geoInfo
                )}
              </span>
            </p>
          </div>
          {/* ============ Deliver End here ================ */}
          {/* ============ Search Start here =============== */}

          <div className=" h-9 xl:h-10 rounded-md  order-last  lg:order-none  flex items-center flex-grow   flex-shrink-0 lg:flex-shrink  relative  ">
            <div className=" h-full" ref={catMenu}>
              <span
                onClick={() => setShowAll(!showAll)}
                className=" h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center 
            rounded-tl-md rounded-bl-md text-center py-2 pl-1 "
              >
                {filter}{' '}
                <span>
                  <ArrowDropDownOutlinedIcon />
                </span>
              </span>
              {showAll && (
                <div>
                  <ul
                    className="absolute w-48 lg:w-56  top-9 xl:top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black 
               flex flex-col  gap-1 z-50 px-2 py-1 shadow-lg rounded-md"
                  >
                    <li className="text-sm tracking-wide mt-1 py-1 px-2 font-titleFont border-b-[1px] border-b-transparent hover:bg-gray-200 hover:rounded-md  cursor-pointer duration-200">
                      <Link to="/">
                        <div
                          className="whitespace-nowrap"
                          onClick={() => handleFilterAll()}
                        >
                          All
                        </div>
                      </Link>
                    </li>
                    {categories.map((category) => (
                      <div onClick={handleChangeOfCategory}>
                        <Categories key={category._id} category={category} />
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <input
              className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
            <Link
              to="/"
              className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md"
            >
              <span>
                <SearchIcon />
              </span>
            </Link>
          </div>
          {/* ============ Search End here ================= */}
          <div className=" float-right lg:inline-flex ">
            <div className="flex  items-center lg:items-start xl:gap-4  ">
              {/* ============ Signin Start here =============== */}

              <div className="h-9 xl:h-10 rounded-md relative">
                <div
                  onClick={() => setShowListUser(!showListUser)}
                  className="h-full flex flex-col items-start justify-center headerHover "
                >
                  <div className="flex items-center" ref={userMenu}>
                    {userInfo ? (
                      <div>
                        <p className="text-sm text-white md:text-xs  md:text-lightText  font-light">
                          <span>Hello </span>

                          <span>{userInfo.userName}</span>
                        </p>
                        <p className=" hidden md:block md:text-sm font-semibold -mt-1 text-whiteText">
                          Accounts
                        </p>
                      </div>
                    ) : (
                      <Link to="/signin">
                        <p className="text-sm text-white md:text-xs  md:text-lightText  font-light">
                          <span>Hello </span>

                          <span>sign in</span>
                        </p>
                        <p className=" hidden md:block md:text-sm font-semibold -mt-1 text-whiteText">
                          Accounts
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* ============ Signin End here ================= */}
              {/* ============ Orders Start here =============== */}
              {/*<div className=" hidden lgl:flex flex-col items-start justify-center headerHover  ">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-sm font-semibold -mt-1 text-whiteText">& Orders</p>
                </div>*/}

              {/* ============ Wish List start here ================= */}
              <div
                ref={wishRef}
                onClick={() => {
                  setShowWishList(!showWishList);
                }}
                className=" flex  items-center justify-center headerHover  "
              >
                <FavoriteIcon className="text-xs" />
                <p className="  mt-3 text-xs font-semibold text-whiteText  hidden lg:inline-flex ">
                  Wish List
                </p>
                {showWishList && favorites.length > 0 && (
                  <motion.div
                    initial={{ x: +500, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-[75%] md:w-[350px] right-0 top-11 md:top-12 lg:top-16 z-50  text-black bg-white border-[1px] border-black overflow-y-scroll  shadow-lg absolute "
                  >
                    <div className="w-full bg-amazon_light text-white py-1 px-2 flex items-center justify-between gap-3">
                      <h3 className="font-titleFont font-bold text-base lg:text-lg tracking-wide">
                        Your Wish List
                      </h3>
                      <span
                        onClick={() => setShowWishList(false)}
                        className="cursor-pointer z-100 w-5 h-5  flex items-center justify-center  text-gray-200 hover:bg-red-500 hover:text-white duration-300"
                      >
                        <CloseIcon />
                      </span>
                    </div>

                    <ul className="text-sm">
                      {favorites.map((fav) => (
                        <Favorites
                          key={fav.id}
                          id={fav.id}
                          title={fav.title}
                          image={fav.image}
                        />
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* ============ Wish List End here ================= */}

              {/* ============ Orders End here ================= */}
              {/* ============ Cart Start here ================= */}
              <Link to="/cart">
                <div className="flex items-center justify-center headerHover relative">
                  <ShoppingCartIcon className="text-xs" />
                  <p className="text-sm mt-3 text-lightText ">
                    <span className=" hidden lg:inline-flex text-xs font-semibold text-whiteText">
                      Cart{' '}
                    </span>
                    <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
                      {products.length ? products.length : 0}
                    </span>
                  </p>
                </div>
              </Link>
              {userInfo && (
                <div
                  onClick={handleLogout}
                  className="flex  justify-center items-center headerHover relative"
                >
                  <LogoutIcon className="text-xs " />
                  <p className="hidden lg:inline-flex text-xs mt-4 font-semibold text-whiteText">
                    Sign out
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <HeaderBottom />

        {/* ============ Deliver Start here for mobile phones============== */}
        <div className="w-full bg-amazon_blue py-1 headerHover text-white  lg:hidden flex items-center">
          <LocationOnOutlinedIcon />
          <p className="text-xs text-whiteText font-light flex items-center">
            Deliver to {'  '} <span className="ml-1">{geoInfo}</span>
          </p>
        </div>
        {/* ============ Deliver End here for mobile phones ================ */}
      </div>
    </div>
  );
};

export default Header;
