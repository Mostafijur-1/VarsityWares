import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, varsityData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import { setSearchTerm } from "../../redux/actions/search";
import Sidebar from "./Sidebar";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const openSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.remove("-translate-x-full");
      sidebarRef.current.classList.add("translate-x-0");
      setShowSidebar(true);
    }
  };

  const closeSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.remove("translate-x-0");
      sidebarRef.current.classList.add("-translate-x-full");
      setShowSidebar(false);
    }
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[30px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <h1 className="font-semibold text-4xl flex items-center space-x-2 font-poppins">
                varsity<span className="text-sky-500">wares</span>
              </h1>
            </Link>
          </div>
          {/* search box */}
          <div className="w-[40%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-sky-400 border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={25}
              className="absolute right-2 top-1.5 cursor-pointer"
              color="#00c9f6"
            />
          </div>

          <div className={`${styles.button2}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#000000] hover:text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become a seller"}
                <BsPerson className="ml-1" />
              </h1>
            </Link>
          </div>
          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="#00c9f6" />
                <span className="absolute right-0 top-0 rounded-full bg-blue-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} color="#00c9f6" />
                <span className="absolute right-0 top-0 rounded-full bg-blue-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="#00c9f6" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-gradient-to-b from-sky-400 to-sky-500 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Filter */}

          <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
            <BiMenuAltLeft size={30} className="absolute top-4 left-2" />
            <button
              className={`h-[100%] w-full flex justify-between items-center pl-16 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              onClick={openSidebar}
            >
              Filter Products
            </button>
            <IoIosArrowDroprightCircle
              size={21}
              className="absolute right-2 top-5 cursor-pointer"
              onClick={openSidebar}
            />

            {showSidebar && (
              <div
                className="fixed inset-0 bg-black opacity-50 z-30"
                onClick={closeSidebar}
              ></div>
            )}

            <Sidebar
              categoriesData={categoriesData}
              varsityData={varsityData}
              sidebarRef={sidebarRef}
              closeSidebar={closeSidebar}
            />
          </div>

          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>
        </div>
      </div>

      {/*#####################################mobile header ############################################################################################################################*/}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <h1 className="font-semibold text-3xl flex items-center space-x-2 font-poppins">
                varsity<span className="text-blue-600">wares</span>
              </h1>
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-blue-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-red-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#000] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <BsPerson className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-red-500"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
