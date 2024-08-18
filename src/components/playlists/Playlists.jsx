// Playlists.js
import React, { useEffect, useState } from 'react';
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';
import { Container } from './PlaylistsStyles';

const Playlists = () => {
  const [{ token, playlists }, dispatch] = useStateProvider();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { items } = response.data;
        const playlists = items.map(({ name, id }) => {
          return { name, id };
        });
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      } catch (err) {
        setError('Failed to fetch playlists');
      } finally {
        setLoading(false);
      }
    };
    getPlaylistData();
  }, [token, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <ul>
        {playlists.map(({ name, id }) => {
          return (
            <li
              onClick={() => {
                dispatch({ type: reducerCases.SET_PLAYLISTID, id });
              }}
              key={id}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Playlists;
