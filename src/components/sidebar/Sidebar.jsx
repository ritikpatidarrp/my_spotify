import React, { useState } from 'react';
import { IoLibrarySharp } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { LuHome } from 'react-icons/lu';
import Playlists from '../playlists/Playlists';
import { Container } from './SidebarStyles';

const Sidebar = () => {
  const [width, setWidth] = useState('250px');

  const toggleWidth = () => {
    setWidth((prevWidth) => (prevWidth === '250px' ? '300px' : '250px'));
  };

  return (
    <Container width={width}>
      <div className='home_search'>
        <div className='top_links'>
          <div className='icon_sbar'><LuHome /></div>
          <span>Home</span>
        </div>
        <div className='top_links'>
          <div><FiSearch /></div>
          <span>Search</span>
        </div>
      </div>
      <div className='library'>
        <div className='top_links'>
          <div className='icon_sbar'><IoLibrarySharp /></div>
          <span>Your Library</span>
        </div>
        <div className='playlist_sbar'>
          <div className='p_sbar'>Playlists</div>
          <Playlists />
        </div>
      </div>
      <button className='toggle-button' onClick={toggleWidth}>Toggle Width</button>
    </Container>
  );
};

export default Sidebar;
