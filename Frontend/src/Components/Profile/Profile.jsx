import React from "react";
import profileImage from "../../assets/user.png";
import { useState } from "react";
import Navbar from "../FrontPage/Navbar";
const Profile = () => {
  const [companies, setCompanies] = useState([1, 2, 3, 4, 5]);
  return (
    <div>
      <div className="fixed w-full">
        <Navbar hide={false} />
      </div>
      <div className="h-full pb-20 pl-5 w-full bg-blue-100 pt-25">
        <div className="flex flex-row justify-evenly content-center items-center h-1/2 w-full  pb-10">
          <div className="flex flex-col justify-evenly items-center h-60 text-2xl font-bold font-sans hover:shadow-amber-300 hover:shadow-2xl hover:h-[260px] hover:w-[220px] transition-all duration-300">
            <img
              className="rounded-full size-40"
              src={profileImage}
              alt="Profile picture of the user"
            />
            <h1>User Name</h1>
          </div>
          <div className="h-[240px] w-[200px] rounded-sm border-none flex flex-col justify-evenly items-center hover:shadow-amber-300 hover:shadow-2xl hover:h-[260px] hover:w-[220px] transition-all duration-300">
            <h1 className="text-2xl font-bold font-sans">Total Amount</h1>
            <h1 className="text-2xl font-bold font-sans">5000 Rs</h1>
            <button className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition-all duration-300">
              Add Money
            </button>
            <button className="bg-red-400 text-white rounded-md p-2 hover:bg-red-500 transition-all duration-300">
              Withdraw Money
            </button>
          </div>
          <div className="h-[240px] w-[200px] rounded-sm border-none flex flex-col justify-evenly items-center hover:shadow-amber-300 hover:shadow-2xl hover:h-[260px] hover:w-[220px] transition-all duration-300">
            <h1 className="text-2xl font-bold font-sans">Net Profit Loss</h1>
            <h1 className="text-2xl font-bold font-sans">5000 Rs</h1>
          </div>
          <div className="flex flex-col justify-evenly items-center h-60 w-50 text-2xl font-bold font-sans hover:shadow-amber-300 hover:shadow-2xl hover:h-[260px] hover:w-[220px] transition-all duration-300">
            <h1>Chart</h1>
          </div>
        </div>
        <div>
          <h1 className="font-bold mb-4 font-sans text-2xl">
            Companies You Invested In
          </h1>
          <hr />
          <div className="m-5 flex flex-row justify-evenly content-center items-center h-1/2 w-full">
            {companies.map((company, index) => {
              return (
                <div className="h-50 w-50 rounded-xl border-amber-300 border-2 hover:shadow-amber-300 hover:shadow-2xl hover:h-[200px] hover:w-[200px] transition-all duration-300"></div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="font-bold mb-4 font-sans text-2xl">
            Companies You Often Visit
          </h1>
          <hr />
          <div className="m-5 flex flex-row justify-evenly content-center items-center h-1/2 w-full">
            {companies.map((company, index) => {
              return (
                <div className="h-50 w-50 rounded-xl border-amber-300 border-2 hover:shadow-amber-300 hover:shadow-2xl hover:h-[200px] hover:w-[200px] transition-all duration-300"></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
