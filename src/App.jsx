import React, { useEffect } from 'react'
import { useStateProvider } from './utils/StateProvider'
import Login from './components/login/Login'
import { reducerCases } from './utils/Constants'
import Spotify from './components/spotify/Spotify'

import styled from 'styled-components'
const App = () => {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split('&')[0].split('=')[1];
      console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token: token })
    }
  }, [dispatch, token]);
  return (
    <Container>
      {token ? <Spotify /> : <Login />}
    </Container>

  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  position: fixed;
`

export default App;
