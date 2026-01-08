import { useRef, useEffect } from 'react';

const OceanAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 47, 73, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let layer = 0; layer < 8; layer++) {
        ctx.beginPath();
        const waveHeight = 60 + layer * 15;
        const baseY = canvas.height - 200 + layer * 25;

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = baseY + 
            Math.sin(x * 0.01 + time + layer * 0.5) * waveHeight * 0.3 + 
            Math.sin(x * 0.005 + time * 0.7) * waveHeight * 0.2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const opacity = 0.15 - layer * 0.015;
        ctx.fillStyle = `rgba(96, 165, 250, ${opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < 20; i++) {
        const x = (time * 50 + i * 100) % canvas.width;
        const y = canvas.height - 180 + Math.sin(time + i) * 20;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.02;
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

export default OceanAnimation;