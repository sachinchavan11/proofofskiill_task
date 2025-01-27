import React, { useState, useEffect } from "react";

const SkillMatrix = () => {
  const [users, setUsers] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);

  // Fetch data from the API

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://forinterview.onrender.com/people");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const fetchDetails = async () => {
    try {
      const skillResponses = await Promise.all(
        users.map(async (user) => {
          const response = await fetch(
            `https://forinterview.onrender.com/people/${user.id}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          return { user, skillset: data?.data?.data?.skillset || [] };
        })
      );
      setSkillData(skillResponses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching skill data:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchDetails();
    }
  }, [users]);

  const getColorClass = (score) => {
    const classes = [
      "bg-yellow-50",
      "bg-yellow-200",
      "bg-yellow-300",
      "bg-green-300",
      "bg-green-600",
    ];
    return classes[score] || "bg-white";
  };

  const skills = [
    "Creating Wireframes",
    "Creating Basic Prototypes",
    "Creation of Brands",
    "Applying Color Theory",
    "Using Figma for Design",
    "Application of Typography",
    "Creating Effective Icons",
    "Optimizing Touch Points",
    "Addressing User Pain Points",
    "Conducting User Research",
    "Applying Questioning Skills",
    "Conducting Heuristic Evaluation",
    "Gathering User Feedback",
    "Conducting Usability Tests",
    "Creating User Personas",
    "Conducting Market Research",
    "Crafting Effective Questions",
    "Creating Effective Surveys",
    "Creating Sitemaps",
    "Designing User Flows",
  ];

  return (
    <div className="p-4">
      <div className="flex">
        <div className="w-2/3 overflow-x-auto">
          <h2 className="text-lg font-bold mb-2 text-black">Skill Matrix</h2>
          <div className="flex ml-[130px]">
            {skillData.map((data) => (
              <div
                key={data.user.id}
                className="w-[100px] text-black text-center font-bold border-b border-gray-300"
              >
                {data.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join(".")}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {skillData
              .flatMap((data) => data.skillset)
              .map((skillGroup, index) => (
                <div key={index}>
                  {skillGroup.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-x-2">
                      <div className="w-[400px] text-black text-sm font-medium py-2 border-r border-gray-300">
                        {skill.name}
                      </div>

                      {skillData.map((data) => {
                        const userSkillGroup = data.skillset.find(
                          (sg) => sg.id === skillGroup.id
                        );
                        const userSkill = userSkillGroup?.skills.find(
                          (s) => s.id === skill.id
                        );
                        const consensusScore =
                          userSkill?.pos?.[0]?.consensus_score || 0;

                        return (
                          <div
                            key={`${data.user.id}-${skill.id}`}
                            className={`w-[100px] h-[30px] text-center ${getColorClass(
                              consensusScore
                            )}`}
                          >
                            {consensusScore}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatrix;
