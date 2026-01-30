import { useRef, useEffect } from 'react';

const StormAnimation = () => {
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
    const particleCount = isMobile ? 180 : 280;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * (isMobile ? 150 : 220) + (isMobile ? 80 : 120);
      particles.push({
        x: rect.width / 2,
        y: rect.height / 2,
        angle: Math.random() * Math.PI * 2,
        radius: radius,
        speed: Math.random() * 0.015 + 0.01,
        size: Math.random() * (isMobile ? 1.8 : 2.5) + 1,
        opacity: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.035 + 0.025,
        pulsePhase: Math.random() * Math.PI * 2,
        orbitSpeed: Math.random() * 0.01 + 0.005,
        centerX: rect.width / 2,
        centerY: rect.height / 2,
        colorVariation: Math.random()
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 20, 0.04)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      particles.forEach(particle => {
        particle.angle += particle.speed;
        particle.pulsePhase += particle.pulseSpeed;
        
        const radiusOffset = Math.sin(particle.pulsePhase) * (isMobile ? 20 : 35);
        const currentRadius = particle.radius + radiusOffset;
        
        particle.x = particle.centerX + Math.cos(particle.angle) * currentRadius;
        particle.y = particle.centerY + Math.sin(particle.angle) * currentRadius;

        const dynamicOpacity = particle.opacity * (0.75 + Math.sin(particle.pulsePhase) * 0.25);

        // Color variations for depth
        const r = particle.colorVariation > 0.7 ? 255 : 251;
        const g = particle.colorVariation > 0.7 ? 215 : (particle.colorVariation > 0.4 ? 191 : 146);
        const b = particle.colorVariation > 0.7 ? 0 : (particle.colorVariation > 0.4 ? 36 : 60);

        // Outer glow
        const outerGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 5
        );
        outerGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${dynamicOpacity * 0.4})`);
        outerGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${dynamicOpacity * 0.2})`);
        outerGradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

        ctx.fillStyle = outerGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 5, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${dynamicOpacity})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${dynamicOpacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core with shadow
        ctx.shadowBlur = isMobile ? 10 : 15;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${dynamicOpacity * 0.6})`;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dynamicOpacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Spiral effect
        particle.radius += Math.sin(particle.angle * 2) * 0.4;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * devicePixelRatio;
      canvas.height = newRect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      particles.forEach(particle => {
        particle.centerX = newRect.width / 2;
        particle.centerY = newRect.height / 2;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" style={{ imageRendering: 'auto' }} />;
};

export default StormAnimation;