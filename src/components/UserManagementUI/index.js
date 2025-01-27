import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import SkillMatrix from "../SkillMatrix";

const UserManagementUI = () => {
  const [activeTab, setActiveTab] = useState("Compare View");
  const [users, setUsers] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await fetch("https://forinterview.onrender.com/people");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching details:", error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const mostRecommended = users?.slice(0, 4);
  const remainingUsers = users?.slice(4);

  const tabs = ["Compare View", "Individual View", "Shortlisted Candidates"];

  return (
    <div className="flex flex-col md:flex-row gap-4 px- w-full">
      <div className="w-full md:w-[20%] bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex flex-col border-[1px] px-4 py-4">
          <h2 className="text-[24px] font-bold mb-4 text-black ">
            Most Recommended
          </h2>
          {mostRecommended.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 mb-2 px-4  hover:bg-gray-200 cursor-pointer border-b-[1px] py-3 border-black"
            >
              <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                {user.name.charAt(0)}
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[20px] text-black font-semibold">
                  {user.name}
                </p>
                <div>
                  <AiOutlinePlusCircle size={30} color="#3B6790" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-[24px] font-bold mb-4 text-black ">
          Other Candidates
        </h2>
        {remainingUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 mb-2 px-4  hover:bg-gray-200 cursor-pointer border-b-[1px] py-3 border-black"
          >
            <div className="w-10 h-10 bg-gray-300 text-gray-800 flex items-center justify-center rounded-full">
              {user.name.charAt(0)}
            </div>
            <div className="flex flex-row gap-4">
              <p className="text-[20px] text-black font-semibold">
                {user.name}
              </p>

              <div>
                <AiOutlinePlusCircle size={30} color="#3B6790" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" md:w-2/3 w-full justify-bewteen items-center justify-center  bg-white p-4 rounded-lg shadow-md ">
        <div className="flex  gap-0 w-full mb-4 ">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1 h-[70px] border-[1px] border-black ${
                activeTab === tab
                  ? "border-b-2 bg-green-700  text-white"
                  : "text-gray-600 "
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <div className="ml-10">
            <CandidateNavigation />
          </div>
        </div>

        <div>
          {activeTab === "Compare View" && (
            <div>
              <SkillMatrix />
            </div>
          )}
          {activeTab === "Individual View" && <p>Individual View Content</p>}
          {activeTab === "Shortlisted Candidates" && (
            <p>Shortlisted Candidates Content</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementUI;

const CandidateNavigation = () => {
  const candidateCount = 23;

  const handlePrevious = () => {
    console.log("Previous button clicked");
  };

  const handleNext = () => {
    console.log("Next button clicked");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4">
      <p className="text-gray-600 text-sm font-medium">
        {candidateCount} Candidates
      </p>

      <div className="flex gap-2">
        <button
          onClick={handlePrevious}
          className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-200"
        >
          <span className="text-gray-600">&larr;</span>
        </button>

        <button
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-200"
        >
          <span className="text-gray-600">&rarr;</span>
        </button>
      </div>
    </div>
  );
};
