import { useRef, useEffect } from 'react';

const GalaxyAnimation = () => {
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
    const stars = [];
    const numStars = isMobile ? 120 : 250;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * (isMobile ? 200 : 400),
        size: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
        speed: Math.random() * 0.001 + 0.0005,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.05 + 0.02
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      stars.forEach(star => {
        star.angle += star.speed;
        star.twinkle += star.twinkleSpeed;

        const x = centerX + Math.cos(star.angle) * star.distance;
        const y = centerY + Math.sin(star.angle) * star.distance;
        const brightness = (Math.sin(star.twinkle) + 1) / 2;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3);
        gradient.addColorStop(0, `rgba(167, 139, 250, ${brightness})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${brightness * 0.5})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(167, 139, 250, ${brightness * 0.3})`;
        ctx.lineWidth = star.size;
        ctx.beginPath();
        const prevX = centerX + Math.cos(star.angle - 0.1) * star.distance;
        const prevY = centerY + Math.sin(star.angle - 0.1) * star.distance;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * devicePixelRatio;
      canvas.height = newRect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Reinitialize stars for new dimensions
      stars.length = 0;
      const newIsMobile = window.innerWidth < 768;
      const newNumStars = newIsMobile ? 120 : 250;
      for (let i = 0; i < newNumStars; i++) {
        stars.push({
          angle: Math.random() * Math.PI * 2,
          distance: Math.random() * (newIsMobile ? 200 : 400),
          size: Math.random() * (newIsMobile ? 1.5 : 2) + 0.5,
          speed: Math.random() * 0.001 + 0.0005,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.05 + 0.02
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: 'auto' }} />;
};

export default GalaxyAnimation;