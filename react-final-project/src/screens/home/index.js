import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Favorites from "../favorities"
import Library from '../library'
import Player from '../player'
import Feed from '../feed'
import Trending from '../trending'
import './home.css'
import Sidebar from '../../components/sidebar'
import Login from '../../auth/login'
import { setClientToken } from '../../spotify'


export default function Home() {

  const [token, setToken] = useState("");
  useEffect(() => {
      const token = window.localStorage.getItem("token");
      const hash = window.location.hash;
      window.location.hash=""
      if(!token && hash) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("token", _token);
        setToken(_token);
        setClientToken(_token)
      } else {
        setToken(token)
        setClientToken(token)
      }
      
  }, []);

  const handleSignout = () => {
    window.localStorage.removeItem("token");
    setToken(""); // Clear the token from state
    setClientToken(""); // Clear the token from the API client
  };

  return !token ? (
      <Login />
    ) : ( <Router>
      <div className='main-body'> 
        <Sidebar onSignout={handleSignout} />
        <Routes>
          <Route path="/" element={<Library />}></Route>
          <Route path="/feed" element={<Feed />}></Route>
          <Route path="/trending" element={<Trending />}></Route>
          <Route path="/player" element={<Player />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </div>
    </Router>
  )
}
