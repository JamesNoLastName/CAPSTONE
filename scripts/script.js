document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.querySelector('.astrobiology-button-container');
    
    // Create a variable to hold the current WarpSpeed instance
    let currentWarpSpeed = null;

    // Store the current speed to gradually change it
    let currentSpeed = WARP_SPEED_NORMAL;
    const speedIncrement = (WARP_SPEED_MAX - WARP_SPEED_NORMAL) / 300;  // Gradual increments
    let intervalId = null;

    // Create a white overlay image and add it to the body
    const whiteImage = document.createElement('img');
    whiteImage.src = '/media/white.jpg'; // Replace with the path to your white image
    whiteImage.style.position = 'fixed';
    whiteImage.style.top = '0';
    whiteImage.style.left = '0';
    whiteImage.style.width = '100%';
    whiteImage.style.height = '100%';
    whiteImage.style.opacity = '0';  // Initially invisible
    whiteImage.style.transition = 'opacity 0.1s ease';  // Smooth opacity transition
    whiteImage.style.zIndex = '-1';  // Initially behind the button, not blocking it
    document.body.appendChild(whiteImage);

    // Ensure the button shrinking and disappearing animation works on click
    buttonContainer.addEventListener('click', function () {
        // Shrink and fade-out animation
        let opacity = 1;
        let scale = 1;

        // Animate button shrinking and fading out
        const fadeOutInterval = setInterval(function () {
            if (opacity > 0) {
                opacity -= 0.05;  // Decrease opacity for fade-out effect
                scale -= 0.05;    // Decrease scale for shrinking effect
                buttonContainer.style.opacity = opacity;
                buttonContainer.style.transform = `scale(${scale})`;
            } else {
                clearInterval(fadeOutInterval);
                buttonContainer.style.display = 'none';  // Hide the button once the animation is complete

                // After button click, move white image to the front by increasing its z-index
                whiteImage.style.zIndex = '9999';  // Bring white image to the front

                // Create a new WarpSpeed instance with the initial speed
                if (window.warpspeed) {
                    // Optionally destroy the previous WarpSpeed instance
                    if (currentWarpSpeed !== null) {
                        // We no longer destroy the object, just update it.
                        // currentWarpSpeed.destroy();  // Removed this line
                    }

                    // Create a new instance with the initial normal speed
                    currentWarpSpeed = new WarpSpeed('warp-slide', {
                        speed: WARP_SPEED_NORMAL,  // Start at normal speed
                        speedAdjFactor: 0.06,
                        density: 7,
                        shape: 'circle',
                        warpEffect: true,
                        warpEffectLength: 5,
                        depthFade: true,
                        starSize: 3,
                        backgroundColor: "hsl(263,45%,7%)",
                        starColor: "#C7C7C7"
                    });

                    // Start increasing the speed gradually
                    increaseSpeedToMax();
                } else {
                    console.error('WarpSpeed object is not available');
                }
            }
        }, 16);  // 60 FPS (approx. 16ms per frame)
    });

    // Gradually update speed function to reach the maximum speed
    function increaseSpeedToMax() {
        const updateInterval = 10;  // Update every 10ms for smooth transition

        intervalId = setInterval(function () {
            // Calculate the speed increment
            const increment = Math.min(speedIncrement, WARP_SPEED_MAX - currentSpeed);  // Ensure we don't overshoot the target speed

            if (currentSpeed < WARP_SPEED_MAX) {
                currentSpeed += increment;

                // Clamp the currentSpeed to not exceed the targetSpeed
                if (currentSpeed > WARP_SPEED_MAX) {
                    currentSpeed = WARP_SPEED_MAX;
                }

                // Update the WarpSpeed instance with the new speed
                if (currentWarpSpeed) {
                    currentWarpSpeed.setSpeed(currentSpeed);  // Update speed without destroying the object
                }

                // Start increasing the opacity of the white image when speed reaches a certain threshold
                if (currentSpeed >= WARP_SPEED_MAX * 0.9) { // When speed is 90% of max
                    // Calculate how close we are to the maximum speed (opacityRatio)
                    let opacityRatio = (currentSpeed - WARP_SPEED_NORMAL) / (WARP_SPEED_MAX - WARP_SPEED_NORMAL);

                    // Make sure the ratio is between 0 and 1
                    opacityRatio = Math.min(Math.max(opacityRatio, 0), 1);

                    // Set the opacity of the white image gradually
                    whiteImage.style.opacity = opacityRatio; // Gradually increase opacity

                    // Once the white image is fully visible, stop the WarpSpeed effect
                    if (opacityRatio === 1) {
                        stopWarpSpeed();  // Stop WarpSpeed when the white image is fully visible
                    }
                }
            } else {
                clearInterval(intervalId);  // Stop once we reach the max speed
                intervalId = null;  // Ensure intervalId is null after stopping
            }
        }, updateInterval);  // Gradual speed increase
    }

    // Function to stop the WarpSpeed effect
    function stopWarpSpeed() {
        if (currentWarpSpeed) {
            // If WarpSpeed object has a destroy method, you can call it here to clean up
            // currentWarpSpeed.destroy(); // Optional cleanup if needed
            currentWarpSpeed = null;  // Or you can set it to null to stop updates
            console.log("stopped");
        }
    }
});
