import { useRef, useEffect } from 'react';

const RainAnimation = () => {
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

    // Responsive particle count based on screen size
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 80 : 150;

    const raindrops = [];
    for (let i = 0; i < particleCount; i++) {
      raindrops.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        length: Math.random() * (isMobile ? 15 : 25) + (isMobile ? 10 : 15),
        speed: Math.random() * (isMobile ? 2 : 4) + (isMobile ? 2 : 3),
        opacity: Math.random() * 0.4 + 0.2
      });
    }

    const ripples = [];
    let lightning = { active: false, x: 0, opacity: 0, branches: [] };

    const createLightning = () => {
      lightning.x = Math.random() * rect.width;
      lightning.opacity = 1;
      lightning.active = true;
      lightning.branches = [];

      let currentX = lightning.x;
      let currentY = 0;

      for (let i = 0; i < (isMobile ? 8 : 15); i++) {
        const nextX = currentX + (Math.random() - 0.5) * (isMobile ? 40 : 60);
        const nextY = currentY + Math.random() * (isMobile ? 25 : 40) + (isMobile ? 20 : 30);
        lightning.branches.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });
        currentX = nextX;
        currentY = nextY;
      }
    };

    let lightningTimer = Math.random() * 300 + 200;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      if (lightning.active) {
        ctx.shadowBlur = isMobile ? 15 : 20;
        ctx.shadowColor = '#60A5FA';
        ctx.strokeStyle = `rgba(147, 197, 253, ${lightning.opacity})`;
        ctx.lineWidth = isMobile ? 2 : 3;
        lightning.branches.forEach(branch => {
          ctx.beginPath();
          ctx.moveTo(branch.x1, branch.y1);
          ctx.lineTo(branch.x2, branch.y2);
          ctx.stroke();
        });
        ctx.shadowBlur = 0;
        lightning.opacity -= 0.03;
        if (lightning.opacity <= 0) lightning.active = false;
      }

      raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 197, 253, ${drop.opacity})`;
        ctx.lineWidth = isMobile ? 1.5 : 2;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - (isMobile ? 2 : 3), drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > rect.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * rect.width;
          if (Math.random() < 0.1) { // Reduced ripple frequency for performance
            ripples.push({ x: drop.x, y: rect.height - (isMobile ? 30 : 50), radius: 0, opacity: 1 });
          }
        }
      });

      ripples.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 197, 253, ${ripple.opacity})`;
        ctx.lineWidth = isMobile ? 1.5 : 2;
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        ripple.radius += isMobile ? 1.5 : 2;
        ripple.opacity -= 0.015;
        if (ripple.opacity <= 0) ripples.splice(index, 1);
      });

      lightningTimer--;
      if (lightningTimer <= 0) {
        createLightning();
        lightningTimer = Math.random() * (isMobile ? 400 : 500) + (isMobile ? 300 : 400);
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * devicePixelRatio;
      canvas.height = newRect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Update particle positions for new size
      raindrops.forEach(drop => {
        drop.x = Math.min(drop.x, newRect.width);
        drop.y = Math.min(drop.y, newRect.height);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: 'auto' }} />;
};

export default RainAnimation;