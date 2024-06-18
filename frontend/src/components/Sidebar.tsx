import { FiLogOut } from "react-icons/fi";
import { Button } from "./Button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";


import Loader from "./Loader";
import { TbCategoryFilled } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";


const links: { label: string, href: string,icon:any }[] = [
    {
        icon:<TbCategoryFilled/> ,
        label: "Overview", href: '/dashboard/account'
    },
    {
        icon:<FaRegUser /> ,
        label: "Libraries", href: "/dashboard/users"
    },
    {
        icon:<TbCategoryFilled/> ,
        label: "Books", href: "/dashboard/analytics"
    }
]

export default function Sidebar() {
    const location = useLocation();

    const [loggingOut, setLoggingOut] = useState(false);

    
    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/";
        setLoggingOut(true);
      };
    
    return (
        <div className="h-[92vh] bg-[#36393c] w-[15vw] shadow-md fixed p-4 flex flex-col justify-between">
            <div className="space-y-2">
                {
                    links.map(link => (
                        <li className="list-none" key={link.href}>
                            <Link
                                to={link.href}
                                className={` py-2.5 flex items-center gap-4  px-4 rounded transition duration-200 ${location.pathname == link.href ? 'bg-blue-500' : 'hover:bg-gray-400'} text-white`}>
                                {link.icon}
                                {link.label}
                            </Link>
                        </li>
                    ))
                }
            </div>
            <Button disabled={loggingOut} onClick={logout} className="mb-8 rounded-md space-x-4">
                {loggingOut ?
                    <Loader /> :
                    <>
                        <span>Logout</span>
                        <FiLogOut className="text-lg" />
                    </>}
            </Button>
        </div>
    )
}