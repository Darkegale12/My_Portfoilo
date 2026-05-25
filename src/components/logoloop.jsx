import React, { useEffect, useRef, useState } from "react";

/* Inject CSS automatically */
const styles = `
.logoloop{
  position:relative;
  overflow:hidden;
  width:100%;
}

.logoloop__track{
  display:flex;
  width:max-content;
  will-change:transform;
}

.logoloop__item{
  flex:0 0 auto;
  margin-right:40px;
  font-size:40px;
}

.logoloop__item img{
  height:50px;
  width:auto;
  object-fit:contain;
}

.logoloop__fade:before,
.logoloop__fade:after{
  content:'';
  position:absolute;
  top:0;
  bottom:0;
  width:80px;
  pointer-events:none;
  z-index:10;
}

.logoloop__fade:before{
  left:0;
  background:linear-gradient(to right,var(--bg-secondary, #111),transparent);
}

.logoloop__fade:after{
  right:0;
  background:linear-gradient(to left,var(--bg-secondary, #111),transparent);
}

.logoloop__item:hover{
  transform:scale(1.2);
  transition:0.3s;
}
`;

if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.appendChild(style);
}

export default function LogoLoop({
    logos = [],
    speed = 80,
    direction = "left",
    gap = 40,
    fadeOut = true
}) {
    const trackRef = useRef(null);
    const offsetRef = useRef(0);
    const rafRef = useRef(null);
    const lastTimeRef = useRef(null);
    const singleSetWidthRef = useRef(0);

    const velocity = direction === "left" ? speed : -speed;

    // Measure the width of one full set of logos so we know when to wrap
    useEffect(() => {
        if (trackRef.current) {
            const items = trackRef.current.children;
            const oneSetCount = logos.length;
            let width = 0;
            for (let i = 0; i < oneSetCount && i < items.length; i++) {
                width += items[i].offsetWidth + gap;
            }
            singleSetWidthRef.current = width;
        }
    }, [logos, gap]);

    const animate = (time) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;

        const dt = (time - lastTimeRef.current) / 1000;
        lastTimeRef.current = time;

        offsetRef.current += velocity * dt;

        // Seamless wrap: reset offset once we've scrolled past one full set
        const setW = singleSetWidthRef.current;
        if (setW > 0) {
            if (direction === "left" && offsetRef.current >= setW) {
                offsetRef.current -= setW;
            } else if (direction === "right" && offsetRef.current <= -setW) {
                offsetRef.current += setW;
            }
        }

        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
        }

        rafRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // Render 3 copies for seamless visual buffer
    const repeated = [...logos, ...logos, ...logos];

    return (
        <div className={`logoloop ${fadeOut ? "logoloop__fade" : ""}`}>
            <div className="logoloop__track" ref={trackRef}>
                {repeated.map((logo, i) => (
                    <div className="logoloop__item" key={i} style={{ marginRight: gap }}>
                        {logo}
                    </div>
                ))}
            </div>
        </div>
    );
}