import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const audioSrc = total[currentIndex]?.track?.preview_url;
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const playAudio = () => {
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      startTimer();
    });
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      if (audioLoaded) {
        playAudio();
      }
    }
  };

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(0);
    setAudioLoaded(false);

    audioRef.current.addEventListener("canplaythrough", () => {
      setAudioLoaded(true);
      if (isPlaying) {
        playAudio();
      }
    });

    return () => {
      pauseAudio();
      audioRef.current.removeEventListener("canplaythrough", () => {});
    };
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      pauseAudio();
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };
  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={isPlaying}
          image={currentTrack?.album?.images[0]?.url}
          size={400}
          color="rgb(69, 163, 170)"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={togglePlayPause}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
