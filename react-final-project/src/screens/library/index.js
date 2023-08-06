import React, {useState, useEffect} from 'react'
import APIKit from "../../spotify"
import "./library.css"
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';

export default function Library() {

  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    APIKit.get("me/playlists").then(function (response) {
      setPlaylists(response.data.items);
    });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    const playlistType = 'playlist'; // Set the type as 'playlist'
    navigate("/player", { state: { id, type: playlistType } });
  }

  return ( 
    <div className='screen-container'>
      <div className='library-body'>
        {playlists?.map(playlist => (
          <div className='playlist-card' key={playlist.id} onClick={()=> playPlaylist(playlist.id)}>
            <img src={playlist.images[0].url} className='playlist-image' alt='Playlist-art'/>
            <p className='playlist-title'>{playlist.name}</p>
            <p className='playlist-subtitle'>{playlist.tracks.total} songs</p>
            <div className='playlist-fade'>
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
