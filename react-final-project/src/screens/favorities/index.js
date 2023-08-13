import React, { useState, useEffect } from 'react';
import APIKit from "../../spotify";
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import "./favorites.css"

export default function Favorites() {
  const [inputValue, setInputValue] = useState("");
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    if (inputValue !== "") {
      fetchPlaylists();
    }
  }, [inputValue]);

  const fetchPlaylists = async () => {
    try {
      const response = await APIKit.get(`search?type=playlist&q=${inputValue}`);
      setPlaylists(response.data.playlists.items);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    const playlistType = 'playlist';
    navigate("/player", { state: { id, type: playlistType } });
  }

  return ( 
    <div className='screen-container'>
      <div className="input-button-container">
        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for Playlists"
        />
      </div>
      <div className='favorites-body'>
        {playlists?.map(playlist => (
          <div className='favorites-playlist-card' key={playlist.id} onClick={() => playPlaylist(playlist.id)}>
            <img src={playlist.images[0].url} className='playlist-image' alt='Playlist-art'/>
            <p className='favorites-playlist-title'>{playlist.name}</p>
            <p className='favorites-playlist-subtitle'>{playlist.tracks.total} songs</p>
            <div className='favorites-playlist-fade'>
              <IconContext.Provider value={{size: "100px", color: " rgb(69, 163, 170)"}}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}