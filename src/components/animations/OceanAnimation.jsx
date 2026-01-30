import { useRef, useEffect } from 'react';

const OceanAnimation = () => {
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

    const waveLayers = [
      { 
        heightMultiplier: 0.25, 
        speedMultiplier: 1.2, 
        yOffset: isMobile ? -120 : -160,
        opacity: 0.08
      },
      { 
        heightMultiplier: 0.3, 
        speedMultiplier: 1.0, 
        yOffset: isMobile ? -100 : -135,
        opacity: 0.1
      },
      { 
        heightMultiplier: 0.35, 
        speedMultiplier: 0.9, 
        yOffset: isMobile ? -80 : -110,
        opacity: 0.12
      },
      { 
        heightMultiplier: 0.4, 
        speedMultiplier: 0.8, 
        yOffset: isMobile ? -60 : -85,
        opacity: 0.14
      },
      { 
        heightMultiplier: 0.45, 
        speedMultiplier: 0.7, 
        yOffset: isMobile ? -40 : -60,
        opacity: 0.16
      }
    ];

    const foamParticles = [];
    const numFoam = isMobile ? 15 : 25;
    for (let i = 0; i < numFoam; i++) {
      foamParticles.push({
        x: Math.random() * rect.width,
        y: rect.height + (Math.random() * (isMobile ? 100 : 150)),
        size: Math.random() * (isMobile ? 2 : 3) + 1,
        speed: Math.random() * (isMobile ? 0.8 : 1.2) + 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        waveOffset: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 47, 73, 0.06)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      waveLayers.forEach((layer, layerIndex) => {
        ctx.beginPath();
        const waveHeight = (isMobile ? 45 : 60) * layer.heightMultiplier;
        const baseY = rect.height + layer.yOffset;

        const stepSize = isMobile ? 6 : 4;
        for (let x = 0; x <= rect.width; x += stepSize) {
          const y = baseY +
            Math.sin(x * 0.008 + time * layer.speedMultiplier + layerIndex * 0.4) * waveHeight * 0.4 +
            Math.sin(x * 0.004 + time * layer.speedMultiplier * 0.6) * waveHeight * 0.3 +
            Math.cos(x * 0.012 + time * layer.speedMultiplier * 0.8) * waveHeight * 0.2 +
            Math.sin(x * 0.002 + time * layer.speedMultiplier * 1.2) * waveHeight * 0.1;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(rect.width, rect.height);
        ctx.lineTo(0, rect.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, baseY - waveHeight, 0, rect.height);
        gradient.addColorStop(0, `rgba(96, 165, 250, ${layer.opacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(96, 165, 250, ${layer.opacity})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, ${layer.opacity * 0.8})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = `rgba(147, 197, 253, ${layer.opacity * 0.8})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      foamParticles.forEach((particle) => {
        particle.waveOffset += 0.03;
        const waveInfluence = Math.sin(particle.waveOffset) * (isMobile ? 8 : 12);
        
        const displayY = particle.y + waveInfluence;

        const outerGradient = ctx.createRadialGradient(
          particle.x, displayY, 0,
          particle.x, displayY, particle.size * 2.5
        );
        outerGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * 0.4})`);
        outerGradient.addColorStop(0.5, `rgba(255, 255, 255, ${particle.opacity * 0.2})`);
        outerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = outerGradient;
        ctx.beginPath();
        ctx.arc(particle.x, displayY, particle.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, displayY, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speed;
        
        if (particle.x > rect.width + 10) {
          particle.x = -10;
          particle.y = rect.height - (isMobile ? 120 : 160) + Math.random() * (isMobile ? 40 : 60);
          particle.size = Math.random() * (isMobile ? 2 : 3) + 1;
          particle.speed = Math.random() * (isMobile ? 0.8 : 1.2) + 0.5;
          particle.opacity = Math.random() * 0.4 + 0.2;
        }
      });

      if (Math.random() < 0.02) {
        const shimmerX = Math.random() * rect.width;
        const shimmerY = rect.height - (isMobile ? 90 : 120) + Math.random() * (isMobile ? 20 : 30);
        
        const shimmerGradient = ctx.createRadialGradient(
          shimmerX, shimmerY, 0,
          shimmerX, shimmerY, isMobile ? 15 : 25
        );
        shimmerGradient.addColorStop(0, 'rgba(147, 197, 253, 0.3)');
        shimmerGradient.addColorStop(1, 'rgba(147, 197, 253, 0)');
        
        ctx.fillStyle = shimmerGradient;
        ctx.beginPath();
        ctx.arc(shimmerX, shimmerY, isMobile ? 15 : 25, 0, Math.PI * 2);
        ctx.fill();
      }

      time += isMobile ? 0.012 : 0.015;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * devicePixelRatio;
      canvas.height = newRect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      foamParticles.forEach(particle => {
        particle.x = Math.random() * newRect.width;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" style={{ imageRendering: 'auto' }} />;
};

export default OceanAnimation;