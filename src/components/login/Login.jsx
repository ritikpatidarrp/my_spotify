import React from 'react';
import { Container } from './LoginStyles';

export default function Login() {
    const handleClick = () => {
        const clientId = "7f3a6b842d0e405da26391195a1d71d1";
        const redirectURL = "http://localhost:3000/";
        const apiURL = "http://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "user-read-playback-position",
            "user-top-read", 
            "user-read-recently-played",
            "playlist-read-private",
        ];
        window.location.href = `${apiURL}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scope.join(
            " "
        )}&response_type=token&show_daialog=true`;
    };

    return (
        <Container>
            <img 
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png"
                alt="spotify logo" 
            />
            <button onClick={handleClick}>Connect Spotify</button>
        </Container>
    );
}
