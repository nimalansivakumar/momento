import React from "react";
import {
  BookmarkIcon,
  ClipboardCopyIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

const Resources = ({ user, projectName, resList, fetchDetails }) => {
  const addResource = async () => {
    const url = document.getElementById("resource-field").value;

    var expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    var regex = new RegExp(expression);

    if (url.match(regex)) {
      await toast.promise(
        axios
          .post("https://momento-heroku.herokuapp.com/projects/info/resList", {
            userid: user,
            projectName: projectName,
            resource: url,
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
    } else {
      toast.error("Enter valid URL");
    }

    document.getElementById("resource-field").value = "";
    document.getElementById("resource-field").focus();
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(<b>Copied</b>);
  };

  const deleteResource = async (id) => {
    await toast
      .promise(
        axios.post(
          `https://momento-heroku.herokuapp.com/projects/info/deleteResource`,
          {
            userid: user,
            projectName: projectName,
            res_id: id,
          }
        ),
        {
          loading: "Removing...",
          success: <b>Removed.</b>,
          error: <b>Could not remove!</b>,
        }
      )
      .then(() => {
        fetchDetails();
      });
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
          type="url"
          id="resource-field"
          placeholder="Type or paste the link..."
          className="w-full h-10 rounded outline-none px-3 focus:ring"
        />
        <button
          onClick={() => {
            addResource();
          }}
          className="w-48 h-10 rounded bg-indigo-500 text-white mx-5 flex items-center justify-evenly hover:bg-indigo-600 transition mb:w-12"
        >
          <BookmarkIcon className="w-7" />
          <p className="mb:hidden">Add Bookmark</p>
        </button>
      </div>
      <ol className="w-full h-3/4 flex flex-col items-start px-5 overflow-scroll scrollbar-hide">
        {resList
          ? resList.map((val, key) => (
              <li
                key={key}
                className="w-full h-10 rounded bg-gray-200 flex items-center justify-between px-5 my-2 cursor-pointer hover:bg-gray-300 transition mb:h-28 break-all"
              >
                <a
                  href={`${val.resource}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mb:w-full"
                >
                  {val.resource}
                </a>
                <div className="w-20 h-full flex justify-evenly">
                  <ClipboardCopyIcon
                    className="w-6 text-amber-200"
                    onClick={() => {
                      copyText(val.resource);
                    }}
                  />
                  <XCircleIcon
                    className="w-6 text-red-400"
                    onClick={() => {
                      deleteResource(val._id);
                    }}
                  />
                </div>
              </li>
            ))
          : null}
      </ol>
    </motion.div>
  );
};

export default Resources;
