import React, { useEffect, useState } from 'react';
import './sidebar.css';
import SidebarButton from './sidebarButton';
import { FaPlay } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { RiPlayListFill } from "react-icons/ri";
import apiClient from '../../spotify';
import { BsSearch } from 'react-icons/bs';
import { FiTrendingUp } from 'react-icons/fi';

export default function Sidebar( {onSignout} ) {
  const [image, setImage] = useState(
    'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ5pAUkFjASncLgVEsqVbwyTj0LP1ObO85jakWZEibYYmjHzzQux9-C1zQ2DXiZnAldF_l5_EXyZXQqQf4'
  );
  useEffect(() => {
    apiClient.get('me').then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  const [username, setUsername] = useState('');
  useEffect(() => {
    apiClient.get('me').then((response) => {
      setUsername(response.data.display_name);
    });
  }, []);
  
  return (
    <div className='sidebar-container'>
      <img src={image} className='profile-img' alt='profile' />
      <p className='username'> Welcome, {username}!</p>
      <div>
        <SidebarButton title='Search' to='/feed' icon={<BsSearch />} />
        <SidebarButton title='Featured' to='/trending' icon={<FiTrendingUp />} />
        <SidebarButton title='Player' to='/player' icon={<FaPlay />} />
        <SidebarButton title='Playlists' to='/favorites' icon={<RiPlayListFill />} />
        <SidebarButton title='Library' to='/' icon={<IoLibrary />} />
      </div>
      <div className='signout-button' onClick={onSignout}>
        <FaSignOutAlt /> Sign Out
      </div>
    </div>
  );
}
