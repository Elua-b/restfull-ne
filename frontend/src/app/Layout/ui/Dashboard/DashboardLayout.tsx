import { Outlet } from "react-router-dom";


// import Navbar from "../Navbar";
// import Sidebar from "../Sidebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout() {
    

    return (
        <div className="w-full ">
            <Navbar />
            <div className="mt-[8vh] flex w-full">
                <Sidebar />
                <div className="md:ml-[15vw] w-full md:w-[85%] h-screen pt-4">
                    <Outlet />

                </div>
            </div>
            
        </div>
    )
}