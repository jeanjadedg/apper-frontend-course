import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from "react-icons/ai"
import "./feed.css"
import { useNavigate } from 'react-router-dom';

function InputWithApiCall() {
  const [inputValue, setInputValue] = useState("");
  const [albums, setAlbums] = useState([]);
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (shouldSearch) {
        try {
          const artistParameter = {
            headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + APIKit.defaults.headers.common.Authorization
            }
          };
          const response = await APIKit.get(`search?q=${inputValue}&type=artist`, artistParameter);

          if (response.data.artists.items.length > 0) {
            const artistId = response.data.artists.items[0].id;
            const albumsResponse = await APIKit.get(`artists/${artistId}/albums`, artistParameter);
            setAlbums(albumsResponse.data.items);
            console.log(albumsResponse.data.items)
          } else {
            setAlbums([]); // Reset albums if no artist found
          }
        } catch (error) {
          console.error("API Error:", error);
        }
        setShouldSearch(false);
      }
    };

    fetchData();
  }, [shouldSearch]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setShouldSearch(true);
    }
  };

  const handleButtonClick = () => {
    setShouldSearch(true);
  };

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    const playlistType = 'album';
    navigate("/player", { state: { id, type: playlistType, total: albums } });
  }

  return (
    <div className="screen-container">
      <div className="input-button-container">
        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for Artists"
        />
      </div>
      <div className='feed-body'>
        {albums.map((albumCard) => (
          <div className='feed-album-card' key={albumCard.id} onClick={() => playPlaylist(albumCard.id)}>
            <img src={albumCard.images[0]?.url} className='feed-image' alt='Album-art' />
            <p className='feed-album-name'>{albumCard.name}</p>
            <p className='feed-album-subtitle'>{albumCard.total_tracks} songs</p>
            <div className='feed-album-fade'>
              <IconContext.Provider value={{ size: "100px", color: " rgb(69, 163, 170)" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputWithApiCall;
