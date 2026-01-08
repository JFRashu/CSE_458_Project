import { useRef, useEffect } from 'react';

const OceanAnimation = () => {
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

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 47, 73, 0.1)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      const numLayers = isMobile ? 6 : 8;
      for (let layer = 0; layer < numLayers; layer++) {
        ctx.beginPath();
        const waveHeight = (isMobile ? 40 : 60) + layer * (isMobile ? 10 : 15);
        const baseY = rect.height - (isMobile ? 150 : 200) + layer * (isMobile ? 20 : 25);

        const stepSize = isMobile ? 8 : 5;
        for (let x = 0; x <= rect.width; x += stepSize) {
          const y = baseY +
            Math.sin(x * (isMobile ? 0.008 : 0.01) + time + layer * 0.5) * waveHeight * 0.3 +
            Math.sin(x * (isMobile ? 0.004 : 0.005) + time * 0.7) * waveHeight * 0.2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(rect.width, rect.height);
        ctx.lineTo(0, rect.height);
        ctx.closePath();

        const opacity = 0.15 - layer * 0.015;
        ctx.fillStyle = `rgba(96, 165, 250, ${opacity})`;
        ctx.fill();
      }

      const numFoam = isMobile ? 12 : 20;
      for (let i = 0; i < numFoam; i++) {
        const x = (time * (isMobile ? 30 : 50) + i * (isMobile ? 80 : 100)) % rect.width;
        const y = rect.height - (isMobile ? 130 : 180) + Math.sin(time + i) * (isMobile ? 15 : 20);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, isMobile ? 2 : 3, 0, Math.PI * 2);
        ctx.fill();
      }

      time += isMobile ? 0.015 : 0.02;
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

export default OceanAnimation;