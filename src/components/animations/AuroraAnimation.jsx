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

    // Perlin-like noise function for natural randomness
    class PerlinNoise {
      constructor() {
        this.gradients = {};
        this.memory = {};
      }

      rand_vect() {
        const theta = Math.random() * 2 * Math.PI;
        return { x: Math.cos(theta), y: Math.sin(theta) };
      }

      dot_prod_grid(x, y, vx, vy) {
        let g_vect;
        const d_vect = { x: x - vx, y: y - vy };
        const grid_key = `${vx},${vy}`;

        if (this.gradients[grid_key]) {
          g_vect = this.gradients[grid_key];
        } else {
          g_vect = this.rand_vect();
          this.gradients[grid_key] = g_vect;
        }

        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
      }

      smootherstep(x) {
        return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
      }

      interp(x, a, b) {
        return a + this.smootherstep(x) * (b - a);
      }

      get(x, y) {
        const mem_key = `${x},${y}`;
        if (this.memory[mem_key]) {
          return this.memory[mem_key];
        }

        const xf = Math.floor(x);
        const yf = Math.floor(y);

        const tl = this.dot_prod_grid(x, y, xf, yf);
        const tr = this.dot_prod_grid(x, y, xf + 1, yf);
        const bl = this.dot_prod_grid(x, y, xf, yf + 1);
        const br = this.dot_prod_grid(x, y, xf + 1, yf + 1);

        const xt = this.interp(x - xf, tl, tr);
        const xb = this.interp(x - xf, bl, br);
        const v = this.interp(y - yf, xt, xb);

        this.memory[mem_key] = v;
        return v;
      }

      octaveNoise(x, y, octaves, persistence) {
        let total = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0;

        for (let i = 0; i < octaves; i++) {
          total += this.get(x * frequency, y * frequency) * amplitude;
          maxValue += amplitude;
          amplitude *= persistence;
          frequency *= 2;
        }

        return total / maxValue;
      }
    }

    const noise = new PerlinNoise();

    // Enhanced aurora curtains with realistic physics
    const auroraCurtains = [
      {
        baseColor: { r: 85, g: 255, b: 145 },
        accentColor: { r: 120, g: 255, b: 200 },
        edgeColor: { r: 40, g: 180, b: 90 },
        position: 0.25,
        width: 0.35,
        speed: 0.008,
        turbulence: 0.6,
        intensity: 0.95,
        energyWaves: [],
        breathPhase: 0,
        breathSpeed: 0.015
      },
      {
        baseColor: { r: 180, g: 255, b: 220 },
        accentColor: { r: 140, g: 240, b: 200 },
        edgeColor: { r: 80, g: 180, b: 140 },
        position: 0.6,
        width: 0.4,
        speed: 0.006,
        turbulence: 0.5,
        intensity: 0.85,
        energyWaves: [],
        breathPhase: Math.PI / 2,
        breathSpeed: 0.012
      },
      {
        baseColor: { r: 255, g: 100, b: 150 },
        accentColor: { r: 255, g: 160, b: 200 },
        edgeColor: { r: 180, g: 50, b: 90 },
        position: 0.15,
        width: 0.25,
        speed: 0.007,
        turbulence: 0.7,
        intensity: 0.65,
        energyWaves: [],
        breathPhase: Math.PI,
        breathSpeed: 0.018
      },
      {
        baseColor: { r: 150, g: 120, b: 255 },
        accentColor: { r: 200, g: 170, b: 255 },
        edgeColor: { r: 90, g: 60, b: 180 },
        position: 0.78,
        width: 0.28,
        speed: 0.009,
        turbulence: 0.55,
        intensity: 0.75,
        energyWaves: [],
        breathPhase: Math.PI * 1.5,
        breathSpeed: 0.014
      }
    ];

    // Initialize energy waves
    auroraCurtains.forEach(curtain => {
      for (let i = 0; i < 3; i++) {
        curtain.energyWaves.push({
          position: Math.random(),
          speed: 0.002 + Math.random() * 0.003,
          intensity: 0.3 + Math.random() * 0.4,
          width: 0.1 + Math.random() * 0.15
        });
      }
    });

    // Enhanced star field with depth layers
    const stars = [];
    const starCount = isMobile ? 120 : 220;
    for (let i = 0; i < starCount; i++) {
      const depth = Math.random();
      stars.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height * 0.65,
        size: Math.random() * 1.8 + 0.2,
        brightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.006,
        twinklePhase: Math.random() * Math.PI * 2,
        depth: depth,
        baseOpacity: 0.3 + depth * 0.7
      });
    }

    // Advanced particle system with multiple types
    const particles = {
      shimmer: [],
      energy: [],
      rays: []
    };

    // Shimmer particles
    const shimmerCount = isMobile ? 60 : 120;
    for (let i = 0; i < shimmerCount; i++) {
      particles.shimmer.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.5 + 0.2),
        size: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.6 + 0.3,
        life: Math.random() * 200 + 100,
        maxLife: 300,
        color: Math.random() > 0.5 ?
          { r: 120, g: 255, b: 180 } :
          { r: 180, g: 200, b: 255 },
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05
      });
    }

    // Energy burst particles
    const energyCount = isMobile ? 20 : 40;
    for (let i = 0; i < energyCount; i++) {
      particles.energy.push({
        x: Math.random() * rect.width,
        y: rect.height * 0.3 + Math.random() * rect.height * 0.4,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 0.8 + 0.3),
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.7 + 0.3,
        life: 0,
        maxLife: Math.random() * 100 + 80,
        color: { r: 150, g: 255, b: 200 },
        trail: []
      });
    }

    // Vertical ray particles (shooting upward energy)
    const rayCount = isMobile ? 3 : 6;
    for (let i = 0; i < rayCount; i++) {
      particles.rays.push({
        x: Math.random() * rect.width,
        y: rect.height,
        height: 0,
        maxHeight: rect.height * (0.4 + Math.random() * 0.4),
        speed: 2 + Math.random() * 3,
        width: 1 + Math.random() * 2,
        opacity: 0,
        active: false,
        cooldown: Math.random() * 300,
        color: Math.random() > 0.5 ?
          { r: 120, g: 255, b: 180 } :
          { r: 255, g: 180, b: 200 }
      });
    }

    // Draw realistic aurora curtain with Perlin noise
    const drawRealisticAurora = (curtain, time) => {
      const startX = rect.width * curtain.position;
      const curtainWidth = rect.width * curtain.width;
      const columns = isMobile ? 60 : 100;
      const columnWidth = curtainWidth / columns;

      // Breathing effect
      curtain.breathPhase += curtain.breathSpeed;
      const breath = Math.sin(curtain.breathPhase) * 0.2 + 1;

      // Update energy waves
      curtain.energyWaves.forEach(wave => {
        wave.position += wave.speed;
        if (wave.position > 1.2) wave.position = -0.2;
      });

      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < columns; i++) {
        const x = startX + i * columnWidth;
        const normalizedX = i / columns;

        // Multi-octave Perlin noise for natural movement
        const noiseX = normalizedX * 3 + time * curtain.speed;
        const noiseY = time * curtain.speed * 0.5;
        const perlinValue = noise.octaveNoise(noiseX, noiseY, 4, 0.5);

        // Complex wave motion
        const waveOffset = perlinValue * 80 * curtain.turbulence * breath;
        const verticalWave = Math.sin(normalizedX * Math.PI * 2.5 + time * 0.02) * 35 * breath;

        const columnX = x + waveOffset;
        const baseTop = rect.height * 0.1;
        const columnTop = baseTop + verticalWave;

        // Dynamic height variation with noise
        const heightNoise = noise.octaveNoise(normalizedX * 2, time * 0.01, 3, 0.6);
        const heightMod = 0.7 + heightNoise * 0.3;
        const columnHeight = rect.height * 0.7 * heightMod * breath;

        // Edge fading for natural curtain shape
        const edgeFade = Math.pow(Math.sin(normalizedX * Math.PI), 0.8);

        // Energy wave interference
        let waveIntensity = 1;
        curtain.energyWaves.forEach(wave => {
          const distance = Math.abs(normalizedX - wave.position);
          if (distance < wave.width) {
            const wavePulse = Math.cos((distance / wave.width) * Math.PI) * 0.5 + 0.5;
            waveIntensity += wavePulse * wave.intensity;
          }
        });
        waveIntensity = Math.min(waveIntensity, 1.5);

        // Create multi-stop gradient with realistic color mixing
        const gradient = ctx.createLinearGradient(columnX, columnTop, columnX, columnTop + columnHeight);

        const topAlpha = curtain.intensity * 0.2 * edgeFade * waveIntensity;
        const midTopAlpha = curtain.intensity * 1.0 * edgeFade * waveIntensity;
        const midAlpha = curtain.intensity * 0.85 * edgeFade * waveIntensity;
        const midBotAlpha = curtain.intensity * 0.5 * edgeFade * waveIntensity;
        const botAlpha = curtain.intensity * 0.05 * edgeFade;

        gradient.addColorStop(0,
          `rgba(${curtain.accentColor.r}, ${curtain.accentColor.g}, ${curtain.accentColor.b}, ${topAlpha})`
        );
        gradient.addColorStop(0.15,
          `rgba(${curtain.baseColor.r}, ${curtain.baseColor.g}, ${curtain.baseColor.b}, ${midTopAlpha})`
        );
        gradient.addColorStop(0.4,
          `rgba(${curtain.baseColor.r}, ${curtain.baseColor.g}, ${curtain.baseColor.b}, ${midAlpha})`
        );
        gradient.addColorStop(0.7,
          `rgba(${curtain.edgeColor.r}, ${curtain.edgeColor.g}, ${curtain.edgeColor.b}, ${midBotAlpha})`
        );
        gradient.addColorStop(1,
          `rgba(${curtain.edgeColor.r}, ${curtain.edgeColor.g}, ${curtain.edgeColor.b}, ${botAlpha})`
        );

        ctx.fillStyle = gradient;
        ctx.fillRect(columnX - columnWidth * 0.6, columnTop, columnWidth * 1.4, columnHeight);

        // Add intense glow for energy waves
        if (waveIntensity > 1.1) {
          const glowStrength = (waveIntensity - 1) * 2;
          ctx.shadowBlur = 40 * glowStrength;
          ctx.shadowColor = `rgba(${curtain.baseColor.r}, ${curtain.baseColor.g}, ${curtain.baseColor.b}, ${0.8 * glowStrength})`;
          ctx.fillRect(
            columnX - columnWidth * 0.6,
            columnTop + columnHeight * 0.3,
            columnWidth * 1.4,
            columnHeight * 0.25
          );
          ctx.shadowBlur = 0;
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    const animate = () => {
      // Deep space background with subtle gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, rect.height);
      bgGradient.addColorStop(0, 'rgb(2, 5, 12)');
      bgGradient.addColorStop(0.5, 'rgb(5, 8, 15)');
      bgGradient.addColorStop(1, 'rgb(8, 12, 20)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Atmospheric glow layer
      const atmosphereGradient = ctx.createRadialGradient(
        rect.width / 2, rect.height * 0.25, 0,
        rect.width / 2, rect.height * 0.25, rect.height * 0.9
      );
      atmosphereGradient.addColorStop(0, 'rgba(20, 50, 40, 0.15)');
      atmosphereGradient.addColorStop(0.5, 'rgba(15, 30, 25, 0.08)');
      atmosphereGradient.addColorStop(1, 'rgba(5, 8, 15, 0)');
      ctx.fillStyle = atmosphereGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw star field with depth and enhanced twinkling
      stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const brightness = star.baseOpacity * (star.brightness * twinkle);

        const starSize = star.size * (0.7 + star.depth * 0.3);

        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, starSize, 0, Math.PI * 2);
        ctx.fill();

        // Strong stars get glow
        if (brightness > 0.7) {
          ctx.shadowBlur = 6 * star.depth;
          ctx.shadowColor = `rgba(200, 220, 255, ${brightness * 0.8})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw aurora curtains with realistic rendering
      auroraCurtains.forEach(curtain => {
        drawRealisticAurora(curtain, time);
      });

      // Draw shimmer particles
      particles.shimmer.forEach(particle => {
        particle.life--;
        particle.rotation += particle.rotationSpeed;

        if (particle.life <= 0) {
          particle.x = Math.random() * rect.width;
          particle.y = rect.height * 0.8 + Math.random() * rect.height * 0.2;
          particle.vx = (Math.random() - 0.5) * 0.3;
          particle.vy = -(Math.random() * 0.5 + 0.2);
          particle.life = Math.random() * 200 + 100;
          particle.opacity = Math.random() * 0.6 + 0.3;
        }

        const lifeFade = Math.sin((particle.life / particle.maxLife) * Math.PI);
        const opacity = particle.opacity * lifeFade;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`
        );
        gradient.addColorStop(0.4,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity * 0.6})`
        );
        gradient.addColorStop(1,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`
        );

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Physics with turbulence
        const turbulence = noise.octaveNoise(particle.x * 0.01, time * 0.1, 2, 0.5);
        particle.x += particle.vx + turbulence * 0.3;
        particle.y += particle.vy;
        particle.vx += (Math.random() - 0.5) * 0.01;

        if (particle.x < -20) particle.x = rect.width + 20;
        if (particle.x > rect.width + 20) particle.x = -20;
        if (particle.y < -20) particle.life = 0;
      });

      // Draw energy burst particles with trails
      particles.energy.forEach(particle => {
        particle.life++;

        if (particle.life >= particle.maxLife) {
          particle.x = Math.random() * rect.width;
          particle.y = rect.height * 0.3 + Math.random() * rect.height * 0.4;
          particle.vx = (Math.random() - 0.5) * 0.8;
          particle.vy = -(Math.random() * 0.8 + 0.3);
          particle.life = 0;
          particle.trail = [];
        }

        const lifeFactor = 1 - (particle.life / particle.maxLife);
        const opacity = particle.opacity * lifeFactor;

        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: opacity });
        if (particle.trail.length > 8) particle.trail.shift();

        // Draw trail
        particle.trail.forEach((point, index) => {
          const trailOpacity = point.opacity * (index / particle.trail.length) * 0.5;
          ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${trailOpacity})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw main particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0,
          `rgba(255, 255, 255, ${opacity * 0.9})`
        );
        gradient.addColorStop(0.3,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`
        );
        gradient.addColorStop(1,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.01; // Gravity
      });

      // Draw vertical energy rays
      particles.rays.forEach(ray => {
        if (!ray.active) {
          ray.cooldown--;
          if (ray.cooldown <= 0) {
            ray.active = true;
            ray.height = 0;
            ray.opacity = 0.8;
            ray.x = Math.random() * rect.width;
            ray.y = rect.height * 0.4 + Math.random() * rect.height * 0.4;
          }
        } else {
          ray.height += ray.speed;
          ray.opacity -= 0.008;

          if (ray.height >= ray.maxHeight || ray.opacity <= 0) {
            ray.active = false;
            ray.cooldown = 200 + Math.random() * 300;
            ray.maxHeight = rect.height * (0.4 + Math.random() * 0.4);
          }

          const gradient = ctx.createLinearGradient(
            ray.x, ray.y, ray.x, ray.y - ray.height
          );
          gradient.addColorStop(0,
            `rgba(${ray.color.r}, ${ray.color.g}, ${ray.color.b}, 0)`
          );
          gradient.addColorStop(0.3,
            `rgba(${ray.color.r}, ${ray.color.g}, ${ray.color.b}, ${ray.opacity * 0.6})`
          );
          gradient.addColorStop(1,
            `rgba(${ray.color.r}, ${ray.color.g}, ${ray.color.b}, 0)`
          );

          ctx.fillStyle = gradient;
          ctx.fillRect(ray.x - ray.width, ray.y - ray.height, ray.width * 2, ray.height);

          // Glow effect
          ctx.shadowBlur = 20;
          ctx.shadowColor = `rgba(${ray.color.r}, ${ray.color.g}, ${ray.color.b}, ${ray.opacity * 0.6})`;
          ctx.fillRect(ray.x - ray.width * 0.5, ray.y - ray.height, ray.width, ray.height * 0.3);
          ctx.shadowBlur = 0;
        }
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