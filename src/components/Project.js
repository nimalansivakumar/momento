import React, { useEffect, useState } from "react";
import ImplementationList from "./Implementaions";
import { motion } from "framer-motion";
import Resources from "./Resources";
import Timer from "./Timer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authContext";

const Project = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [currentTab, setCurrentTab] = useState("ImplementationList");
  const [impList, setImpList] = useState([]);
  const [resList, setResList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [progressBar, setProgressBar] = useState(0);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    await axios.get(`/projects/info/${user.uid}/${id}`).then((res) => {
      setImpList(res.data.implementationList);
      setResList(res.data.resourceList);
      setTimeList(res.data.timer);
    });
  };

  return (
    <div className="w-full h-full font-man text-dark">
      <div className="w-full h-20 flex flex-row justify-between items-center px-10 mb:flex-col">
        <h1 className="font-bold text-3xl">{id}</h1>
        <button className="w-32 h-8 rounded bg-red-400 text-white hover:bg-red-500 transition">
          End Session
        </button>
      </div>
      <div className="w-full h-30rem flex justify-around items-center mb:h-auto mb:flex-col">
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ delay: "0.4s" }}
          className="w-4/6 m-10 h-full bg-card rounded shadow-xl mb:w-5/6 "
        >
          <div className="w-full h-12 flex items-center mb:h-auto">
            <nav className="w-full font-semibold text-xl px-5">
              <motion.ul className="w-full flex flex-row justify-around mb:flex-col items-center">
                <li
                  className={`cursor-pointer ${
                    currentTab === "ImplementationList" ? "" : "text-gray-400"
                  }`}
                  onClick={() => {
                    setCurrentTab("ImplementationList");
                  }}
                >
                  Implementations
                </li>
                <li
                  className={`cursor-pointer ${
                    currentTab === "Resources" ? "" : "text-gray-400"
                  }`}
                  onClick={() => {
                    setCurrentTab("Resources");
                  }}
                >
                  Resources
                </li>
                <li
                  className={`cursor-pointer ${
                    currentTab === "Others" ? "" : "text-gray-400"
                  }`}
                  onClick={() => {
                    setCurrentTab("Others");
                  }}
                >
                  Others
                </li>
              </motion.ul>
            </nav>
          </div>
          {currentTab === "ImplementationList" ? (
            <ImplementationList
              user={user.uid}
              projectName={id}
              impList={impList}
              fetchDetails={fetchDetails}
            />
          ) : currentTab === "Resources" ? (
            <Resources
              user={user.uid}
              projectName={id}
              resList={resList}
              fetchDetails={fetchDetails}
            />
          ) : null}
        </motion.div>
        <Timer
          user={user.uid}
          projectName={id}
          timeList={timeList}
          fetchDetails={fetchDetails}
        />
      </div>
    </div>
  );
};

export default Project;
