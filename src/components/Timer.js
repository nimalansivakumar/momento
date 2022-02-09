import React, { useEffect, useState } from "react";
import {
  PlayIcon,
  RefreshIcon,
  PauseIcon,
  SaveIcon,
} from "@heroicons/react/outline";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const Timer = ({ user, projectName, timeList, fetchDetails }) => {
  const [currentTimerState, setCurrentTimerState] = useState(false);
  const [paused, setPaused] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const saveTimer = async () => {
    let time = `${hours}h:${minutes}m:${seconds}s`;

    const today = () => {
      return new Date().toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    };

    toast.promise(
      axios.post("/projects/info/timer", {
        userid: user,
        projectName: projectName,
        time: time,
        date: today(),
      }),
      {
        loading: "Saving...",
        success: <b>Saved.</b>,
        error: <b>Could not save!</b>,
      }
    );

    resetTimer();
    fetchDetails();
  };

  useEffect(() => {
    var timer = setInterval(() => {
      if (!paused) {
        setSeconds((seconds) => seconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [paused]);

  useEffect(() => {
    if (seconds > 59) {
      setSeconds(0);
      setMinutes((minutes) => minutes + 1);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes > 59) {
      setMinutes(0);
      setHours((hours) => hours + 1);
    }
  }, [minutes]);

  const startTimer = () => {
    setCurrentTimerState(true);
    setPaused(false);
  };

  const pauseTimer = () => {
    setPaused(true);
  };

  const resumeTimer = () => {
    setPaused(false);
  };
  const resetTimer = () => {
    setCurrentTimerState(false);
    setPaused(true);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <motion.div
      initial={{ x: 250 }}
      animate={{ x: 0 }}
      transition={{ delay: "0.4s" }}
      className="w-2/6 m-10 h-full bg-card flex flex-col items-center justify-around rounded shadow-xl mb:w-5/6 h-30rem"
    >
      <div className="w-full h-1/3 flex items-center justify-center">
        <h1 className="text-5xl font-black">
          {hours}h:{minutes}m:{seconds}s
        </h1>
      </div>
      <div className="w-full h-2/3 bg-gray-200 flex flex-col items-center justify-center">
        <ul className="w-full h-full flex flex-col-reverse items-start px-5 font-semibold  overflow-scroll scrollbar-hide">
          {timeList
            ? timeList.map((val, key) => (
                <li
                  key={key}
                  className="w-full h-10 my-1 rounded bg-gray-200 flex items-center justify-between px-5 my-2"
                >
                  <h4 className="">{val.work_day}</h4>
                  <h4>{val.work_time}</h4>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="w-full h-1/3 flex justify-evenly items-center">
        {currentTimerState === false ? (
          <button
            onClick={startTimer}
            className="w-28 h-10  flex items-center justify-evenly text-white bg-green-300 text-xl rounded transition hover:bg-green-400"
          >
            <PlayIcon className="w-7" />
            Start
          </button>
        ) : (
          <>
            {paused === false ? (
              <button
                onClick={pauseTimer}
                className="w-28 h-10  flex items-center justify-evenly text-white bg-blue-300 text-xl rounded transition hover:bg-blue-400"
              >
                <PauseIcon className="w-7" />
                Pause
              </button>
            ) : null}
            {paused ? (
              <>
                {" "}
                <button
                  onClick={resumeTimer}
                  className="w-32 h-10  flex items-center justify-evenly text-white bg-green-300 text-xl rounded transition hover:bg-green-400"
                >
                  <PlayIcon className="w-7" />
                  Resume
                </button>
                <button
                  onClick={resetTimer}
                  className="w-28 h-10  flex items-center justify-evenly text-white bg-red-300 text-xl rounded transition hover:bg-red-400"
                >
                  <RefreshIcon className="w-7" />
                  Reset
                </button>
                <button
                  onClick={saveTimer}
                  className="w-28 h-10 flex items-center justify-evenly text-white bg-indigo-300 text-xl rounded transition hover:bg-indigo-400"
                >
                  <SaveIcon className="w-7" />
                  Save
                </button>
              </>
            ) : null}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Timer;
