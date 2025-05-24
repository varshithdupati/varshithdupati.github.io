window.onload = function() {
    tsParticles.load("tsparticles", {
        background: { color: { value: "#0f172a" } },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    links: { opacity: 0.5 }
                }
            }
        },
        particles: {
            color: { value: "#3b82f6" },
            links: {
                color: "#94a3b8",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1
            },
            collisions: { enable: false },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1.2,
                straight: false
            },
            number: {
                density: { enable: true, area: 800 },
                value: 100
            },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } }
        },
        detectRetina: true
    });
}; 