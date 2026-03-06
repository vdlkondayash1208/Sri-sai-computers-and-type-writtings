// hero three.js animation
(function(){
  const heroCanvas = document.getElementById('hero-canvas');
  if (!heroCanvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({canvas: heroCanvas, antialias: true, alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 2;

  const geometry = new THREE.BufferGeometry();
  const count = 10000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({color: 0xFFFFFF, size: 0.02});
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function animateHero() {
    requestAnimationFrame(animateHero);
    points.rotation.x += 0.0005;
    points.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  animateHero();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// counters
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function startCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 200;
    let current = 0;
    const update = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}

const statsSection = document.getElementById('stats');
if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        startCounters();
      }
    });
  }, {threshold: 0.6});
  observer.observe(statsSection);
}

// GSAP scroll animations
if (gsap && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%'
      }
    });
  });
}

// smooth scroll for anchor links
document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  });
});

// navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// initialize AOS if available
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 1200, once: true });
}

// contact form removed; static contact info now used