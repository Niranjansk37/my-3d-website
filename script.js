// Three.js Setup and Global Variables
let scene, camera, renderer, particleSystem;
let robot, spaceship, crystal;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initAboutCanvas();
    initProjectCanvases();
    initNavigation();
    initScrollEffects();
    initContactForm();
    hideLoadingScreen();
    animate();
});

// Three.js Background Scene
function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0008);
    
    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 2);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0xff00ff, 2);
    pointLight2.position.set(-10, -10, 5);
    pointLight2.castShadow = true;
    scene.add(pointLight2);
    
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 20, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    // Create Particle System
    createParticleSystem();
    
    // Create 3D Models
    create3DModels();
    
    // Mouse Move Event
    document.addEventListener('mousemove', onMouseMove);
    
    // Window Resize
    window.addEventListener('resize', onWindowResize);
}

// Create Particle System
function createParticleSystem() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 8000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i + 1] = (Math.random() - 0.5) * 100;
        posArray[i + 2] = (Math.random() - 0.5) * 100;
        
        // Color (cyan to magenta gradient)
        const mixRatio = Math.random();
        colorArray[i] = mixRatio; // R
        colorArray[i + 1] = 1 - mixRatio; // G
        colorArray[i + 2] = 1; // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
}

// Create 3D Models
function create3DModels() {
    // Create Robot Model
    robot = createRobot();
    robot.position.set(-15, 5, -10);
    robot.scale.set(2, 2, 2);
    scene.add(robot);
    
    // Create Spaceship Model
    spaceship = createSpaceship();
    spaceship.position.set(15, -5, -15);
    spaceship.scale.set(1.5, 1.5, 1.5);
    scene.add(spaceship);
    
    // Create Crystal Model
    crystal = createCrystal();
    crystal.position.set(0, 10, -20);
    crystal.scale.set(3, 3, 3);
    scene.add(crystal);
}

// Create Robot Model
function createRobot() {
    const robot = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const headMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x003333,
        shininess: 100
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.5;
    head.castShadow = true;
    robot.add(head);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.5
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 2.7, 0.7);
    robot.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 2.7, 0.7);
    robot.add(rightEye);
    
    // Antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0xff00ff });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.y = 3.6;
    robot.add(antenna);
    
    const antennaBallGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const antennaBall = new THREE.Mesh(antennaBallGeometry, eyeMaterial);
    antennaBall.position.y = 4;
    robot.add(antennaBall);
    
    // Body
    const bodyGeometry = new THREE.BoxGeometry(2, 2.5, 1);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x00aaff,
        emissive: 0x002244
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    robot.add(body);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-1.3, 0.5, 0);
    leftArm.rotation.z = Math.PI / 6;
    robot.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(1.3, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 6;
    robot.add(rightArm);
    
    // Hands
    const handGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const leftHand = new THREE.Mesh(handGeometry, headMaterial);
    leftHand.position.set(-1.6, -0.5, 0);
    robot.add(leftHand);
    
    const rightHand = new THREE.Mesh(handGeometry, headMaterial);
    rightHand.position.set(1.6, -0.5, 0);
    robot.add(rightHand);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 8);
    const leftLeg = new THREE.Mesh(legGeometry, armMaterial);
    leftLeg.position.set(-0.6, -1.5, 0);
    robot.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, armMaterial);
    rightLeg.position.set(0.6, -1.5, 0);
    robot.add(rightLeg);
    
    // Feet
    const footGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.8);
    const leftFoot = new THREE.Mesh(footGeometry, bodyMaterial);
    leftFoot.position.set(-0.6, -2.6, 0.2);
    robot.add(leftFoot);
    
    const rightFoot = new THREE.Mesh(footGeometry, bodyMaterial);
    rightFoot.position.set(0.6, -2.6, 0.2);
    robot.add(rightFoot);
    
    return robot;
}

// Create Spaceship Model
function createSpaceship() {
    const spaceship = new THREE.Group();
    
    // Main body (cone)
    const bodyGeometry = new THREE.ConeGeometry(1, 3, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        emissive: 0x330033,
        shininess: 100,
        metalness: 0.8
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI;
    body.position.y = 1;
    body.castShadow = true;
    spaceship.add(body);
    
    // Cockpit (sphere)
    const cockpitGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const cockpitMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.7,
        emissive: 0x00ffff,
        emissiveIntensity: 0.3
    });
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.y = 2.5;
    spaceship.add(cockpit);
    
    // Wings
    const wingGeometry = new THREE.BoxGeometry(3, 0.1, 1);
    const wingMaterial = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        emissive: 0x220022
    });
    const wings = new THREE.Mesh(wingGeometry, wingMaterial);
    wings.position.y = 0.5;
    wings.castShadow = true;
    spaceship.add(wings);
    
    // Engines
    const engineGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.8, 8);
    const engineMaterial = new THREE.MeshPhongMaterial({
        color: 0x666666,
        emissive: 0xff6600,
        emissiveIntensity: 0.5
    });
    
    const leftEngine = new THREE.Mesh(engineGeometry, engineMaterial);
    leftEngine.position.set(-1.2, -0.5, 0);
    spaceship.add(leftEngine);
    
    const rightEngine = new THREE.Mesh(engineGeometry, engineMaterial);
    rightEngine.position.set(1.2, -0.5, 0);
    spaceship.add(rightEngine);
    
    // Engine flames
    const flameGeometry = new THREE.ConeGeometry(0.25, 0.6, 8);
    const flameMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.8
    });
    
    const leftFlame = new THREE.Mesh(flameGeometry, flameMaterial);
    leftFlame.position.set(-1.2, -1.2, 0);
    spaceship.add(leftFlame);
    
    const rightFlame = new THREE.Mesh(flameGeometry, flameMaterial);
    rightFlame.position.set(1.2, -1.2, 0);
    spaceship.add(rightFlame);
    
    return spaceship;
}

// Create Crystal Model
function createCrystal() {
    const crystal = new THREE.Group();
    
    // Main crystal (octahedron)
    const crystalGeometry = new THREE.OctahedronGeometry(1, 0);
    const crystalMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    const mainCrystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    mainCrystal.castShadow = true;
    crystal.add(mainCrystal);
    
    // Smaller crystals around
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const smallCrystal = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.3, 0),
            crystalMaterial.clone()
        );
        smallCrystal.position.set(
            Math.cos(angle) * 1.5,
            Math.sin(angle * 2) * 0.5,
            Math.sin(angle) * 1.5
        );
        smallCrystal.rotation.set(angle, angle, angle);
        crystal.add(smallCrystal);
    }
    
    // Energy ring
    const ringGeometry = new THREE.TorusGeometry(1.8, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    crystal.add(ring);
    
    return crystal;
}

// About Section Canvas - Detailed 3D Model
function initAboutCanvas() {
    const canvas = document.getElementById('about-canvas');
    const aboutScene = new THREE.Scene();
    
    const aboutCamera = new THREE.PerspectiveCamera(
        75,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1,
        1000
    );
    aboutCamera.position.z = 8;
    
    const aboutRenderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
    });
    aboutRenderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    aboutRenderer.setClearColor(0x000000, 0);
    
    // Create detailed model - Abstract sculpture
    const sculpture = createAbstractSculpture();
    aboutScene.add(sculpture);
    
    // Lights
    const light1 = new THREE.PointLight(0x00ffff, 1);
    light1.position.set(5, 5, 5);
    aboutScene.add(light1);
    
    const light2 = new THREE.PointLight(0xff00ff, 1);
    light2.position.set(-5, -5, 5);
    aboutScene.add(light2);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    aboutScene.add(ambientLight);
    
    // Animation
    function animateAbout() {
        requestAnimationFrame(animateAbout);
        sculpture.rotation.x += 0.005;
        sculpture.rotation.y += 0.01;
        aboutRenderer.render(aboutScene, aboutCamera);
    }
    animateAbout();
}

function createAbstractSculpture() {
    const group = new THREE.Group();
    
    // Central sphere
    const sphere = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.5, 1),
        new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            flatShading: true,
            shininess: 100
        })
    );
    group.add(sphere);
    
    // Orbiting rings
    for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(2 + i * 0.5, 0.1, 16, 100),
            new THREE.MeshPhongMaterial({
                color: i % 2 === 0 ? 0x00ffff : 0xff00ff,
                transparent: true,
                opacity: 0.6
            })
        );
        ring.rotation.x = (i * Math.PI) / 3;
        ring.rotation.y = (i * Math.PI) / 4;
        group.add(ring);
    }
    
    return group;
}

// Project Canvases - Unique 3D Models
function initProjectCanvases() {
    const projectDivs = document.querySelectorAll('.project-3d');
    
    projectDivs.forEach((div, index) => {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        div.appendChild(canvas);
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, div.offsetWidth / div.offsetHeight, 0.1, 1000);
        camera.position.z = 6;
        
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(div.offsetWidth, div.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        
        let mesh;
        
        if (index === 0) {
            // DNA Helix
            mesh = createDNAHelix();
        } else if (index === 1) {
            // Atom Model
            mesh = createAtomModel();
        } else {
            // Geometric Flower
            mesh = createGeometricFlower();
        }
        
        scene.add(mesh);
        
        // Lighting
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);
        
        const light2 = new THREE.PointLight(0xff00ff, 0.5);
        light2.position.set(-5, -5, 5);
        scene.add(light2);
        
        function animateProject() {
            requestAnimationFrame(animateProject);
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animateProject();
    });
}

function createDNAHelix() {
    const group = new THREE.Group();
    const helixHeight = 4;
    const helixRadius = 1;
    const segments = 20;
    
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 4;
        const y = (i / segments) * helixHeight - helixHeight / 2;
        
        // Left strand
        const sphere1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0x00ffff })
        );
        sphere1.position.set(
            Math.cos(angle) * helixRadius,
            y,
            Math.sin(angle) * helixRadius
        );
        group.add(sphere1);
        
        // Right strand
        const sphere2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0xff00ff })
        );
        sphere2.position.set(
            Math.cos(angle + Math.PI) * helixRadius,
            y,
            Math.sin(angle + Math.PI) * helixRadius
        );
        group.add(sphere2);
        
        // Connecting bar
        if (i % 3 === 0) {
            const bar = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, helixRadius * 2, 8),
                new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
            );
            bar.position.y = y;
            bar.rotation.z = Math.PI / 2;
            bar.rotation.y = angle;
            group.add(bar);
        }
    }
    
    return group;
}

function createAtomModel() {
    const group = new THREE.Group();
    
    // Nucleus
    const nucleus = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshPhongMaterial({
            color: 0xff0000,
            emissive: 0xff0000,
            emissiveIntensity: 0.3
        })
    );
    group.add(nucleus);
    
    // Electron orbits
    const orbitCount = 3;
    for (let i = 0; i < orbitCount; i++) {
        const orbitRadius = 1.5 + i * 0.7;
        const orbit = new THREE.Mesh(
            new THREE.TorusGeometry(orbitRadius, 0.02, 16, 100),
            new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.3
            })
        );
        orbit.rotation.x = (i * Math.PI) / orbitCount;
        orbit.rotation.y = (i * Math.PI) / orbitCount;
        group.add(orbit);
        
        // Electrons
        const electronCount = i + 2;
        for (let j = 0; j < electronCount; j++) {
            const angle = (j / electronCount) * Math.PI * 2;
            const electron = new THREE.Mesh(
                new THREE.SphereGeometry(0.15, 16, 16),
                new THREE.MeshPhongMaterial({
                    color: 0x00ffff,
                    emissive: 0x00ffff,
                    emissiveIntensity: 0.5
                })
            );
            electron.position.set(
                Math.cos(angle) * orbitRadius,
                Math.sin(angle) * orbitRadius * Math.sin(orbit.rotation.x),
                Math.sin(angle) * orbitRadius * Math.cos(orbit.rotation.x)
            );
            group.add(electron);
        }
    }
    
    return group;
}

function createGeometricFlower() {
    const group = new THREE.Group();
    const petalCount = 8;
    
    // Center
    const center = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshPhongMaterial({
            color: 0xffff00,
            emissive: 0xffff00,
            emissiveIntensity: 0.3
        })
    );
    group.add(center);
    
    // Petals
    for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        const petal = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 1.5, 0.2),
            new THREE.MeshPhongMaterial({
                color: i % 2 === 0 ? 0xff00ff : 0x00ffff,
                shininess: 100
            })
        );
        petal.position.set(
            Math.cos(angle) * 1.2,
            Math.sin(angle) * 1.2,
            0
        );
        petal.rotation.z = angle + Math.PI / 2;
        group.add(petal);
    }
    
    // Outer ring
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2, 0.1, 16, 100),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        })
    );
    group.add(ring);
    
    return group;
}

// Mouse Movement
function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

// Window Resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Smooth camera movement based on mouse
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Rotate particles
    if (particleSystem) {
        particleSystem.rotation.y += 0.0005;
        particleSystem.rotation.x += 0.0002;
    }
    
    // Animate Robot
    if (robot) {
        robot.rotation.y += 0.01;
        // Arm wave animation
        robot.children[4].rotation.z = Math.sin(time * 2) * 0.3 + Math.PI / 6; // left arm
        robot.children[5].rotation.z = Math.sin(time * 2 + Math.PI) * 0.3 - Math.PI / 6; // right arm
    }
    
    // Animate Spaceship
    if (spaceship) {
        spaceship.rotation.y += 0.008;
        spaceship.position.y = -5 + Math.sin(time) * 0.5;
        // Engine flame flicker
        if (spaceship.children[5] && spaceship.children[6]) {
            const flameIntensity = 0.8 + Math.random() * 0.2;
            spaceship.children[5].material.opacity = flameIntensity;
            spaceship.children[6].material.opacity = flameIntensity;
        }
    }
    
    // Animate Crystal
    if (crystal) {
        crystal.rotation.y += 0.005;
        crystal.rotation.x = Math.sin(time * 0.5) * 0.2;
        crystal.position.y = 10 + Math.sin(time * 2) * 0.3;
        
        // Pulsing glow effect
        const pulseScale = 1 + Math.sin(time * 3) * 0.05;
        crystal.scale.set(pulseScale * 3, pulseScale * 3, pulseScale * 3);
    }
    
    renderer.render(scene, camera);
}

// Navigation
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Burger menu toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling and active state
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Update Active Nav Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Explore button scroll
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simulate form submission
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            
            // Reset form
            form.reset();
        });
    }
}

// Loading Screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
}

// Project Cards Interaction
document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        alert(`Opening project: ${projectTitle}\n\nThis would typically open a detailed project page or modal.`);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Console log for developers
console.log('%c🤖 3D Portfolio Website with Detailed Models', 'color: #00ffff; font-size: 24px; font-weight: bold;');
console.log('%cFeaturing: Robot, Spaceship, Crystal, DNA Helix, Atom, and Geometric Flower', 'color: #ff00ff; font-size: 14px;');
console.log('%cBuilt with Three.js ❤️ Explore the code! 🚀', 'color: #00ffff; font-size: 12px;');
