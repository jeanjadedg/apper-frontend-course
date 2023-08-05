import React, { useEffect, useState } from 'react'
import './sidebar.css'
import SidebarButton from './sidebarButton'
import { MdFavorite, MdFeed } from "react-icons/md";
import { FaGripfire,FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from 'react-icons/fa'
import { IoLibrary } from 'react-icons/io5'
import { MdSpaceDashboard } from 'react-icons/md'
import apiClient from '../../spotify';

export default function Sidebar() {

  const [image, setImage] = useState(
    "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ5pAUkFjASncLgVEsqVbwyTj0LP1ObO85jakWZEibYYmjHzzQux9-C1zQ2DXiZnAldF_l5_EXyZXQqQf4"
  );
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  const [username, setUsername] = useState('');
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setUsername(response.data.display_name);
    });
  }, []);

  return (
    <div className='sidebar-container'>
      <img src={image} className='profile-img' alt="profile" />
      <p className='username'> Welcome, {username}!</p>
      <div>
      <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
      <SidebarButton title="Trending" to="/trending" icon={<FaGripfire/>}/>
      <SidebarButton title="Player" to="/player" icon={<FaPlay />}/>
      <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />}/>
      <SidebarButton title="Library" to="/" icon={<IoLibrary />}/>
      </div>
      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />}/>
    </div>
  )
}
