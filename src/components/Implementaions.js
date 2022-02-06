import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { XCircleIcon } from "@heroicons/react/outline";
import axios from "axios";

const ImplementationList = ({ user, projectName, impList, fetchDetails }) => {
  const addTask = async () => {
    let taskName = document.getElementById("task-field").value;

    if (taskName.length > 0) {
      await toast.promise(
        axios
          .post("/projects/info/impList", {
            userid: user,
            projectName: projectName,
            task: taskName,
          })
          .then(() => {
            fetchDetails();
          }),
        {
          loading: "Adding Task...",
          success: <b>Task Added.</b>,
          error: <b>Could not add!</b>,
        }
      );

      document.getElementById("task-field").focus();
      document.getElementById("task-field").value = "";
    } else {
      toast.error("Type Something!");
    }
  };

  const changeStatus = async (isChecked, taskid) => {
    if (isChecked) {
      await axios.post("/projects/info/changeStatus", { taskid: taskid });
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: "0.4s" }}
      className="w-full h-full flex flex-col items-start"
    >
      <div className="w-full h-16 flex items-center px-5">
        <input
          placeholder="Add something to be implemented..."
          className="w-1/2 h-10 rounded outline-none px-3 focus:ring"
          id="task-field"
        />
        <button
          className="w-20 h-10 rounded bg-blue-400 text-white mx-5"
          onClick={() => {
            addTask();
          }}
        >
          Add
        </button>
      </div>
      <ol className="w-full h-3/4 flex flex-col items-start px-5 overflow-scroll  scrollbar-hide">
        {impList
          ? impList.map((val, key) => (
              <li
                key={key}
                className="w-full h-10 rounded bg-gray-200 flex items-center justify-between p-5 my-2 cursor-pointer hover:bg-gray-300 transition"
              >
                <h4 className="">{val.task}</h4>
                <div className="w-24 h-full flex justify-evenly items-center">
                  <input
                    className="border-2 border-red-200"
                    type="checkbox"
                    onChange={(e) => {
                      changeStatus(e.target.checked, val._id);
                    }}
                  />
                  <XCircleIcon className="w-6 text-red-400" />
                </div>
              </li>
            ))
          : null}
      </ol>
    </motion.div>
  );
};

export default ImplementationList;
