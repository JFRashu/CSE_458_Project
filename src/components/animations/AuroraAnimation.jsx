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

    // More dynamic aurora curtains with breathing/pulsing animation
    const auroraCurtains = [
      {
        baseColor: { r: 80, g: 200, b: 120 },
        topColor: { r: 120, g: 255, b: 180 },
        bottomColor: { r: 40, g: 120, b: 80 },
        position: 0.3,
        width: 0.25,
        speed: 0.012,
        waveSpeed: 0.022,
        shimmerSpeed: 0.075,
        intensity: 0.85,
        verticalWaves: 3,
        horizontalWaves: 4,
        pulsePhase: 0,
        pulseSpeed: 0.025
      },
      {
        baseColor: { r: 140, g: 220, b: 140 },
        topColor: { r: 180, g: 255, b: 180 },
        bottomColor: { r: 80, g: 150, b: 100 },
        position: 0.55,
        width: 0.3,
        speed: 0.009,
        waveSpeed: 0.018,
        shimmerSpeed: 0.06,
        intensity: 0.75,
        verticalWaves: 4,
        horizontalWaves: 3,
        pulsePhase: Math.PI / 3,
        pulseSpeed: 0.02
      },
      {
        baseColor: { r: 220, g: 80, b: 100 },
        topColor: { r: 255, g: 120, b: 140 },
        bottomColor: { r: 140, g: 40, b: 60 },
        position: 0.15,
        width: 0.2,
        speed: 0.008,
        waveSpeed: 0.015,
        shimmerSpeed: 0.055,
        intensity: 0.5,
        verticalWaves: 2,
        horizontalWaves: 2,
        pulsePhase: Math.PI / 2,
        pulseSpeed: 0.018
      },
      {
        baseColor: { r: 140, g: 100, b: 200 },
        topColor: { r: 180, g: 140, b: 255 },
        bottomColor: { r: 80, g: 50, b: 140 },
        position: 0.75,
        width: 0.22,
        speed: 0.011,
        waveSpeed: 0.019,
        shimmerSpeed: 0.068,
        intensity: 0.65,
        verticalWaves: 3,
        horizontalWaves: 3,
        pulsePhase: Math.PI,
        pulseSpeed: 0.023
      },
      {
        baseColor: { r: 100, g: 180, b: 160 },
        topColor: { r: 140, g: 230, b: 210 },
        bottomColor: { r: 60, g: 100, b: 90 },
        position: 0.45,
        width: 0.18,
        speed: 0.01,
        waveSpeed: 0.016,
        shimmerSpeed: 0.062,
        intensity: 0.6,
        verticalWaves: 3,
        horizontalWaves: 4,
        pulsePhase: Math.PI * 1.5,
        pulseSpeed: 0.027
      }
    ];

    // Enhanced stars with better twinkling
    const stars = [];
    const starCount = isMobile ? 100 : 180;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height * 0.6,
        size: Math.random() * 1.6 + 0.3,
        brightness: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    // More dynamic shimmer particles
    const shimmerParticles = [];
    const shimmerCount = isMobile ? 50 : 100;
    for (let i = 0; i < shimmerCount; i++) {
      shimmerParticles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height * 0.8,
        vy: -(Math.random() * 0.4 + 0.15),
        vx: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        life: Math.random() * 220 + 130,
        maxLife: 350,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        color: Math.random() > 0.4 ? 
          { r: 120, g: 255, b: 180 } : 
          (Math.random() > 0.5 ? { r: 180, g: 140, b: 255 } : { r: 255, g: 200, b: 150 })
      });
    }

    const drawAuroraCurtain = (curtain, time) => {
      const startX = rect.width * curtain.position;
      const curtainWidth = rect.width * curtain.width;
      const columns = isMobile ? 50 : 90;
      const columnWidth = curtainWidth / columns;

      // Dynamic breathing/pulsing effect
      curtain.pulsePhase += curtain.pulseSpeed;
      const pulse = Math.sin(curtain.pulsePhase) * 0.25 + 1;

      for (let i = 0; i < columns; i++) {
        const x = startX + i * columnWidth;
        const normalizedX = i / columns;

        // Layered wave motion for more organic movement
        const primaryWave = Math.sin(normalizedX * Math.PI * curtain.verticalWaves + time * curtain.waveSpeed);
        const secondaryWave = Math.cos(normalizedX * Math.PI * (curtain.verticalWaves + 1) + time * curtain.waveSpeed * 1.3);
        const verticalWave = (primaryWave + secondaryWave * 0.5) * (isMobile ? 40 : 65) * pulse;
        
        const horizontalOffset = Math.sin(time * curtain.speed + normalizedX * Math.PI * 2) * 
                                 (isMobile ? 28 : 48) * pulse;
        
        // Multi-layered shimmer for more sparkle
        const shimmer1 = Math.sin(time * curtain.shimmerSpeed + normalizedX * Math.PI * 4) * 0.3 + 0.7;
        const shimmer2 = Math.cos(time * curtain.shimmerSpeed * 1.5 + normalizedX * Math.PI * 6) * 0.2 + 0.8;
        const shimmer = (shimmer1 + shimmer2) / 2;
        
        const heightVariation = Math.sin(normalizedX * Math.PI * curtain.horizontalWaves + time * 0.7) * 0.3 + 1;
        const columnHeight = (rect.height * 0.65) * heightVariation * pulse;

        const columnX = x + horizontalOffset;
        const columnTop = rect.height * 0.12 + verticalWave;
        const columnBottom = columnTop + columnHeight;

        const edgeFade = Math.sin(normalizedX * Math.PI);
        const intensityMod = shimmer * pulse;

        const gradient = ctx.createLinearGradient(columnX, columnTop, columnX, columnBottom);
        
        gradient.addColorStop(0, 
          `rgba(${curtain.topColor.r}, ${curtain.topColor.g}, ${curtain.topColor.b}, ${curtain.intensity * 0.35 * edgeFade * intensityMod})`
        );
        
        gradient.addColorStop(0.2, 
          `rgba(${curtain.baseColor.r}, ${curtain.baseColor.g}, ${curtain.baseColor.b}, ${curtain.intensity * 0.9 * edgeFade * intensityMod})`
        );
        
        gradient.addColorStop(0.5, 
          `rgba(${curtain.baseColor.r}, ${curtain.baseColor.g}, ${curtain.baseColor.b}, ${curtain.intensity * edgeFade * intensityMod})`
        );
        
        gradient.addColorStop(0.75, 
          `rgba(${curtain.bottomColor.r}, ${curtain.bottomColor.g}, ${curtain.bottomColor.b}, ${curtain.intensity * 0.65 * edgeFade * intensityMod})`
        );
        
        gradient.addColorStop(1, 
          `rgba(${curtain.bottomColor.r}, ${curtain.bottomColor.g}, ${curtain.bottomColor.b}, ${curtain.intensity * 0.12 * edgeFade})`
        );

        ctx.fillStyle = gradient;
        ctx.fillRect(columnX - columnWidth / 2, columnTop, columnWidth * 1.3, columnHeight);

        // Enhanced glow
        if (shimmer > 0.7) {
          const glowIntensity = shimmer - 0.7;
          ctx.shadowBlur = 35 * glowIntensity * edgeFade;
          ctx.shadowColor = `rgba(${curtain.baseColor.r}, ${curtain.baseColor.g}, ${curtain.baseColor.b}, ${0.7 * glowIntensity})`;
          ctx.fillRect(columnX - columnWidth / 2, columnTop + columnHeight * 0.25, columnWidth * 1.3, columnHeight * 0.3);
          ctx.shadowBlur = 0;
        }
      }
    };

    const animate = () => {
      // Deep black space background
      ctx.fillStyle = 'rgb(5, 8, 15)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Subtle atmospheric glow
      const bgGradient = ctx.createRadialGradient(
        rect.width / 2, rect.height * 0.3, 0,
        rect.width / 2, rect.height * 0.3, rect.height * 0.8
      );
      bgGradient.addColorStop(0, 'rgba(20, 40, 30, 0.12)');
      bgGradient.addColorStop(1, 'rgba(5, 8, 15, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw stars with enhanced twinkling
      stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkleBrightness = star.brightness * (0.6 + Math.sin(star.twinklePhase) * 0.4);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkleBrightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (twinkleBrightness > 0.85) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(255, 255, 255, ${twinkleBrightness * 0.6})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw aurora curtains
      auroraCurtains.forEach(curtain => {
        drawAuroraCurtain(curtain, time);
      });

      // Draw and update shimmer particles with rotation
      shimmerParticles.forEach((particle) => {
        particle.life--;
        particle.rotation += particle.rotationSpeed;
        
        if (particle.life <= 0) {
          particle.x = Math.random() * rect.width;
          particle.y = rect.height * 0.7 + Math.random() * rect.height * 0.3;
          particle.vy = -(Math.random() * 0.4 + 0.15);
          particle.vx = (Math.random() - 0.5) * 0.25;
          particle.life = Math.random() * 220 + 130;
          particle.opacity = Math.random() * 0.5 + 0.2;
          particle.rotation = Math.random() * Math.PI * 2;
        }

        const lifeFade = Math.sin((particle.life / particle.maxLife) * Math.PI);
        const dynamicOpacity = particle.opacity * lifeFade;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3.5
        );
        gradient.addColorStop(0, 
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${dynamicOpacity})`
        );
        gradient.addColorStop(0.5, 
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${dynamicOpacity * 0.5})`
        );
        gradient.addColorStop(1, 
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`
        );

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Flowing sideways motion
        particle.x += particle.vx + Math.sin(time * 0.5 + particle.y * 0.01) * 0.15;
        particle.y += particle.vy;
        particle.vx += (Math.random() - 0.5) * 0.008;

        if (particle.x < -10) particle.x = rect.width + 10;
        if (particle.x > rect.width + 10) particle.x = -10;
        if (particle.y < -10) particle.life = 0;
      });

      time += 0.016;
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

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full" 
      style={{ imageRendering: 'auto' }} 
    />
  );
};

export default AuroraAnimation;