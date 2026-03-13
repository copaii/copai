const track = document.getElementById("emailm-marqueeTrack");

// duplicate content for seamless looping
track.innerHTML += track.innerHTML;

let position = 0;
const speed = 0.5; // change speed here

function animate() {
  position -= speed;

  if (Math.abs(position) >= track.scrollWidth / 2) {
    position = 0;
  }

  track.style.transform = `translateX(${position}px)`;

  requestAnimationFrame(animate);
}

animate();