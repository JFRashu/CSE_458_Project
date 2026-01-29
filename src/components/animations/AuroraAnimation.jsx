import { useRef, useEffect } from 'react';

const AuroraAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    let time = 0;
    const isMobile = window.innerWidth < 768;
    
    // Refined wave layers with elegant colors
    const waves = [
      { 
        color: { r: 134, g: 239, b: 172 }, 
        offset: 0, 
        speed: 0.012, 
        amplitude: isMobile ? 60 : 80,
        frequency: 0.003,
        opacity: 0.15
      },
      { 
        color: { r: 96, g: 165, b: 250 }, 
        offset: Math.PI / 3, 
        speed: 0.01, 
        amplitude: isMobile ? 70 : 90,
        frequency: 0.0035,
        opacity: 0.18
      },
      { 
        color: { r: 167, g: 139, b: 250 }, 
        offset: Math.PI / 1.5, 
        speed: 0.014, 
        amplitude: isMobile ? 65 : 85,
        frequency: 0.0032,
        opacity: 0.16
      },
      { 
        color: { r: 196, g: 181, b: 253 }, 
        offset: Math.PI / 2.5, 
        speed: 0.011, 
        amplitude: isMobile ? 55 : 75,
        frequency: 0.0038,
        opacity: 0.12
      }
    ];

    // Floating particles for added depth
    const particles = [];
    const particleCount = isMobile ? 25 : 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      // Elegant fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw aurora waves
      waves.forEach((wave) => {
        ctx.beginPath();
        const stepSize = isMobile ? 6 : 4;
        const baseY = rect.height / 2;
        
        for (let x = 0; x <= rect.width; x += stepSize) {
          const y = baseY +
            Math.sin(x * wave.frequency + time + wave.offset) * wave.amplitude +
            Math.sin(x * wave.frequency * 2 + time * 1.3) * (wave.amplitude * 0.4) +
            Math.cos(x * wave.frequency * 0.5 + time * 0.8) * (wave.amplitude * 0.3);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.lineTo(rect.width, rect.height);
        ctx.lineTo(0, rect.height);
        ctx.closePath();

        // Create gradient fill
        const gradient = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, rect.height);
        gradient.addColorStop(0, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.opacity})`);
        gradient.addColorStop(1, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.opacity * 0.3})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add subtle glow on top edge
        ctx.strokeStyle = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.opacity * 1.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        time += wave.speed;
      });

      // Draw floating particles
      particles.forEach(particle => {
        particle.pulsePhase += particle.pulseSpeed;
        const dynamicOpacity = particle.opacity * (0.7 + Math.sin(particle.pulsePhase) * 0.3);

        // Subtle glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `rgba(200, 220, 255, ${dynamicOpacity})`);
        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = rect.width;
        if (particle.x > rect.width) particle.x = 0;
        if (particle.y < 0) particle.y = rect.height;
        if (particle.y > rect.height) particle.y = 0;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" style={{ imageRendering: 'auto' }} />;
};

export default AuroraAnimation;