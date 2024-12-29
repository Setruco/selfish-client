import React, { useEffect, useState } from "react";
import { fetchGames, joinGame } from "../api";
import socket from "../socket";

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames().then((response) => setGames(response.data));
        socket.on("gameListUpdate", (newGame) => {
            setGames((prev) => [...prev, newGame]);
        });

        return () => socket.off("gameListUpdate");
    }, []);

    const handleJoin = (id) => {
        const playerName = prompt("Enter your name:");
        joinGame(id, playerName).then((response) => {
            alert(`Joined game: ${response.data.name}`);
        });
    };

    return (
        <div>
            <h1>Games</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        {game.name} - {game.players.length} players
                        {!game.isStarted && (
                            <button onClick={() => handleJoin(game.id)}>Join</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameList;
