import { useRef, useEffect } from 'react';

const RainAnimation = () => {
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
    const particleCount = isMobile ? 60 : 100;

    const raindrops = [];
    for (let i = 0; i < particleCount; i++) {
      raindrops.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        length: Math.random() * (isMobile ? 12 : 18) + (isMobile ? 8 : 12),
        speed: Math.random() * (isMobile ? 1.5 : 2.5) + (isMobile ? 2 : 2.5),
        opacity: Math.random() * 0.3 + 0.15,
        thickness: Math.random() * 0.5 + 0.8
      });
    }

    const ripples = [];
    let lightning = { 
      active: false, 
      x: 0, 
      opacity: 0, 
      branches: [],
      glow: 0
    };

    const createLightning = () => {
      lightning.x = Math.random() * rect.width;
      lightning.opacity = 0.8;
      lightning.active = true;
      lightning.glow = 1;
      lightning.branches = [];

      let currentX = lightning.x;
      let currentY = 0;
      const segments = isMobile ? 6 : 10;

      for (let i = 0; i < segments; i++) {
        const nextX = currentX + (Math.random() - 0.5) * (isMobile ? 30 : 45);
        const nextY = currentY + Math.random() * (isMobile ? 20 : 30) + (isMobile ? 15 : 25);
        lightning.branches.push({ 
          x1: currentX, 
          y1: currentY, 
          x2: nextX, 
          y2: nextY,
          thickness: Math.random() * 1.5 + 1
        });
        
        if (Math.random() < 0.3 && i > 2) {
          const branchX = nextX + (Math.random() - 0.5) * (isMobile ? 20 : 35);
          const branchY = nextY + Math.random() * (isMobile ? 15 : 25);
          lightning.branches.push({
            x1: nextX,
            y1: nextY,
            x2: branchX,
            y2: branchY,
            thickness: Math.random() * 0.8 + 0.5
          });
        }
        
        currentX = nextX;
        currentY = nextY;
      }
    };

    let lightningTimer = Math.random() * 400 + 300;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      if (lightning.active) {
        ctx.shadowBlur = isMobile ? 20 : 30;
        ctx.shadowColor = `rgba(96, 165, 250, ${lightning.glow * 0.4})`;
        
        lightning.branches.forEach(branch => {
          ctx.strokeStyle = `rgba(147, 197, 253, ${lightning.opacity})`;
          ctx.lineWidth = branch.thickness;
          ctx.beginPath();
          ctx.moveTo(branch.x1, branch.y1);
          ctx.lineTo(branch.x2, branch.y2);
          ctx.stroke();
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${lightning.opacity * 0.8})`;
          ctx.lineWidth = branch.thickness * 0.4;
          ctx.beginPath();
          ctx.moveTo(branch.x1, branch.y1);
          ctx.lineTo(branch.x2, branch.y2);
          ctx.stroke();
        });
        
        ctx.shadowBlur = 0;
        lightning.opacity -= 0.025;
        lightning.glow -= 0.025;
        if (lightning.opacity <= 0) lightning.active = false;
      }

      raindrops.forEach(drop => {
        ctx.strokeStyle = `rgba(147, 197, 253, ${drop.opacity})`;
        ctx.lineWidth = drop.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - (isMobile ? 1.5 : 2), drop.y + drop.length);
        ctx.stroke();
        
        ctx.strokeStyle = `rgba(147, 197, 253, ${drop.opacity * 0.3})`;
        ctx.lineWidth = drop.thickness * 2;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - (isMobile ? 1.5 : 2), drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > rect.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * rect.width;
          
          if (Math.random() < 0.08) {
            ripples.push({ 
              x: drop.x, 
              y: rect.height - (isMobile ? 25 : 40), 
              radius: 0, 
              opacity: 0.6,
              maxRadius: isMobile ? 15 : 25
            });
          }
        }
      });

      ripples.forEach((ripple, index) => {
        ctx.strokeStyle = `rgba(147, 197, 253, ${ripple.opacity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        if (ripple.radius > 3) {
          ctx.strokeStyle = `rgba(147, 197, 253, ${ripple.opacity * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ripple.radius += isMobile ? 1.2 : 1.5;
        ripple.opacity -= 0.012;
        
        if (ripple.opacity <= 0 || ripple.radius > ripple.maxRadius) {
          ripples.splice(index, 1);
        }
      });

      lightningTimer--;
      if (lightningTimer <= 0) {
        createLightning();
        lightningTimer = Math.random() * (isMobile ? 500 : 600) + (isMobile ? 400 : 500);
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * devicePixelRatio;
      canvas.height = newRect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      raindrops.forEach(drop => {
        drop.x = Math.min(drop.x, newRect.width);
        drop.y = Math.min(drop.y, newRect.height);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" style={{ imageRendering: 'auto' }} />;
};

export default RainAnimation;