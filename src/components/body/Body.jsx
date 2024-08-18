// Body.js
import React, { useEffect } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../../utils/Constants";
import "./Body.css"; 

const Body = () => {
  const [
    { token, selectedPlaylistId, selectedPlaylist, selectedTrack },
    dispatch,
  ] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      console.log(selectedPlaylist);
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const convertToMinutes = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    if (remainingSeconds < 10) {
      return `${minutes}:0${remainingSeconds}`;
    }
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="container">
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selectedplaylist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      id={id}
                      onClick={() =>
                        dispatch({ type: reducerCases.SET_TRACK, id })
                      }
                      isSelected={id === selectedTrack}
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col_details">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span className="artists">
                            {artists.map((artist, index) => (
                              <React.Fragment key={index}>
                                <span>{artist}</span>
                                {index < artists.length - 1 && <span>, </span>}
                              </React.Fragment>
                            ))}
                          </span>
                        </div>
                      </div>
                      <div className="col">
                        <span className="album">{album}</span>
                      </div>
                      <div className="col">
                        <span className="duration">
                          {convertToMinutes(duration)}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
