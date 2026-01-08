import { useRef, useEffect } from 'react';

const FirefliesAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireflies = [];
    for (let i = 0; i < 100; i++) {
      fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        brightness: Math.random(),
        brightnessSpeed: Math.random() * 0.05 + 0.02,
        size: Math.random() * 4 + 2,
        hue: Math.random() * 60 + 60
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach(firefly => {
        firefly.brightness += firefly.brightnessSpeed;
        if (firefly.brightness > Math.PI * 2) firefly.brightness = 0;

        const glow = (Math.sin(firefly.brightness) + 1) / 2;

        ctx.shadowBlur = 20 * glow;
        ctx.shadowColor = `hsl(${firefly.hue}, 100%, 60%)`;

        const gradient = ctx.createRadialGradient(
          firefly.x, firefly.y, 0,
          firefly.x, firefly.y, firefly.size * 4
        );
        gradient.addColorStop(0, `hsla(${firefly.hue}, 100%, 70%, ${glow})`);
        gradient.addColorStop(0.5, `hsla(${firefly.hue}, 100%, 50%, ${glow * 0.5})`);
        gradient.addColorStop(1, 'rgba(52, 211, 153, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        if (firefly.x < 0 || firefly.x > canvas.width) firefly.vx *= -1;
        if (firefly.y < 0 || firefly.y > canvas.height) firefly.vy *= -1;

        firefly.vx += (Math.random() - 0.5) * 0.1;
        firefly.vy += (Math.random() - 0.5) * 0.1;
        firefly.vx *= 0.99;
        firefly.vy *= 0.99;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default FirefliesAnimation;