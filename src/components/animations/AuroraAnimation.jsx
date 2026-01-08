import { useRef, useEffect } from 'react';

const AuroraAnimation = () => {
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

    let time = 0;
    const isMobile = window.innerWidth < 768;
    const waves = [
      { color: 'rgba(134, 239, 172, 0.25)', offset: 0, speed: 0.015 },
      { color: 'rgba(96, 165, 250, 0.25)', offset: Math.PI / 3, speed: 0.012 },
      { color: 'rgba(167, 139, 250, 0.25)', offset: Math.PI / 1.5, speed: 0.018 }
    ];

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      waves.forEach(wave => {
        ctx.beginPath();
        const stepSize = isMobile ? 8 : 5;
        for (let x = 0; x <= rect.width; x += stepSize) {
          const y = rect.height / 2 +
            Math.sin(x * (isMobile ? 0.004 : 0.005) + time + wave.offset) * (isMobile ? 80 : 100) +
            Math.sin(x * (isMobile ? 0.008 : 0.01) + time * 1.5) * (isMobile ? 40 : 50);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineTo(rect.width, rect.height);
        ctx.lineTo(0, rect.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();

        time += wave.speed;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * devicePixelRatio;
      canvas.height = newRect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: 'auto' }} />;
};

export default AuroraAnimation;