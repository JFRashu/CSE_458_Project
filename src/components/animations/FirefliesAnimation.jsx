import { useRef, useEffect } from 'react';

const FirefliesAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Handle device pixel ratio for crisp rendering
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const isMobile = window.innerWidth < 768;
    const fireflies = [];
    const numFireflies = isMobile ? 40 : 80;

    // Initialize fireflies
    for (let i = 0; i < numFireflies; i++) {
      fireflies.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * (isMobile ? 1 : 2),
        vy: (Math.random() - 0.5) * (isMobile ? 1 : 2),
        brightness: Math.random(),
        brightnessSpeed: Math.random() * 0.05 + 0.02,
        size: Math.random() * (isMobile ? 3 : 4) + (isMobile ? 1.5 : 2),
        hue: Math.random() * 60 + 60
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      fireflies.forEach(firefly => {
        firefly.brightness += firefly.brightnessSpeed;
        if (firefly.brightness > Math.PI * 2) firefly.brightness = 0;

        const glow = (Math.sin(firefly.brightness) + 1) / 2;

        ctx.shadowBlur = (isMobile ? 15 : 20) * glow;
        ctx.shadowColor = `hsl(${firefly.hue}, 100%, 60%)`;

        const gradient = ctx.createRadialGradient(
          firefly.x, firefly.y, 0,
          firefly.x, firefly.y, firefly.size * (isMobile ? 3 : 4)
        );
        gradient.addColorStop(0, `hsla(${firefly.hue}, 100%, 70%, ${glow})`);
        gradient.addColorStop(0.5, `hsla(${firefly.hue}, 100%, 50%, ${glow * 0.5})`);
        gradient.addColorStop(1, 'rgba(52, 211, 153, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size * (isMobile ? 3 : 4), 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        if (firefly.x < 0 || firefly.x > rect.width) firefly.vx *= -1;
        if (firefly.y < 0 || firefly.y > rect.height) firefly.vy *= -1;

        firefly.vx += (Math.random() - 0.5) * 0.1;
        firefly.vy += (Math.random() - 0.5) * 0.1;
        firefly.vx *= 0.99;
        firefly.vy *= 0.99;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * devicePixelRatio;
      canvas.height = newRect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Reinitialize fireflies for new dimensions
      fireflies.length = 0;
      const newIsMobile = window.innerWidth < 768;
      const newNumFireflies = newIsMobile ? 40 : 80;
      for (let i = 0; i < newNumFireflies; i++) {
        fireflies.push({
          x: Math.random() * newRect.width,
          y: Math.random() * newRect.height,
          vx: (Math.random() - 0.5) * (newIsMobile ? 1 : 2),
          vy: (Math.random() - 0.5) * (newIsMobile ? 1 : 2),
          brightness: Math.random(),
          brightnessSpeed: Math.random() * 0.05 + 0.02,
          size: Math.random() * (newIsMobile ? 3 : 4) + (newIsMobile ? 1.5 : 2),
          hue: Math.random() * 60 + 60
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: 'auto' }} />;
};

export default FirefliesAnimation;