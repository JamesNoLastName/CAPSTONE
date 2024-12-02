document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.querySelector('.astrobiology-button-container');
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
    let currentWarpSpeed = null;
  
    let currentSpeed = WARP_SPEED_NORMAL;
    const speedIncrement = (WARP_SPEED_MAX - WARP_SPEED_NORMAL) / 300;
    let lastUpdateTime = 0;
    const updateInterval = 70;
  
    const whiteImage = document.createElement('img');
    whiteImage.src = 'media/white.jpg';
    whiteImage.style.position = 'fixed';
    whiteImage.style.top = '0';
    whiteImage.style.left = '0';
    whiteImage.style.width = '100%';
    whiteImage.style.height = '100%';
    whiteImage.style.opacity = '0';  // Initially invisible
    whiteImage.style.transition = 'opacity 3s ease, z-index 0s';  // Increased transition duration for opacity
    whiteImage.style.zIndex = '-1';  // Initially behind the button
    document.body.appendChild(whiteImage);
  
    // Button click to start the intro animation
    buttonContainer.addEventListener('click', function () {
      let opacity = 1;
      let scale = 1;
  
      const fadeOutInterval = setInterval(function () {
        if (opacity > 0) {
          opacity -= 0.05;
          scale -= 0.05;
          buttonContainer.style.opacity = opacity;
          buttonContainer.style.transform = `scale(${scale})`;
        } else {
          clearInterval(fadeOutInterval);
          buttonContainer.style.display = 'none';  // Hide the button once faded
  
          // Move white image to the front
          whiteImage.style.zIndex = '9999';
  
          if (window.warpspeed) {
            // Optional: destroy the previous WarpSpeed instance if needed
            if (currentWarpSpeed !== null) {
              // currentWarpSpeed.destroy(); 
            }
  
            // Create a new instance of WarpSpeed
            currentWarpSpeed = new WarpSpeed('warp-slide', {
              speed: WARP_SPEED_NORMAL,
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
  
            increaseSpeedToMax();
          } else {
            console.error('WarpSpeed object is not available');
          }
        }
      }, 16);  // 60 FPS
    });
  
    function increaseSpeedToMax() {
      function update() {
        const now = Date.now();
        const deltaTime = now - lastUpdateTime;
  
        if (deltaTime < updateInterval) {
          requestAnimationFrame(update);
          return;
        }
        lastUpdateTime = now;
  
        const increment = Math.min(speedIncrement, WARP_SPEED_MAX - currentSpeed);
        if (currentSpeed < WARP_SPEED_MAX) {
          currentSpeed += increment;
          if (currentSpeed > WARP_SPEED_MAX) {
            currentSpeed = WARP_SPEED_MAX;
          }
          if (currentWarpSpeed) {
            currentWarpSpeed.setSpeed(currentSpeed);
          }
  
          if (currentSpeed >= WARP_SPEED_MAX * 0.7) {
            let opacityRatio = (currentSpeed - WARP_SPEED_NORMAL) / (WARP_SPEED_MAX - WARP_SPEED_NORMAL);
            opacityRatio = Math.min(Math.max(opacityRatio, 0), 1);
            whiteImage.style.opacity = opacityRatio;
  
            if (opacityRatio === 1) {
              stopWarpSpeed();
            }
          }
        } else {
          clearInterval(intervalId);
          intervalId = null;
        }
  
        requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
  
    function stopWarpSpeed() {
      if (currentWarpSpeed) {
        currentWarpSpeed.setSpeed(0);
        currentWarpSpeed = null;
  
        setTimeout(function () {
          whiteImage.style.opacity = '0';
          whiteImage.style.zIndex = '-1';  // Move white overlay behind
  
          // Hide intro and reveal main content
          intro.style.display = 'none';  // Hide entire intro section
          mainContent.style.display = 'block';  // Show main content
        }, 3000);  // 3s delay to match the fade-out transition
      }
    }
  });
 


function skipIntro() {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
    const whiteImage = document.querySelector('img[src="/media/white.jpg"]');  // Ensure it's correctly selected
  
    // Fade the white image out
    whiteImage.style.opacity = '0';
    whiteImage.style.zIndex = '-1';  // Ensure white overlay is behind
  
    // Optionally, hide the intro and show the main content immediately or after a delay
    intro.style.display = 'none';
    mainContent.style.display = 'block';
  
    // If you want a similar delay (like the 3s timeout in stopWarpSpeed), add a setTimeout:
    setTimeout(function () {
      // This would mimic the stopWarpSpeed behavior after a delay
      // Make sure to remove any active transitions from the intro section
      intro.style.transition = 'none'; // Disable transition if necessary during skip
      mainContent.style.transition = 'none'; // Disable transition on main content
    }, 1000); // You can adjust this delay to match any desired transition effects
  }

  function toggleImageVisibility(panel) {
    const image = panel.querySelector('.panel-image');
    const content = panel.querySelector('.panel-content');

    // Toggle the clicked state to handle image and content visibility
    panel.classList.toggle('clicked');  // This will toggle the visibility of the content and image

    // Ensure proper opacity toggle
    if (panel.classList.contains('clicked')) {
        content.style.opacity = 1; // Show content when clicked
        image.style.opacity = 0;   // Hide image when clicked
    } else {
        content.style.opacity = 0; // Hide content when not clicked
        image.style.opacity = 1;   // Show image when not clicked
    }
}

function toggleExpand(panel) {
    // Get all panels
    const allPanels = document.querySelectorAll('.glass-panel');
    
    // Check if the panel is already expanded
    if (panel.classList.contains('expanded')) {
        // Collapse the expanded panel and restore the original layout for all panels
        panel.classList.remove('expanded');
        
        // Show all other panels again
        allPanels.forEach(p => {
            p.style.visibility = 'visible';
            p.style.display = 'block'; // Ensure other panels are displayed normally
        });
    } else {
        // Expand the clicked panel
        allPanels.forEach(p => {
            if (p !== panel) {
                // Hide other panels when one is expanded
                p.classList.remove('expanded');
                p.style.visibility = 'hidden'; // Hide other panels
                p.style.display = 'none'; // Remove them from the grid layout
            }
        });

        // Expand the clicked panel
        panel.classList.add('expanded');
        panel.style.visibility = 'visible'; // Ensure the expanded panel remains visible
        panel.style.display = 'block'; // Ensure it stays in the grid layout
    }
}

