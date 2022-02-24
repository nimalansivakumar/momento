import React, { useEffect, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { useAuth } from "../contexts/authContext";
import { storage } from "../firebase/firebaseConfig";
import axios from "axios";
import TwitterLogo from "../assets/twitter.svg";
import toast from "react-hot-toast";
import Loader from "./Loader";

const Dashboard = () => {
  const { user } = useAuth();
  const [bio, setbio] = useState({});
  const [stats, setStats] = useState({});
  const [webIntent, setWebIntent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await axios
        .get(`https://momento-heroku.herokuapp.com/dashboard/${user.uid}`)
        .then((res) => {
          setbio(res.data.userDetails);
          setStats(res.data.statsDetails);
        })
        .then(() => {
          tweet();
          setLoading(false);
        });
    };
    fetchDetails();
  }, []);

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
      await toast.promise(uploadFile.put(image), {
        loading: "Uploading...",
        success: <b>Image Uploaded!</b>,
        error: <b>Could not Uplaod.</b>,
      });

      //get url
      const url = await uploadFile.getDownloadURL();

      //post url to the database
      await axios.post(
        "https://momento-heroku.herokuapp.com/dashboard/postImage",
        {
          userid: user.uid,
          url: url,
        }
      );

      setbio({ ...bio, picture: url });
    } catch (e) {
      console.log(e);
    }
  };

  const tweet = () => {
    const text =
      "My Stats using Momento:" +
      "%0A" +
      "%0A" +
      `Projects Completed: ${stats.no_of_projects}` +
      "%0A" +
      `Total Time Spent: ${stats.total_time_spent}` +
      "%0A" +
      `Leaderboard Rank: ${stats.rank}` +
      "%0A" +
      "%0A" +
      `Start and work with your project on https://momento-app.netlify.app/`;

    setWebIntent(`https://twitter.com/intent/tweet?text=${text}`);
  };

  return (
    <div className="w-full h-auto flex flex-col justify-around items-center text-dark font-man">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-40 h-1/2 flex flex-col items-center">
            {bio.picture ? (
              <img
                src={bio.picture}
                alt="profilePicture"
                className="w-40 h-40 rounded-full"
              />
            ) : (
              <button className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center">
                <CameraIcon className="w-10 absolute" />
                <input
                  type="file"
                  accept="image/*"
                  className="w-40 h-40 cursor-pointer rounded-full z-10 opacity-0 outline-none"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                />
              </button>
            )}
            <h1 className="text-2xl text-center font-bold p-2">{bio.name}</h1>
          </div>
          <ul className="w-1/2 h-1/3 flex flex-col mb:w-5/6">
            <li className="w-full h-10 bg-card rounded p-5 my-2 shadow-lg flex justify-between items-center">
              <h4>⛏️ Projects completed</h4>
              <h4>{stats.no_of_projects}</h4>
            </li>
            <li className="w-full h-10 bg-card rounded p-5 my-2  shadow-lg flex justify-between items-center">
              <h4>🕰️ Total Time Spent</h4>
              <h4>{stats.total_time_spent}</h4>
            </li>
            <li className="w-full h-10 bg-card rounded p-5 my-2  shadow-lg flex justify-between items-center">
              <h4>🏆 Leaderboard Rank</h4>
              <h4>#{stats.rank}</h4>
            </li>
          </ul>
          <div className="w-1/2 h-32 flex flex-col items-center justify-around">
            <h1 className="text-center">Share your progress on Twitter</h1>
            <a
              href={webIntent}
              className="twitter-share"
              onClick={tweet}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={TwitterLogo}
                alt="twitterLogo"
                className="w-16 cursor-pointer transform transition hover:scale-105"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
