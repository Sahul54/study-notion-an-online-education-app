import React, { useEffect, useState } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/api';


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
                                            <div>
                                                <p>
                                                    {link.title}
                                                </p>
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
                        user && user?.accountType != "Instructor" && (
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
