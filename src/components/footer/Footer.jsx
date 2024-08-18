import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import {
  FooterContainer,
  TrackInfo,
  AlbumArt,
  TrackDetails,
  TrackName,
  Controls,
  ControlButton,
  ProgressContainer,
  ProgressBar,
  ProgressTime,
  VolumeContainer,
  VolumeBar,
} from "./FooterStyles";

const Footer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);

  const [{ token, selectedTrack }] = useStateProvider();
  const [trackuri, setTrackUri] = useState(
    "https://p.scdn.co/mp3-preview/6f57068e01a5ee6809ddd8c82ee1289a0fd28a95?cid=7f3a6b842d0e405da26391195a1d71d1"
  );
  const [img, setImg] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioPlay();
        setIsPlaying(true);
      };
    }
  }, [trackuri]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleProgressChange = (event) => {
    const time = event.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    setVolume(volume);
  };

  const fetchMusicTrack = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${selectedTrack}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setImg(data.album.images[0].url);
      setName(data.album.name);
      setTrackUri(data.preview_url);
    } catch (error) {
      console.error("Error fetching track:", error);
    }
  };

  useEffect(() => {
    fetchMusicTrack();
  }, [token, selectedTrack]);
    
  const audioPlay = () => {
    const tgt = document.getElementsByClassName("audio")[0];
    tgt.play();
    console.log(tgt);
  }
  return (
    <FooterContainer>
      <TrackInfo>
        <AlbumArt src={img} alt="Album Art" />
        <TrackDetails>
          <TrackName>{name}</TrackName>
        </TrackDetails>
      </TrackInfo>
      <audio className="audio" ref={audioRef} key={trackuri}>
        <source src={trackuri} type="audio/mpeg" />
      </audio>
      <Controls>
        <ControlButton
          onClick={() => {
            // Add logic to go to previous track
            console.log("Previous track");
          }}
        >
          <FontAwesomeIcon icon={faBackward} />
        </ControlButton>
        <ControlButton onClick={togglePlayPause}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </ControlButton>
        <ControlButton
          onClick={() => {
            // Add logic to go to next track
            console.log("Next track");
          }}
        >
          <FontAwesomeIcon icon={faForward} />
        </ControlButton>
        <ProgressContainer>
          <ProgressTime>
            {Math.floor(currentTime / 60)}:
            {("0" + Math.floor(currentTime % 60)).slice(-2)}
          </ProgressTime>
          <ProgressBar
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
          />
          <ProgressTime>
            {Math.floor(duration / 60)}:
            {("0" + Math.floor(duration % 60)).slice(-2)}
          </ProgressTime>
        </ProgressContainer>
        <VolumeContainer>
          <FontAwesomeIcon icon={faVolumeUp} />
          <VolumeBar
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
        </VolumeContainer>
      </Controls>
    </FooterContainer>
  );
};

export default Footer;
