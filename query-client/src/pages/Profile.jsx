import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AchievementUser from "../components/AchievementUser";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MemberSinceData = ({ createdAt }) => {
    const createdDate = new Date(parseInt(createdAt));
    const currentDate = new Date();

    const diffMilliseconds = currentDate - createdDate;

    const days = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30); 
    const years = Math.floor(months / 12);
  
    
    let memberSincePara = "";
    if (years > 0) {
      memberSincePara = `Member since ${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      memberSincePara = `Member since ${months} month${months > 1 ? "s" : ""} ago`;
    } else if (isNaN(days)) {
      memberSincePara = `Member since Today`;
    } else {
      memberSincePara = `Member since ${days} day${days > 1 ? "s" : ""} ago`;
    }

  
    return <p>{memberSincePara}</p>;
  };

const Profile = () => {
    const {user} = useAuth();
    const urlHome = import.meta.env.VITE_URL;
    const [userData,setUserData] = useState(null);
    const [activity,setActivity] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [count, setCount] = useState(0);
    const axiosSecure = useAxiosSecure();
    let i=0;
    useEffect(()=>{
        axios.get(`${urlHome}/user?email=${user.email}`,{withCredentials:true}).then(res =>{ setUserData(res.data); })
    },[])
    useEffect(()=>{
          axiosSecure.get(`/activity?email=${user.email}`).then(res => setActivity(res.data)).catch((error) =>console.error(error));
          axiosSecure.get(`/countUsers?email=${user.email}`).then(res => setCount(res.data)).catch((error) =>console.error(error));
      },[]);
  return (
    <section className="bg-gray-100">
    <div className="w-11/12 mx-auto">
        <Helmet>
            <title>Profile | {import.meta.env.VITE_NAME || 'ProRecommendation'}</title>
        </Helmet>
        <div className="flex justify-between items-center flex-wrap md:flex-row flex-col py-10">
            <div className="flex  items-center space-x-4">
                <img
                src={user.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-full"
                />
                <div>
                    <h1 className="text-xl font-bold">{user.displayName}</h1>
                    <div className="text-gray-500"><MemberSinceData createdAt={userData?.createdAt} /></div>
                </div>
            </div>
            <NavLink to={'/user/updateProfile/'} className="btn btn-sm btn-outline"><FaCog/> Edit Profile</NavLink>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1">
        <div className="bg-white shadow-md rounded-lg col-span-1 md:col-span-2 p-6 my-10">
        <div className="flex items-center justify-between">
        <Tabs
        className="mt-6 text-gray-700"
        selectedIndex={activeTab}
        onSelect={(index) => setActiveTab(index)} // Update the active tab state
        >
            <TabList className="tabs">
                <div className="flex flex-start gap-3">
                <Tab
                    className={`tab tab-bordered ${
                    activeTab === 0 ? "text-blue-500 border-blue-500 bg-blue-100" : "text-gray-700"
                    }`}
                >
                    Profile
                </Tab>
                <Tab
                    className={`tab tab-bordered ${
                    activeTab === 1 ? "text-blue-500 border-blue-500 bg-blue-100" : "text-gray-700"
                    }`}
                >
                    Activity
                </Tab>
                </div>
            </TabList>

            <TabPanel>
            <div className="p-2">
            <p>
               Static Bio : I am a programmer. My principal language is C++. I've also done commercial work in Java, C, Perl, Python, 
                JavaScript, and APL. I've also been known to dabble in Lisp, Haskell, assembler (ARM, x86, amd64), and probably a 
                few other languages that haven't left as big a mark.
            </p>
            <p className="mt-4">
                Programmer at <a href="#" className="text-blue-500">Bloomberg</a>. Posts and comments are my opinions and are not 
                sponsored or endorsed by my employer.
            </p>
            <p className="mt-4">
                If my answers helped you, you can <a href="#" className="text-blue-500">buy me a coffee</a>.
            </p>
            </div>
            </TabPanel>
            <TabPanel>
            <div className="p-3">
            {
              activity.map(act=>(
                    <p className="p-2 " key={act._id}> {++i}. <span className="uppercase font-semibold">{act.type}</span> posted on {act.createdAt} about {act.title}  </p>
                  ))
            }
            </div>
            </TabPanel>
            </Tabs>
        </div>
       
        
      </div>
      <div className="col-span-1 md:col-span-1 my-3">
        <AchievementUser counts={count}/>
      </div>
        </div>
      
    </div>
    </section>
  );
};

export default Profile;
