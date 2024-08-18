
import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "1NOXXeOHHmYeiz7xFBddkl",
  selectedPlaylist: null,
  selectedTrack: "5PUXKVVVQ74C3gl5vKy9Li",
};


const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      }
    case reducerCases.SET_USERINFO:
      return {
        ...state,
        userInfo: action.userInfo,
      }
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      }
    case reducerCases.SET_PLAYLISTID:
      return {
        ...state,
        selectedPlaylistId: action.id,
      }
    case reducerCases.SET_TRACK:
      return {
        ...state,
        selectedTrack: action.id,
      }
    // other cases
    default:
      return state;
  }
};

export default reducer;