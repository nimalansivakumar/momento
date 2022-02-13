import React, { useEffect, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { useAuth } from "../contexts/authContext";
import { storage } from "../firebase/firebaseConfig";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [bio, setbio] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    await axios.get(`/dashboard/${user.uid}`).then((res) => {
      setbio(res.data.userDetails);
      setStats(res.data.statsDetails);
    });
  };

  const uploadImage = async (e) => {
    try {
      let image = new File([e.target.files[0]], user.uid, {
        type: e.target.files[0].type,
      });

      //reference for storage bucket
      const storageRef = storage.ref();

      //reference for image
      const uploadFile = storageRef.child(user.uid);

      //upload image
      await uploadFile.put(image);

      //get url
      const url = await uploadFile.getDownloadURL();

      console.log(url);

      //post url to the database
      await axios
        .post("/dashboard/postImage", {
          userid: user.uid,
          url: url,
        })
        .then(() => {
          fetchDetails();
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center text-dark font-man">
      <div className="w-40 h-40">
        {bio.picture ? (
          <img src={bio.picture} className="w-full h-full rounded-full" />
        ) : (
          <button className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
            <CameraIcon className="w-10 absolute" />
            <input
              type="file"
              accept="image/*"
              className="w-full h-full cursor-pointer rounded-full z-10 opacity-0 outline-none"
              onChange={(e) => {
                uploadImage(e);
              }}
            />
          </button>
        )}
      </div>
      <h1 className="text-2xl font-bold p-2">{bio.name}</h1>
      <ul className="w-1/2 h-auto flex flex-col mb:w-5/6">
        <li className="w-full h-10 bg-card rounded p-5 my-2 shadow-lg flex justify-between items-center">
          <h4>⛏️ No. of projects completed</h4>
          <h4>{stats.no_of_projects}</h4>
        </li>
        <li className="w-full h-10 bg-card rounded p-5 my-2  shadow-lg flex justify-between items-center">
          <h4>🕰️Total Time Spent</h4>
          <h4>{stats.total_time_spent}</h4>
        </li>
        <li className="w-full h-10 bg-card rounded p-5 my-2  shadow-lg flex justify-between items-center">
          <h4>🏆 Leaderboard Rank</h4>
          <h4>#{stats.rank}</h4>
        </li>
        <li className="w-full h-10 bg-card rounded p-5 my-2 shadow-lg flex justify-between items-center">
          <h4>⌛ Most time spent on</h4>
          <h4>{stats.most_time_spent}</h4>
        </li>
        <li className="w-full h-10 bg-card rounded p-5 my-2 shadow-lg flex justify-between items-center">
          <h4>No. of projects completed</h4>
          <h4>4/5</h4>
        </li>
      </ul>
      <div></div>
    </div>
  );
};

export default Dashboard;
