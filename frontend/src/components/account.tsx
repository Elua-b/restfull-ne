import { useAuth } from "@/context/AuthProvider";
import { Input, InputWrapper } from "@mantine/core";
import Cards from "./cards";
import { FaUsers, FaUserTie, FaBoxOpen } from "react-icons/fa";
import { AuthAPi } from "@/api";
import { useEffect, useState } from "react";

const Account = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ users: 0, books: 0, Libraries: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch books count
        const bookResponse = await AuthAPi("/book/books");
        const BooksResult = await bookResponse.data.Books ;
        console.log(BooksResult);
        
        const BooksCount = BooksResult.length; // Assuming the response is an array of books

        // Assuming you have other endpoints or static data for users and products
        const usersCount = 100; // Replace with actual data fetching logic
        const productsCount = 200; // Replace with actual data fetching logic
        

        setData({
          users: usersCount,
          books: BooksCount,
          Libraries: productsCount,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
       <div className=" grid grid-cols-1 gap-6 md:grid-cols-3">
          <Cards
            title="Users"
            count={100}
            icon={<FaUsers className="text-4xl text-blue-500" />}
          />
          <Cards
            title="Books"
            count={data.books}
            icon={<FaUserTie className="text-4xl text-blue-500" />}
          />
          <Cards
            title="Libraries"
            count={200}
            icon={<FaBoxOpen className="text-4xl text-blue-500" />}
          />
        </div>
      <div className="mt-8 flex  w-full flex-col items-center p-4 ">
     
        <div className=" border-mainblue mt-11 rounded-full border-2">
          <img
            className=" w-40 rounded-full"
            src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&bold=true`}
            alt=""
          />
        </div>
        <div className="mx-auto mt-5 flex w-full max-w-[800px] flex-col items-center">
          <div className="grid w-full gap-6 sm:grid-cols-2">
            <InputWrapper label="FirstName" description="First name for the user">
              <Input defaultValue={user?.firstName} disabled type={"text"} />
            </InputWrapper>
            <InputWrapper label="Email" description="Email">
              <Input defaultValue={user?.email} disabled type={"text"} />
            </InputWrapper>
            <InputWrapper label="Last Name" description="Last Name">
              <Input defaultValue={user?.lastName} disabled type={"text"} />
            </InputWrapper>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
