import { useAuth } from "@/context/AuthProvider";
import logo from "../../public/images/logo1.jpg";
import { Link } from "react-router-dom";

export default function Navbar() {
 
  const { user } = useAuth();
    return (
        <div className="w-full h-[8vh] shadow-sm fixed top-0 z-50 left-0 bg-[#36393c] !text-white flex items-center justify-between px-6">
            <Link to={'/dashboard'} className="flex justify-between items-center gap-4">
                <img src={logo} alt="" height={40} width={40} className="rounded-md" />
                <div className="text-2xl font-semibold ">
                    LDBMS
                </div>
            </Link>
            <div className="flex items-center gap-2">
                
                <div className="rounded-full p-2 capitalize text-lg font-medium text-white bg-blue-500">
                   
                </div>
                
               
                <div className="">
                    <p> {user?.firstName.toUpperCase()}</p>
                    <p className="text-sm">{user?.email}</p>
                    {/* <p className="text-sm">{user?.telephone}</p> */}
                </div>
            </div>
        </div>
    )
}