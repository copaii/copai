function fixSplineCursor() {
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 300);
}

window.addEventListener('load', fixSplineCursor);
window.addEventListener('resize', fixSplineCursor);
// SPLINE LOGO REMOVED

function removeSplineLogoEverywhere() {
  // Remove from light DOM
  document.querySelectorAll('a#logo').forEach(el => el.remove());

  // Try to remove from shadow DOMs of all spline-viewer elements
  document.querySelectorAll('spline-viewer').forEach(viewer => {
    if (viewer.shadowRoot) {
      viewer.shadowRoot.querySelectorAll('a#logo').forEach(el => el.remove());
    }
    // Also check for #container inside shadowRoot
    if (viewer.shadowRoot) {
      const container = viewer.shadowRoot.querySelector('#container');
      if (container) {
        container.querySelectorAll('a#logo').forEach(el => el.remove());
      }
    }
  });
}

// Remove if already present after 1 second
setTimeout(removeSplineLogoEverywhere, 1000);

// Observe for future additions in both light DOM and shadow DOM
const observer = new MutationObserver(function(mutations) {
  removeSplineLogoEverywhere();
  // Also observe shadowRoots if available
  document.querySelectorAll('spline-viewer').forEach(viewer => {
    if (viewer.shadowRoot && !viewer._logoObserver) {
      const shadowObserver = new MutationObserver(removeSplineLogoEverywhere);
      shadowObserver.observe(viewer.shadowRoot, { childList: true, subtree: true });
      viewer._logoObserver = shadowObserver;
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });


// NAVBAE Scroll and Hide/Show Text Blocks

window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      const logo = document.getElementById('logo-img');
      const navTexts = document.getElementById('nav-texts');
      const aboutSection = document.getElementById('about');
  
      // Shrink logo and navbar padding on scroll (desktop only)
      if (window.innerWidth >= 768) {
        if (window.scrollY > 40) {
          logo.classList.add('md:h-5'); // Add smaller height
          logo.classList.remove('md:h-12'); // Remove smaller height
          logo.style.transformOrigin = 'top left'; // Scale toward the top-left corner
        } else {
          logo.classList.add('md:h-12'); // Add smaller height
          logo.classList.remove('md:h-5'); // Remove smaller height
          logo.style.transformOrigin = 'center'; // Reset transform origin
        }
  
        // Hide nav text blocks when second section top hits navbar bottom
        const navBottom = navbar.getBoundingClientRect().bottom;
        const aboutTop = aboutSection.getBoundingClientRect().top;
        if (aboutTop <= navBottom) {
          navTexts.style.opacity = '0';
          navTexts.style.transition = 'opacity 0.3s';
        } else {
          navTexts.style.opacity = '1';
        }
      }
    });


// INFINITE MARQUEE IMAGES

const infiniteMarquee = () => {
    const marquee = document.getElementById('marquee-container')
    if (!marquee){
        return;      
    }
    const marqueeContent = document.getElementById('marquee-content');
    if (!marqueeContent){
        return;      
    }
    const marqueeContentClone = marqueeContent.cloneNode(true);
    marquee.append(marqueeContentClone);

    const width = parseInt( window.getComputedStyle(marqueeContent).getPropertyValue("width"),10
    );

    // const gap = parseInt(
    //     getComputedStyle(marqueeContent).getPropertyValue("column-gap"),10
    // );

    // const translate = -1*(width)

    gsap.fromTo(
        marquee.children,
        { x:0 },
        { 
            x:-1*width,
            duration: 17,
            ease: "none",
            repeat: -1,
        }
    )

}

document.addEventListener('DOMContentLoaded',infiniteMarquee);

// Smooth scroll to top on back-to-top button click
document.querySelectorAll('.back-to-top-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    if (window.ScrollSmoother && ScrollSmoother.get()) {
      ScrollSmoother.get().scrollTo(0, true); // true for smooth
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

// Reveal fade-in animation
gsap.utils.toArray('.reveal-fade').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%", // when element enters viewport
      toggleActions: "play reverse play reverse"
    }
  });
});

// TEXT ANIMATION ON SCROLL

// function lerp(a, b, t) {
//   return a + (b - a) * t;
// }

// function animateHorizontalTextsVanilla() {
//   const section = document.getElementById('horizontal-texts-section');
//   const leftText = document.getElementById('left-text');
//   const rightText = document.getElementById('right-text');

//   function onScroll() {
//     const rect = section.getBoundingClientRect();
//     const windowHeight = window.innerHeight;
//     const windowWidth = window.innerWidth;
//     const start = windowHeight * 0.8;
//     const end = windowHeight * 0.3;
//     let progress = (start - rect.top) / (start - end);
//     progress = Math.max(0, Math.min(1, progress));

//     // Get text widths
//     const leftTextWidth = leftText.offsetWidth;
//     const rightTextWidth = rightText.offsetWidth;

//     // Start: fully out of viewport (left: -50vw, right: +50vw)
//     // End: centered (translateX(-50%, 0))
//     const leftStart = -windowWidth / 1 - leftTextWidth / 1;
//     const leftEnd = -leftTextWidth / 2;
//     const rightStart = windowWidth / 2 + rightTextWidth / 2;
//     const rightEnd = -rightTextWidth / 2;

//     leftText.style.transform = `translate(${lerp(leftStart, leftEnd, progress)}px, 0)`;
//     rightText.style.transform = `translate(${lerp(rightStart, rightEnd, progress)}px, 0)`;
//   }

//   window.addEventListener('scroll', onScroll);
//   window.addEventListener('resize', onScroll);
//   onScroll();
// }

// document.addEventListener('DOMContentLoaded', animateHorizontalTextsVanilla);

document.body.style.overflow = "hidden"; // Prevent scroll during preload

const preloader = document.getElementById('preloader');
const count = document.getElementById('preloader-count');
const bar = document.getElementById('preloader-bar');
const mainContent = document.getElementById('smooth-wrapper') || document.body;

let progress = 0;
const duration = 1800; // ms
const interval = 16; // ms per frame (~60fps)
const steps = duration / interval;
let currentStep = 0;

function animateLoader() {
  currentStep++;
  progress = Math.min(100, Math.round((currentStep / steps) * 100));
  count.textContent = `${progress}%`;
  bar.style.width = `${progress}%`;

  if (progress < 100) {
    requestAnimationFrame(animateLoader);
  } else {
    // Fade out preloader, fade in page
    preloader.classList.add('preloader-hide');
    setTimeout(() => {
      preloader.style.display = "none";
      mainContent.classList.add('page-in');
      document.body.style.overflow = "";
    }, 700); // match CSS transition duration
  }
}

// Start loader
mainContent.classList.remove('page-in');
requestAnimationFrame(animateLoader);