import React, { useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Body from '../body/Body';
import Footer from '../footer/Footer';
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';
import { Container } from './SpotifyStyles';

const Spotify = () => {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USERINFO, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  return (
    <Container>
      <div className="spotify_body">
        <div className="sidebar"><Sidebar /></div>
        <div className="body">
          <div className="body_contents">
            <Body />
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer />
      </div>
    </Container>
  );
};

export default Spotify;
