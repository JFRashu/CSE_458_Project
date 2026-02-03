import { useRef, useEffect } from 'react';

const FirefliesAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const isMobile = window.innerWidth < 768;
    const fireflies = [];
    const numFireflies = isMobile ? 40 : 100;

    for (let i = 0; i < numFireflies; i++) {
      fireflies.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * (isMobile ? 1.5 : 2.5), // Increased from 0.8/1.5
        vy: (Math.random() - 0.5) * (isMobile ? 1.5 : 2.5), // Increased from 0.8/1.5
        brightness: Math.random() * Math.PI * 2,
        brightnessSpeed: Math.random() * 0.04 + 0.02,
        size: Math.random() * (isMobile ? 2.5 : 3.5) + (isMobile ? 1.5 : 2),
        hue: Math.random() * 40 + 60,
        maxGlow: Math.random() * 0.6 + 0.4,
        pulsePattern: Math.random() < 0.3 ? 'fast' : 'slow',
        targetX: null,
        targetY: null,
        reachedTarget: false
      });
    }

    const animate = () => {
      // Solid black background - no trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      fireflies.forEach((firefly) => {
        firefly.brightness += firefly.brightnessSpeed;
        if (firefly.brightness > Math.PI * 2) firefly.brightness = 0;

        let glow;
        if (firefly.pulsePattern === 'fast') {
          glow = (Math.sin(firefly.brightness * 2) + 1) / 2;
        } else {
          glow = (Math.sin(firefly.brightness) + 1) / 2;
        }
        glow *= firefly.maxGlow;

        const outerGradient = ctx.createRadialGradient(
          firefly.x, firefly.y, 0,
          firefly.x, firefly.y, firefly.size * (isMobile ? 5 : 6)
        );
        outerGradient.addColorStop(0, `hsla(${firefly.hue}, 100%, 60%, ${glow * 0.3})`);
        outerGradient.addColorStop(0.5, `hsla(${firefly.hue}, 100%, 50%, ${glow * 0.15})`);
        outerGradient.addColorStop(1, 'rgba(52, 211, 153, 0)');

        ctx.fillStyle = outerGradient;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size * (isMobile ? 5 : 6), 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = (isMobile ? 12 : 18) * glow;
        ctx.shadowColor = `hsla(${firefly.hue}, 100%, 60%, ${glow * 0.8})`;

        const middleGradient = ctx.createRadialGradient(
          firefly.x, firefly.y, 0,
          firefly.x, firefly.y, firefly.size * (isMobile ? 3 : 4)
        );
        middleGradient.addColorStop(0, `hsla(${firefly.hue}, 100%, 70%, ${glow * 0.8})`);
        middleGradient.addColorStop(0.6, `hsla(${firefly.hue}, 100%, 55%, ${glow * 0.4})`);
        middleGradient.addColorStop(1, 'rgba(52, 211, 153, 0)');

        ctx.fillStyle = middleGradient;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size * (isMobile ? 3 : 4), 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.fillStyle = `hsla(${firefly.hue}, 100%, 90%, ${glow})`;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        if (!firefly.targetX || firefly.reachedTarget || Math.random() < 0.005) {
          firefly.targetX = Math.random() * rect.width;
          firefly.targetY = Math.random() * rect.height;
          firefly.reachedTarget = false;
        }

        const dx = firefly.targetX - firefly.x;
        const dy = firefly.targetY - firefly.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
          firefly.reachedTarget = true;
        }

        const targetInfluence = 0.035; // Increased from 0.02
        firefly.vx += (dx / distance) * targetInfluence * (1 - firefly.reachedTarget ? 1 : 0);
        firefly.vy += (dy / distance) * targetInfluence * (1 - firefly.reachedTarget ? 1 : 0);

        firefly.vx += (Math.random() - 0.5) * 0.15;
        firefly.vy += (Math.random() - 0.5) * 0.15;

        firefly.vx *= 0.98;
        firefly.vy *= 0.98;

        const speed = Math.sqrt(firefly.vx * firefly.vx + firefly.vy * firefly.vy);
        const maxSpeed = isMobile ? 10 : 15; // Increased from 2/3
        if (speed > maxSpeed) {
          firefly.vx = (firefly.vx / speed) * maxSpeed;
          firefly.vy = (firefly.vy / speed) * maxSpeed;
        }

        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        const padding = 50;
        if (firefly.x < padding || firefly.x > rect.width - padding) {
          firefly.vx *= -0.8;
          firefly.x = Math.max(padding, Math.min(rect.width - padding, firefly.x));
        }
        if (firefly.y < padding || firefly.y > rect.height - padding) {
          firefly.vy *= -0.8;
          firefly.y = Math.max(padding, Math.min(rect.height - padding, firefly.y));
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * devicePixelRatio;
      canvas.height = newRect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      fireflies.forEach(firefly => {
        firefly.x = Math.min(firefly.x, newRect.width - 50);
        firefly.y = Math.min(firefly.y, newRect.height - 50);
        firefly.targetX = null;
        firefly.targetY = null;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" style={{ imageRendering: 'auto' }} />;
};

export default FirefliesAnimation;