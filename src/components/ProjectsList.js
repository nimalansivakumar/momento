import React, { useEffect, useState } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import Loader from "./Loader";
import { motion } from "framer-motion";

const customStyles = {
  content: {
    maxWidth: "500px",
    width: "100%",
    height: "200px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    border: "2px solid #424242",
    backgroundColor: "#F4F4F4",
  },
};

const ProjectsList = () => {
  const [isOpen, setOpen] = useState(false);
  const { user } = useAuth();
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    await axios
      .get(
        `https://momento-heroku.herokuapp.com/projects/fetchProjects/${user.uid}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          setProjectList(res.data);
        }
        setLoading(false);
      });
  };

  const createProject = async () => {
    let projectName = document.getElementById("project-name-field").value;
    await toast
      .promise(
        axios.post(
          "https://momento-heroku.herokuapp.com/projects/createProject",
          { id: user.uid, projectName }
        ),
        {
          loading: "Creating Project...",
          success: <b>Created Successfully!</b>,
          error: <b>Could not create</b>,
        }
      )
      .then(() => {
        fetchProjects();
        setOpen(false);
      });
  };

  const deleteProject = async (projectName) => {
    await toast
      .promise(
        axios.post(
          "https://momento-heroku.herokuapp.com/projects/deleteProject",
          {
            uid: user.uid,
            projectName: projectName,
          }
        ),
        {
          loading: "Removing Project...",
          success: <b>Project Removed.</b>,
          error: <b>Could not remove!</b>,
        }
      )
      .then(() => {
        fetchProjects();
      });
  };

  return (
    <div className="w-full h-full font-man text-dark">
      <div className="w-full h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl px-10">Projects</h1>
        <button
          onClick={openModal}
          className="w-36 h-10 mx-10 text-white bg-indigo-400 flex justify-evenly items-center rounded hover:bg-indigo-500 transition mb:w-10"
        >
          <PlusCircleIcon className="w-7" />
          <p className="mb:hidden">New Project</p>
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : projectList.length > 0 ? (
        projectList.map((val, key) => (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: "0.4s" }}
            className="w-full h-full flex flex-row justify-around items-center"
          >
            <div className="w-3/4 h-28 m-3 rounded bg-card flex flex-row hover:shadow-lg transition mb:flex-col mb:w-5/6 mb:h-44">
              <Link
                to={`/projects/${val.name}`}
                className="w-5/6 h-full flex mb:flex-col w-full"
              >
                <div className="w-1/2 h-full flex flex-col items-start justify-center font-semibold mb:w-full">
                  <h3 className="text-2xl px-10 mb:px-5">{val.name}</h3>
                  <h5 className="text-sm px-10 text-gray-400 mb:px-5">
                    {`${val.completedTasks} / ${val.totalTasks}`} Tasks
                    Completed
                  </h5>
                </div>
                <div className="w-1/2 h-full flex items-center justify-end mb:w-full items-center justify-around">
                  <div className="w-1/2 h-3 bg-gray-300 rounded">
                    <div
                      style={{ width: `${val.progress}%` }}
                      className="h-full bg-green-300 rounded"
                    ></div>
                  </div>
                  <h3 className="text-2xl">{val.progress}%</h3>
                </div>
              </Link>
              <div className="w-1/6 h-full flex flex-row items-center justify-end  mb:w-full mb:h-10  items-center justify-around">
                <div className="w-10 h-10  flex items-center justify-center rounded-full transition hover:bg-red-100">
                  <TrashIcon
                    onClick={() => {
                      deleteProject(val.name);
                    }}
                    className="w-7 text-red-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="w-full text-center">
          <h1>No Projects found!</h1>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="New Project"
        ariaHideApp={false}
      >
        <input
          placeholder="Project Name"
          className="w-full h-10 rounded outline-none px-3 focus:ring"
          id="project-name-field"
        />
        <button
          onClick={createProject}
          className="w-20 h-10 rounded bg-blue-400 text-white mx-5 hover:bg-blue-500 transition"
        >
          Create
        </button>
      </Modal>
    </div>
  );
};

export default ProjectsList;
