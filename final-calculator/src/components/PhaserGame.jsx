import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import AdvancedPhysicsScene from '../phaser/mainScene.js';

const PhaserGame = () => {
    // Use a ref to hold the game instance. This allows us to access it elsewhere
    // in the component, and ensures it persists across re-renders.
    const gameInstance = useRef(null);

    useEffect(() => {
        // This effect runs once after the component mounts
        
        const config = {
            type: Phaser.AUTO,
            width: 1280,
            height: 720,
            parent: 'game-container-react', // The id of the div we render below
            dom: {
                createContainer: true // This is important for DOM elements like sliders
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 350 },
                    debug: false
                }
            },
            scene: [AdvancedPhysicsScene]
        };

        // Create the game instance
        gameInstance.current = new Phaser.Game(config);

        // This is the cleanup function that will be called when the component unmounts
        return () => {
            if (gameInstance.current) {
                gameInstance.current.destroy(true);
                gameInstance.current = null;
            }
        };
    }, []); // The empty dependency array ensures this effect runs only once

    // This div is where the Phaser canvas will be injected by the 'parent' config property
    return (
      <div id="game-container-react" />
    );

};

export default PhaserGame;