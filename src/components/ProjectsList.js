import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../contexts/authContext";

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

const ProjectsList = ({ setProjectRoutes }) => {
  const [isOpen, setOpen] = useState(false);
  const { user } = useAuth();
  const [projectList, setProjectList] = useState([]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const createProject = async () => {
    let projectName = document.getElementById("project-name-field").value;
    await toast
      .promise(
        axios.post("/projects/createProject", { id: user.uid, projectName }),
        {
          loading: "Creating Project...",
          success: <b>Created Successfully!</b>,
          error: <b>Could not create</b>,
        }
      )
      .then(() => {
        setOpen(false);
        fetchProjects();
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios.get(`/projects/fetchProjects/${user.uid}`).then((res) => {
      if (res.data.length > 0) {
        setProjectList(res.data);
        setProjectRoutes(res.data);
      }
    });
  };

  return (
    <div className="w-full h-full font-man text-dark">
      <div className="w-full h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl px-10">Projects</h1>
        <button
          onClick={openModal}
          className="w-36 h-10 mx-10 text-white bg-indigo-400 flex justify-evenly items-center rounded hover:bg-indigo-500 transition"
        >
          <PlusCircleIcon className="w-7" /> New Project
        </button>
      </div>
      {projectList.length !== 0 ? (
        projectList.map((val, key) => (
          <Link to={`/projects/${val.name}`} key={key}>
            <div className="w-full h-full flex flex-col justify-around items-center">
              <div className="w-3/4 h-28 m-3 bg-card rounded-md shadow-lg flex flex-row cursor-pointer transform transition duration-300 mb:flex-col w-5/6  hover:shadow-xl">
                <div className="w-2/3 h-full flex flex-col items-start justify-center font-semibold mb:w-full">
                  <h3 className="text-2xl px-10 mb:px-5">{val.name}</h3>
                  <h5 className="text-sm px-10 text-gray-400 mb:px-5">
                    {`${val.completedTasks} / ${val.totalTasks}`} Tasks
                    Completed
                  </h5>
                </div>
                <div className="w-1/3 h-full flex items-center justify-end mb:w-full items-center justify-around">
                  <div className="w-1/2 h-3 bg-gray-300 rounded">
                    <div
                      style={{ width: `${val.progress}%` }}
                      className="h-full bg-green-300 rounded"
                    ></div>
                  </div>
                  <h3 className="text-2xl">{val.progress}%</h3>
                </div>
                {/* <div className="w-1/4 h-full flex flex-row items-center justify-end  mb:w-full items-center justify-around">
                  <div className="w-10 h-10  flex items-center justify-center rounded-full transition hover:bg-red-100">
                    <TrashIcon className="w-7 text-red-500" />
                  </div>
                </div> */}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="w-full h-full text-center font-semibold">
          <h1>No Projects Found!</h1>
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
