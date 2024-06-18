import { Button } from "@mantine/core";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { apis, getResError } from "@/api";
import { notifications } from "@mantine/notifications";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);



  const login = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login", data);
    setLoading(true);
    try {
      const res = await apis.post("user/login", data);
      console.log(res);
      notifications.show({
        title: "Login Success",
        message: "Login Success",
        color: "green",
        autoClose: 3000,
      });
      console.log(res.data.user);
      
      if (res.data) {
        
        const user = res.data.user;
        console.log(res.data.token);
        
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(user));
  
        
        const nextUrl = user?.role === "USER" ? "/dashboard/account" : "/dashboard";
        window.location.href = nextUrl;
      }
    } catch (error) {
      console.log(getResError(error));
      const _err = getResError(error);
      notifications.show({
        title: "Login Failed",
        message:
          _err.trim() !== "" ? _err : "The Email or password is incorrec",
        color: "red",
        autoClose: 3000,
      });
    }
    setLoading(false);
  };


  return (
    <main className="h-screen w-screen bg-blue-500 ">
      <div className="flex  h-full w-full items-center justify-center  p-5">
        <div className="h-full w-full   max-w-full   bg-white p-4 pt-8 sm:p-8 md:max-w-md">
          <header className="m-auto w-fit scale-90">
            <h2 className="mt-8 text-center text-2xl font-semibold">LOGIN LDBMS</h2>
          </header>

          <div className="mt-12 scale-90 ">
            <form onSubmit={login}>
              <div className="field mt-6 flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-md font-regular text-black-primary"
                >
                  Email Address
                </label>
                <input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="text-black-primary bg-input boder h-[50px] rounded-[10px] border-none border-transparent px-4 text-sm outline-none active:border-gray-600"
                  type="text"
                  name=""
                  placeholder="example@gmail.com"
                  id="email"
                />
              </div>

              <div className="field relative mt-6 flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-md font-regular text-black-primary"
                >
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="text-black-primary bg-input boder h-[50px] rounded-[10px] border-none border-transparent px-4 text-sm outline-none active:border-gray-600"
                  type={showPassword ? "text" : "password"}
                  name=""
                  placeholder="*********"
                  id="password"
                />
                <div className="absolute bottom-4 right-3">
                  {!showPassword ? (
                    <AiFillEyeInvisible
                      className="text-black-primary cursor-pointer text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiFillEye
                      className="text-black-primary cursor-pointer text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-[15px] w-[15px]"
                    name="me"
                    id="me"
                  />
                  <label className="text-black-primary text-sm" htmlFor="me">
                    Remember me
                  </label>
                </div>
                <div className="">
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-primary"
                  >
                    Reset Password?
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  radius="md"
                  w={"100%"}
                  size="md"
                  className="h-[50px] w-full rounded-[10px] !bg-blue-500  hover:bfont-semibold text-white"
                >
                  Log In
                </Button>
              </div>

              <div className="mt-6">
                <p className="text-md text-black-primary text-center">
                  Don't have account yet?{" "}
                  <a href="/signup" className="text-primary">
                    New Account
                  </a>{" "}
                </p>
              </div>
              <Link
                to="/on-boarding/fill-profile"
                className=" mx-auto mt-3 text-sm text-primary duration-300 hover:text-blue-900"
              >
                Didn't complete profile?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
