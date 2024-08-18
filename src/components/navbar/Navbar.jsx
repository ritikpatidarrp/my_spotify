import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useStateProvider } from '../../utils/StateProvider';
import './Navbar.css'; 

const Navbar = () => {
  const [{ userInfo }] = useStateProvider();
  return (
    <div className="container">
      <div className="search_bar">
        <FaSearch />
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
