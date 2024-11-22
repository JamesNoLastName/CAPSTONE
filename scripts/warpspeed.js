// warp-speed-config.js
const WARP_SPEED_MAX = 14;
const WARP_SPEED_NORMAL = 0.75;

window.onload = function () {
  window.warpspeed = new WarpSpeed('warp-slide', {
    "speed": WARP_SPEED_NORMAL,
    "speedAdjFactor": 0.06,
    "density": 7,
    "shape": "circle",
    "warpEffect": true,
    "warpEffectLength": 5,
    "depthFade": true,
    "starSize": 3,
    "backgroundColor": "hsl(263,45%,7%)",
    "starColor": "#C7C7C7"
  });
};
