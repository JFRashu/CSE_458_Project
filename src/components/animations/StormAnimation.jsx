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
    const particleCount = isMobile ? 150 : 220;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * (isMobile ? 120 : 180) + (isMobile ? 60 : 100);
      particles.push({
        x: rect.width / 2,
        y: rect.height / 2,
        angle: Math.random() * Math.PI * 2,
        radius: radius,
        speed: Math.random() * 0.012 + 0.008,
        size: Math.random() * (isMobile ? 1.5 : 2) + 0.8,
        opacity: Math.random() * 0.4 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        orbitSpeed: Math.random() * 0.008 + 0.004,
        centerX: rect.width / 2,
        centerY: rect.height / 2
      });
    }

    const animate = () => {
      // Elegant fade
      ctx.fillStyle = 'rgba(20, 20, 20, 0.03)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      particles.forEach(particle => {
        // Update angle and position
        particle.angle += particle.speed;
        particle.pulsePhase += particle.pulseSpeed;
        
        // Calculate spiral effect
        const radiusOffset = Math.sin(particle.pulsePhase) * (isMobile ? 15 : 25);
        const currentRadius = particle.radius + radiusOffset;
        
        particle.x = particle.centerX + Math.cos(particle.angle) * currentRadius;
        particle.y = particle.centerY + Math.sin(particle.angle) * currentRadius;

        // Dynamic opacity based on pulse
        const dynamicOpacity = particle.opacity * (0.8 + Math.sin(particle.pulsePhase) * 0.2);

        // Create elegant gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(251, 191, 36, ${dynamicOpacity})`);
        gradient.addColorStop(0.5, `rgba(251, 146, 60, ${dynamicOpacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow
        ctx.shadowBlur = isMobile ? 8 : 12;
        ctx.shadowColor = `rgba(251, 191, 36, ${dynamicOpacity * 0.5})`;
        ctx.fillStyle = `rgba(251, 191, 36, ${dynamicOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Update radius for spiral effect
        particle.radius += Math.sin(particle.angle * 2) * 0.3;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-75" style={{ imageRendering: 'auto' }} />;
};

export default StormAnimation;