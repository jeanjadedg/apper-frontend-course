import React, {useState, useEffect} from 'react'
import APIKit from "../../spotify"
import "./trending.css"
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';

export default function Trending() {

  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    APIKit.get("browse/featured-playlists").then(function (response) {
      setPlaylists(response.data.playlists.items);
      console.log(response.data.playlists.items)
    });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    const playlistType = 'playlist';
    navigate("/player", { state: { id, type: playlistType } });
  }

  return ( 
    <div className='screen-container'>
      <div className='trending-body'>
        {playlists?.map(playlist => (
          <div className='trending-playlist-card' key={playlist.id} onClick={()=> playPlaylist(playlist.id)}>
            <img src={playlist.images[0].url} className='playlist-image' alt='Playlist-art'/>
            <p className='trending-playlist-title'>{playlist.name}</p>
            <p className='trending-playlist-subtitle'>{playlist.tracks.total} songs</p>
            <div className='trending-playlist-fade'>
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
