import React, { useState } from "react";
import { createGame } from "../api";
import socket from "../socket";

const CreateGame = () => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        createGame(name).then((response) => {
            socket.emit("newGame", response.data);
            setName("");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Game name"
            />
            <button type="submit">Create Game</button>
        </form>
    );
};

export default CreateGame;
