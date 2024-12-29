import axios from "axios";

const API_URL = "http://localhost:4000";

export const fetchGames = () => axios.get(`${API_URL}/games`);
export const createGame = (name) => axios.post(`${API_URL}/games`, { name });
export const joinGame = (id, playerName) =>
    axios.post(`${API_URL}/games/${id}/join`, { playerName });
