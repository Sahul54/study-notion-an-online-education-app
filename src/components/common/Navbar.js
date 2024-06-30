import React, { useEffect, useState } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { IoIosArrowDown } from "react-icons/io";


// const subLinks = [
//     {
//         title: "Python",
//         link: "/catalog/python"
//     },
//     {
//         title: "Web dev",
//         link: "/catalog/web-dev"
//     }
// ];

const Navbar = () => {
    
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state ) => state.profile );
    const {totalItem} = useSelector( (state) => state.cart );
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("printing sublink result", result);
            setSubLinks(result.data.data)
        }
        catch(error){
            console.log("could not fetch the category link");
        }
    }

    useEffect( () => {
        fetchSubLinks();
    }, [])


    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 justify-center border-b-[1px] border-richblack-700'>
            <div className='flex w-9/12 max-w-maxContent gap-7 items-center justify-between'>
                {/* Image */}
                <Link to="/">
                    <img src={logo} width={160} height={42} loading='lazy' alt="Logo" />
                </Link>
                
                {/* Navbar */}
                <nav className=''>
                    <ul className='flex gap-6 text-richblack-25 text-center items-center'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className='relative flex flex-row gap-1 items-center group'>
                                                <p>
                                                    {link.title}
                                                </p>
                                                < IoIosArrowDown />

                                                <div className='invisible absolute left-[50%]
                                                translate-x-[-50%] translate-y-[80%]
                                                top-[50%]
                                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                                opacity-0 tranasition-all duration-200 group-hover:visible
                                                group-hover:opacity-100 lg:w-[280px]'>
                                                
                                                <div className='absolute left-[50%] top-0
                                                translate-x-[40%] translate-y-[-45%] 
                                                h-4 w-4 rotate-45 rounded bg-richblack-5'></div>
                                                 {
                                                    subLinks.length ? (
                                                        subLinks.map( (subLink, index) => (
                                                            <Link to = {`$subLink.Link`} key = {index}>
                                                                {/* console.log({subLink.title}); */}
                                                                <p>{subLink.title}</p>
                                                            </Link>
                                                        ))
                                                    ) : (<div></div>)
                                                }
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login/Signup/Dashbord  */}
                <div>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <FaShoppingCart /> 
                                {
                                    totalItem > 0 && (
                                        <span>
                                            {totalItem}
                                        </span>
                                    )
                                }
                                
                            </Link>
                        ) 
                    }

                    {
                        token === null && (
                            <Link to="/login">
                                <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-50 rounded-md m-4'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-50 rounded-md'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }

                    {
                        token !== null && <ProfileDropDown/>
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar;
