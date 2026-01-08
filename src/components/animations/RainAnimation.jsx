import { useRef, useEffect } from 'react';

const RainAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const raindrops = [];
    for (let i = 0; i < 200; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 25 + 15,
        speed: Math.random() * 4 + 3,
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    const ripples = [];
    let lightning = { active: false, x: 0, opacity: 0, branches: [] };

    const createLightning = () => {
      lightning.x = Math.random() * canvas.width;
      lightning.opacity = 1;
      lightning.active = true;
      lightning.branches = [];
      
      let currentX = lightning.x;
      let currentY = 0;
      
      for (let i = 0; i < 15; i++) {
        const nextX = currentX + (Math.random() - 0.5) * 60;
        const nextY = currentY + Math.random() * 40 + 30;
        lightning.branches.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });
        currentX = nextX;
        currentY = nextY;
      }
    };

    let lightningTimer = Math.random() * 200 + 100;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (lightning.active) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#60A5FA';
        ctx.strokeStyle = `rgba(147, 197, 253, ${lightning.opacity})`;
        ctx.lineWidth = 3;
        lightning.branches.forEach(branch => {
          ctx.beginPath();
          ctx.moveTo(branch.x1, branch.y1);
          ctx.lineTo(branch.x2, branch.y2);
          ctx.stroke();
        });
        ctx.shadowBlur = 0;
        lightning.opacity -= 0.05;
        if (lightning.opacity <= 0) lightning.active = false;
      }

      raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 197, 253, ${drop.opacity})`;
        ctx.lineWidth = 2;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 3, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
          ripples.push({ x: drop.x, y: canvas.height - 50, radius: 0, opacity: 1 });
        }
      });

      ripples.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 197, 253, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        ripple.radius += 2;
        ripple.opacity -= 0.02;
        if (ripple.opacity <= 0) ripples.splice(index, 1);
      });

      lightningTimer--;
      if (lightningTimer <= 0) {
        createLightning();
        lightningTimer = Math.random() * 300 + 150;
      }

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

export default RainAnimation;