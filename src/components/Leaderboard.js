import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/authContext";
import userImg from "../assets/user.png";

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboardList, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      await toast.promise(
        axios.get(`https://momento-heroku.herokuapp.com/leaderboard/${user.uid}`).then((res) => {
          setLeaderboard(res.data);
        }),
        {
          loading: "Fetching Leaderboard...",
          success: <b>Fetched Successfully!</b>,
          error: <b>Could not fetch</b>,
        }
      );
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="w-full h-full font-man text-dark">
      <div className="w-full h-20 flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl px-10">Leaderboard</h1>
      </div>
      <div className="w-full h-full">
        <ul className="w-full h-30rem flex flex-col items-center">
          <li className="w-11/12 h-12 my-2 bg-card rounded-xl flex flex-row items-center px-10">
            <h1 className="w-1/3 text-left">Rank</h1>
            <h1 className="w-1/3 text-center">Name</h1>
            <h1 className="w-1/3 text-right">Projects Completed</h1>
          </li>
          {leaderboardList
            ? leaderboardList.map((val, key) => (
                <li
                  key={key}
                  className="w-11/12 h-12 my-2 bg-card rounded-xl flex flex-row items-center justify-between px-10  mb:h-20"
                >
                  <h1 className="w-1/3 text-left">#{val.rank}</h1>
                  <div className="w-1/3 h-full flex items-center justify-evenly">
                    <div className="w-1/2 h-full flex justify-center items-center">
                      {val.picture ? (
                        <img
                          className="w-10 mx-3 rounded-full"
                          src={val.picture}
                          alt="userImg"
                        />
                      ) : (
                        <img
                          className="w-10 mx-3 rounded-full"
                          src={userImg}
                          alt="userImg"
                        />
                      )}
                    </div>
                    <div className="w-1/2 h-full flex items-center">
                      <h1>{val.name}</h1>
                    </div>
                  </div>
                  <h1 className="w-1/3 text-right">{val.projectsDone}</h1>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
