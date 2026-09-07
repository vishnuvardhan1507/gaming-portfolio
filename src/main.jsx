import React from 'react';
import { createRoot } from 'react-dom/client';
import Game from './game/Game';
import './game/game.css';
import './game/portrait.css';
import './game/equipment.css';
import './game/comic.css';
createRoot(document.getElementById('root')).render(<Game />);
