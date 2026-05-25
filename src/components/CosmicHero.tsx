import { useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import herosME from './herosME.png';
import './CosmicHero.css';

/* ================================================================
   TYPES
   ================================================================ */
interface Star { x: number; y: number; size: number; opacity: number; speed: number; phase: number; }
interface RingParticle { angle: number; radius: number; speed: number; size: number; brightness: number; lane: number; }
interface DustMote { x: number; y: number; vx: number; vy: number; size: number; opacity: number; hue: number; }

/* ================================================================
   CONFIG
   ================================================================ */
const PLANET_R_RATIO = 0.26;
const STAR_COUNT = 200;
const RING_PARTICLE_COUNT = 600;
const DUST_COUNT = 40;
const RING_TILT = 0.18;

/* ================================================================
   PARTICLE CREATION
   ================================================================ */
function makeStars(w: number, h: number): Star[] {
    return Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        size: Math.random() * 1.6 + 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.002 + 0.0005,
        phase: Math.random() * Math.PI * 2,
    }));
}

function makeRingParticles(pR: number): RingParticle[] {
    const particles: RingParticle[] = [];
    // Ring lanes spread much wider — like glowing dust trails
    const lanes = [
        { rMin: 1.12, rMax: 1.22, count: 60,  brightness: 0.8 },
        { rMin: 1.25, rMax: 1.45, count: 140, brightness: 1.0 },
        { rMin: 1.48, rMax: 1.70, count: 150, brightness: 0.85 },
        { rMin: 1.75, rMax: 1.90, count: 80,  brightness: 0.5 },
        { rMin: 1.95, rMax: 2.20, count: 100, brightness: 0.4 },
        { rMin: 2.25, rMax: 2.60, count: 70,  brightness: 0.2 },
    ];
    lanes.forEach((lane, li) => {
        for (let i = 0; i < lane.count; i++) {
            particles.push({
                angle: Math.random() * Math.PI * 2,
                radius: pR * (lane.rMin + Math.random() * (lane.rMax - lane.rMin)),
                speed: (0.0002 + Math.random() * 0.0005) * (Math.random() > 0.5 ? 1 : 0.97),
                size: Math.random() * 1.6 + 0.4,
                brightness: lane.brightness * (0.5 + Math.random() * 0.5),
                lane: li,
            });
        }
    });
    return particles;
}

function makeDust(w: number, h: number): DustMote[] {
    return Array.from({ length: DUST_COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.12 + 0.03,
        hue: Math.random() * 50 + 10,
    }));
}

/* ================================================================
   DRAW FUNCTIONS
   ================================================================ */

function drawBg(ctx: CanvasRenderingContext2D, w: number, h: number) {
    // Deep space
    const bg = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, w * 0.85);
    bg.addColorStop(0, '#100810');
    bg.addColorStop(0.4, '#080510');
    bg.addColorStop(1, '#020104');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Upper-left red/pink nebula
    const n1 = ctx.createRadialGradient(w * 0.08, h * 0.08, 0, w * 0.1, h * 0.1, w * 0.5);
    n1.addColorStop(0, 'rgba(180, 40, 30, 0.12)');
    n1.addColorStop(0.3, 'rgba(120, 30, 50, 0.07)');
    n1.addColorStop(0.6, 'rgba(60, 20, 60, 0.03)');
    n1.addColorStop(1, 'transparent');
    ctx.fillStyle = n1;
    ctx.fillRect(0, 0, w, h);

    // Lower-right warm nebula
    const n2 = ctx.createRadialGradient(w * 0.9, h * 0.85, 0, w * 0.85, h * 0.8, w * 0.5);
    n2.addColorStop(0, 'rgba(200, 60, 20, 0.08)');
    n2.addColorStop(0.4, 'rgba(140, 30, 15, 0.04)');
    n2.addColorStop(1, 'transparent');
    ctx.fillStyle = n2;
    ctx.fillRect(0, 0, w, h);

    // Center warm glow
    const n3 = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, w * 0.3);
    n3.addColorStop(0, 'rgba(200, 80, 30, 0.07)');
    n3.addColorStop(0.5, 'rgba(140, 40, 15, 0.03)');
    n3.addColorStop(1, 'transparent');
    ctx.fillStyle = n3;
    ctx.fillRect(0, 0, w, h);

    // Upper-right blue hint
    const n4 = ctx.createRadialGradient(w * 0.85, h * 0.1, 0, w * 0.85, h * 0.1, w * 0.35);
    n4.addColorStop(0, 'rgba(30, 50, 120, 0.06)');
    n4.addColorStop(0.5, 'rgba(20, 30, 80, 0.03)');
    n4.addColorStop(1, 'transparent');
    ctx.fillStyle = n4;
    ctx.fillRect(0, 0, w, h);
}

function drawStars(ctx: CanvasRenderingContext2D, stars: Star[], t: number) {
    for (const s of stars) {
        const a = s.opacity * (Math.sin(t * s.speed + s.phase) * 0.3 + 0.7);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
    }
}

function drawText(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, alpha: number) {
    if (alpha <= 0.01) return;
    ctx.save();
    const fs = w * 0.135;
    ctx.font = `900 ${fs}px 'Orbitron','Inter',sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Metallic gradient
    const g = ctx.createLinearGradient(cx - w * 0.42, cy, cx + w * 0.42, cy);
    g.addColorStop(0, `rgba(220,220,230,${0.45 * alpha})`);
    g.addColorStop(0.35, `rgba(180,180,195,${0.35 * alpha})`);
    g.addColorStop(0.65, `rgba(140,140,160,${0.25 * alpha})`);
    g.addColorStop(1, `rgba(110,110,130,${0.2 * alpha})`);
    ctx.fillStyle = g;
    ctx.shadowColor = `rgba(180,200,255,${0.1 * alpha})`;
    ctx.shadowBlur = 25;
    ctx.fillText('VISHWAJEET', cx, cy);
    ctx.shadowBlur = 0;
    ctx.fillText('VISHWAJEET', cx, cy);
    ctx.restore();
}

function drawPlanet(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number) {
    ctx.save();

    // Base sphere — vibrant warm gradient
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    const base = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.25, r * 0.05, cx + r * 0.1, cy + r * 0.1, r);
    base.addColorStop(0, '#ffe0a0');
    base.addColorStop(0.1, '#ffb050');
    base.addColorStop(0.25, '#e87830');
    base.addColorStop(0.4, '#d04a20');
    base.addColorStop(0.55, '#a83018');
    base.addColorStop(0.7, '#7a1a10');
    base.addColorStop(0.85, '#3a0a05');
    base.addColorStop(1, '#0a0200');
    ctx.fillStyle = base;
    ctx.fill();

    // Atmospheric bands — clipped to planet
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    const bands = [
        { y: -0.72, h: 0.09, c: [255, 230, 160], o: 0.06, s: 0.04 },
        { y: -0.55, h: 0.07, c: [255, 180, 80],  o: 0.08, s: 0.06 },
        { y: -0.38, h: 0.11, c: [240, 100, 50],  o: 0.10, s: 0.03 },
        { y: -0.18, h: 0.06, c: [255, 210, 130], o: 0.05, s: 0.07 },
        { y: -0.02, h: 0.13, c: [220, 70, 35],   o: 0.12, s: 0.05 },
        { y:  0.20, h: 0.08, c: [200, 50, 25],   o: 0.09, s: 0.04 },
        { y:  0.38, h: 0.10, c: [230, 110, 60],  o: 0.07, s: 0.06 },
        { y:  0.55, h: 0.08, c: [180, 40, 20],   o: 0.08, s: 0.05 },
        { y:  0.72, h: 0.10, c: [255, 160, 80],  o: 0.05, s: 0.03 },
    ];

    for (const b of bands) {
        const by = cy + b.y * r;
        const bh = b.h * r;
        const off = t * b.s;
        ctx.beginPath();
        ctx.moveTo(cx - r - 5, by);
        for (let x = cx - r - 5; x <= cx + r + 5; x += 4) {
            const w1 = Math.sin((x + off) * 0.01) * bh * 0.2 + Math.sin((x + off * 0.6) * 0.018) * bh * 0.08;
            ctx.lineTo(x, by + w1);
        }
        for (let x = cx + r + 5; x >= cx - r - 5; x -= 4) {
            const w1 = Math.sin((x + off * 0.8) * 0.013) * bh * 0.15;
            ctx.lineTo(x, by + bh + w1);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.o})`;
        ctx.fill();
    }

    // Hot streaks — flowing red/pink energy
    const streaks = [
        { y: -0.15, w: 0.7, c: 'rgba(255,100,50,0.12)', h: 8 },
        { y:  0.10, w: 0.5, c: 'rgba(255,60,30,0.10)',  h: 6 },
        { y:  0.35, w: 0.6, c: 'rgba(255,80,40,0.08)',  h: 10 },
        { y: -0.45, w: 0.4, c: 'rgba(255,200,100,0.06)', h: 5 },
    ];
    for (const s of streaks) {
        ctx.beginPath();
        const sy = cy + s.y * r;
        const sx = cx - s.w * r * 0.5 + Math.sin(t * 0.0003) * 15;
        ctx.moveTo(sx, sy);
        for (let i = 0; i <= 40; i++) {
            const p = i / 40;
            const px = sx + p * s.w * r;
            const py = sy + Math.sin(p * Math.PI * 4 + t * 0.0005) * s.h;
            ctx.lineTo(px, py);
        }
        ctx.strokeStyle = s.c;
        ctx.lineWidth = s.h;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    ctx.restore(); // end clip

    // Terminator shadow
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    const shad = ctx.createLinearGradient(cx - r, cy - r * 0.5, cx + r * 0.8, cy + r);
    shad.addColorStop(0, 'rgba(0,0,0,0)');
    shad.addColorStop(0.45, 'rgba(0,0,5,0.1)');
    shad.addColorStop(0.75, 'rgba(0,0,15,0.4)');
    shad.addColorStop(1, 'rgba(0,0,20,0.65)');
    ctx.fillStyle = shad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.restore();

    // Rim glow — diffused crescent on upper-left edge
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r + 1, -Math.PI * 0.7, -Math.PI * 0.2);
    ctx.strokeStyle = 'rgba(255,230,180,0.2)';
    ctx.lineWidth = 6;
    ctx.shadowColor = 'rgba(255,200,100,0.5)';
    ctx.shadowBlur = 35;
    ctx.stroke();
    // Second pass wider
    ctx.strokeStyle = 'rgba(255,210,150,0.08)';
    ctx.lineWidth = 16;
    ctx.shadowBlur = 50;
    ctx.stroke();
    ctx.restore();

    ctx.restore();
}

function drawRingDust(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number,
    pR: number,
    particles: RingParticle[],
    t: number,
    side: 'back' | 'front'
) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    for (const p of particles) {
        // Very slow orbit
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * RING_TILT;

        // Split front/back
        const inFront = Math.sin(p.angle) > 0;
        if ((side === 'front') !== inFront) continue;

        // Skip particles behind planet body
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy / (RING_TILT * RING_TILT));
        if (side === 'front' && dist < pR * 1.02) continue;

        // Twinkle
        const twinkle = Math.sin(t * 0.001 + p.angle * 3) * 0.25 + 0.75;
        const alpha = p.brightness * twinkle * 0.7;

        // Outer glow
        const gSize = p.size * 4;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, gSize);
        glow.addColorStop(0, `rgba(255,200,120,${alpha * 0.5})`);
        glow.addColorStop(0.3, `rgba(255,150,60,${alpha * 0.2})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(x - gSize, y - gSize, gSize * 2, gSize * 2);

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,200,${alpha})`;
        ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
}

function drawAtmGlow(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number, w: number, h: number) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const pulse = Math.sin(t * 0.0006) * 0.03 + 0.97;

    // Main ambient glow
    const g = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 2.5);
    g.addColorStop(0, `rgba(255,140,60,${0.12 * pulse})`);
    g.addColorStop(0.25, `rgba(255,80,30,${0.06 * pulse})`);
    g.addColorStop(0.5, `rgba(180,40,15,${0.03 * pulse})`);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Light-source flare
    const f = ctx.createRadialGradient(cx - r * 0.5, cy - r * 0.4, 0, cx - r * 0.5, cy - r * 0.4, r);
    f.addColorStop(0, 'rgba(255,230,180,0.14)');
    f.addColorStop(0.25, 'rgba(255,180,100,0.06)');
    f.addColorStop(1, 'transparent');
    ctx.fillStyle = f;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
}

function drawDust(ctx: CanvasRenderingContext2D, dust: DustMote[], w: number, h: number, t: number) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (const d of dust) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;
        const a = d.opacity * (Math.sin(t * 0.0008 + d.hue) * 0.3 + 0.7);
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size * 3);
        g.addColorStop(0, `hsla(${d.hue},70%,65%,${a})`);
        g.addColorStop(0.4, `hsla(${d.hue},50%,45%,${a * 0.25})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(d.x - d.size * 3, d.y - d.size * 3, d.size * 6, d.size * 6);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
}

/* ================================================================
   COMPONENT
   ================================================================ */
const CosmicHero = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const starsRef = useRef<Star[]>([]);
    const ringRef = useRef<RingParticle[]>([]);
    const dustRef = useRef<DustMote[]>([]);
    const dprRef = useRef(1);
    const t0Ref = useRef(0);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const imageY = useTransform(scrollYProgress, [0.25, 0.75], ['80%', '0%']);
    const imageOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
    const scrollHintOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

    const render = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = dprRef.current;
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        const cx = w / 2;
        const cy = h * 0.44;
        const t = performance.now() - t0Ref.current;
        const scroll = scrollYProgress.get();
        const planetCY = cy - scroll * h * 0.35;
        const pR = Math.min(w, h) * PLANET_R_RATIO;
        const textAlpha = Math.max(0, 1 - scroll * 0.8);

        ctx.save();
        ctx.scale(dpr, dpr);

        drawBg(ctx, w, h);
        drawStars(ctx, starsRef.current, t);
        drawDust(ctx, dustRef.current, w, h, t);
        drawText(ctx, cx, planetCY, w, textAlpha);

        // Back ring dust (behind planet)
        drawRingDust(ctx, cx, planetCY, pR, ringRef.current, t, 'back');

        // Planet
        drawPlanet(ctx, cx, planetCY, pR, t);

        // Front ring dust (in front of planet)
        drawRingDust(ctx, cx, planetCY, pR, ringRef.current, t, 'front');

        // Atmospheric glow
        drawAtmGlow(ctx, cx, planetCY, pR, t, w, h);

        ctx.restore();
        animRef.current = requestAnimationFrame(render);
    }, [scrollYProgress]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        dprRef.current = dpr;
        t0Ref.current = performance.now();

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            const w = rect.width, h = rect.height;
            const pR = Math.min(w, h) * PLANET_R_RATIO;
            starsRef.current = makeStars(w, h);
            ringRef.current = makeRingParticles(pR);
            dustRef.current = makeDust(w, h);
        };

        document.fonts.ready.then(() => {
            resize();
            animRef.current = requestAnimationFrame(render);
        });

        window.addEventListener('resize', resize);
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
    }, [render]);

    return (
        <section ref={sectionRef} className="cosmic-hero-section" id="hero">
            <div className="cosmic-hero-sticky">
                <canvas ref={canvasRef} className="cosmic-canvas" />
                <div className="cosmic-glow-overlay" />
                <motion.div className="cosmic-hero-image" style={{ y: imageY, opacity: imageOpacity }}>
                    <img src={herosME} alt="Vishwajeet More" />
                </motion.div>
                <div className="cosmic-bottom-fade" />
                <motion.div className="cosmic-scroll-hint" style={{ opacity: scrollHintOp }}>
                    <span>Scroll</span>
                    <div className="cosmic-scroll-line" />
                </motion.div>
            </div>
        </section>
    );
};

export default CosmicHero;
