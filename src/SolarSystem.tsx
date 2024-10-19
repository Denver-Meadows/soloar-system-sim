import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const SolarSystem: React.FC = () => {
  // Create a ref to store a reference to a <div> in the DOM where the Pixi canvas will be added
  const pixiContainerRef = useRef<HTMLDivElement>(null);

  // useEffect will run after the component has been mounted in the DOM
  // It is used here to initialize and clean up the PixiJS application
  useEffect(() => {
    // Create a new PixiJS application instance.
    // This sets up the renderer, stage, and ticker for the game loop
    const app = new PIXI.Application();

    // Define an asynchronous function to initialize the PixiJS app
    const initializePixi = async () => {
      // Call the new async `init` method to initialize the PixiJS application
      // Set up the canvas width, height, and background color
      await app.init({
        width: 1000,
        height: 600,
        backgroundColor: 0x1099bb,
      });

      // Once initialized, append the canvas to the `div` element referenced by `pixiContainerRef`
      // `app.canvas` is the actual <canvas> element created by PixiJS that handles the rendering
      if (pixiContainerRef.current) {
        pixiContainerRef.current!.appendChild(app.canvas);
      }
    };

    // Call the asynchronous initialization function to start the PixiJS setup
    initializePixi();

    // Return a cleanup function that runs when the component is unmounted (removed from the DOM)
    return () => {
      // This function destroys the PixiJS application, freeing up memory and resources
      // `true` ensures that Pixi removes all children (graphics, sprites) and textures from memory
      app.destroy(true, { children: true, texture: true });
    };
  }, []);

  // Render a <div> that serves as a container for the PixiJS canvas
  // The canvas will be appended to this div by using the `useRef` to reference it
  return <div ref={pixiContainerRef} />;
};

export default SolarSystem;
