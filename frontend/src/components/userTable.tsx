import { Button } from "./Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IUsers } from "../types";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import AddUserModal from "./modals/AddUser";

export default function UsersTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const users: IUsers[] = [
    {
      country: "Rwanda",
      firstName: "Hirwa",
      lastName: "Vanessa",
      email: "hirwavanessa@gmail.com",
      joinedAt: "2022-09-07",
      id: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      
    },
    {
      country: "Rwanda",
      firstName: "Hirwa",
      lastName: "Vanessa",
      email: "hirwavanessa@gmail.com",
      joinedAt: "2022-09-07",
      id: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
    

    },
    {
      country: "Rwanda",
      firstName: "Hirwa",
      lastName: "Vanessa",
      email: "hirwavanessa@gmail.com",
      joinedAt: "2022-09-07",
      id: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      

    },
    {
      country: "Rwanda",
      firstName: "Hirwa",
      lastName: "Vanessa",
      email: "hirwavanessa@gmail.com",
      joinedAt: "2022-09-07",
      id: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
    

    },
    {
      country: "Rwanda",
      firstName: "Hirwa",
      lastName: "Vanessa",
      email: "hirwavanessa@gmail.com",
      joinedAt: "2022-09-07",
      id: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      

    },
    {
      country: "Rwanda",
      firstName: "Hirwa",
      lastName: "Vanessa",
      email: "hirwavanessa@gmail.com",
      joinedAt: "2022-09-07",
      id: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      

    },
  ];
  return (
    <div className="mt-8 flow-root min-h-screen p-4">
      <div className="flex w-full justify-between">
        <div>
          <h2 className="text-xl font-medium text-gray-700">Libraries</h2>
          <p className="text-gray-500">Manage your Libraries here.</p>
        </div>
        <Button
          onClick={openModal}
          color="blue"
          className="space-x-2 rounded-md"
        >
          <span>Add Library</span>
          <FiPlus className="text-lg" />
        </Button>
        <AddUserModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="mt-4  min-h-[60vh] overflow-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full  divide-y divide-gray-300 ">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Country
                  </th>
                  <th
                    scope="col"
                    className="shrink-0 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Joined At
                  </th>
{/* 
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th> */}
                  <th>
                    <span>Status</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user: IUsers, idx) => (
                  <UserRow key={idx} {...user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const UserRow = ({ firstName, country, lastName, email, joinedAt }: IUsers) => {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {country}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {firstName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {lastName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {joinedAt}
      </td>
      <td>
      <Button className="space-x-2 rounded-md" color="red" variant="solid">
        <span>Delete</span>
        <RiDeleteBin5Line />
      </Button>
      </td>
    
    </tr>
  );
};
