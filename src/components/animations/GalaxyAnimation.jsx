import { useRef, useEffect } from 'react';

const GalaxyAnimation = () => {
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
    const stars = [];
    const numStars = isMobile ? 100 : 180;

    // Increased speed multiplier - adjust this value to control overall speed
    // Higher = faster rotation (1.5x, 2x, 3x, etc.)
    const speedMultiplier = 2.5;

    for (let i = 0; i < numStars; i++) {
      const distance = Math.random() * (isMobile ? 180 : 350) + (isMobile ? 30 : 50);
      stars.push({
        angle: Math.random() * Math.PI * 2,
        distance: distance,
        size: Math.random() * (isMobile ? 1.2 : 1.8) + 0.5,
        speed: (Math.random() * 0.0008 + 0.0004) * (1 + distance / 400) * speedMultiplier, // Increased speed
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.04 + 0.02,
        color: Math.random() < 0.7 ? 
          { r: 167, g: 139, b: 250 } : 
          { r: 139, g: 92, b: 246 },
        opacity: Math.random() * 0.4 + 0.3,
        trailLength: Math.random() * 0.08 + 0.05
      });
    }

    const brightStars = isMobile ? 8 : 15;
    for (let i = 0; i < brightStars; i++) {
      stars.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * (isMobile ? 150 : 280) + (isMobile ? 40 : 80),
        size: Math.random() * (isMobile ? 2 : 3) + (isMobile ? 1.5 : 2),
        speed: (Math.random() * 0.006 + 0.003) * speedMultiplier, // Increased speed
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        color: { r: 196, g: 181, b: 253 },
        opacity: Math.random() * 0.3 + 0.5,
        trailLength: Math.random() * 0.1 + 0.08,
        isBright: true
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      stars.forEach(star => {
        star.angle += star.speed;
        star.twinkle += star.twinkleSpeed;

        const x = centerX + Math.cos(star.angle) * star.distance;
        const y = centerY + Math.sin(star.angle) * star.distance;
        const brightness = (Math.sin(star.twinkle) + 1) / 2;
        const dynamicOpacity = star.opacity * (0.6 + brightness * 0.4);

        const prevX = centerX + Math.cos(star.angle - star.trailLength) * star.distance;
        const prevY = centerY + Math.sin(star.angle - star.trailLength) * star.distance;
        
        const trailGradient = ctx.createLinearGradient(prevX, prevY, x, y);
        trailGradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0)`);
        trailGradient.addColorStop(1, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${dynamicOpacity * 0.4})`);
        
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = star.size * 0.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();

        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, star.size * (star.isBright ? 4 : 3)
        );
        gradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${dynamicOpacity})`);
        gradient.addColorStop(0.3, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${dynamicOpacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, star.size * (star.isBright ? 4 : 3), 0, Math.PI * 2);
        ctx.fill();

        if (star.isBright) {
          ctx.fillStyle = `rgba(255, 255, 255, ${dynamicOpacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(x, y, star.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.shadowBlur = star.isBright ? (isMobile ? 10 : 15) : (isMobile ? 6 : 8);
        ctx.shadowColor = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${dynamicOpacity * 0.5})`;
        ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${dynamicOpacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" style={{ imageRendering: 'auto' }} />;
};

export default GalaxyAnimation;