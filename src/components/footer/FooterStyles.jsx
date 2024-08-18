import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vw 1.3vw;
  background-color: #282828;
  color: white;
  position: fixed;
  bottom: 0;
  margin-bottom: 0.2vh;
  width: 97vw;
  height: 7vh;
  margin-top: 1rem;
  margin-left: 0.2rem;
  border-radius: 0.5rem;
`;

export const TrackInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const AlbumArt = styled.img`
  width: 4vw;
  border-radius: 0.3rem;
  margin-right: 1rem;
`;

export const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TrackName = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
`;

export const ArtistName = styled.span`
  font-size: 0.9em;
  color: #b3b3b3;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    color: #1db954;
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  margin: 0 20px;
`;

export const ProgressBar = styled.input`
  width: 100%;
  margin: 0 10px;
`;

export const ProgressTime = styled.span`
  font-size: 0.9em;
  color: #b3b3b3;
`;

export const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
`;

export const VolumeBar = styled.input`
  width: 3vw;
  margin-left: 10px;
`;
