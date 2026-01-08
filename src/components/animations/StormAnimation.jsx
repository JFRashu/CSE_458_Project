import { useRef, useEffect } from 'react';

const StormAnimation = () => {
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

    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 200 : 300;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * (isMobile ? 150 : 200) + (isMobile ? 50 : 100),
        speed: Math.random() * 0.015 + 0.01,
        size: Math.random() * (isMobile ? 2 : 3) + 1,
        centerX: rect.width / 2,
        centerY: rect.height / 2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(20, 20, 20, 0.04)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      particles.forEach(particle => {
        particle.angle += particle.speed;
        particle.x = particle.centerX + Math.cos(particle.angle) * particle.radius;
        particle.y = particle.centerY + Math.sin(particle.angle) * particle.radius;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.6)');
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        particle.radius += Math.sin(particle.angle * 2) * (isMobile ? 0.3 : 0.5);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * devicePixelRatio;
      canvas.height = newRect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Update particle centers
      particles.forEach(particle => {
        particle.centerX = newRect.width / 2;
        particle.centerY = newRect.height / 2;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: 'auto' }} />;
};

export default StormAnimation;