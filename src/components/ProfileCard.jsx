import React, { useEffect, useRef, useCallback, useMemo } from "react";

export default function ProfileCard({
    avatarUrl,
    name = "Javi A. Torres",
    title = "Software Engineer",
    handle = "javicodes",
    status = "Online",
    contactText = "Contact",
    showUserInfo = true,
    enableTilt = true,
    behindGlowEnabled = true,
    behindGlowColor = "rgba(125,190,255,0.67)",
    onContactClick
}) {

    const wrapRef = useRef(null);
    const shellRef = useRef(null);

    const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);

    const adjust = (v, fMin, fMax, tMin, tMax) =>
        tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin);

    const setVars = (x, y) => {
        const shell = shellRef.current;
        const wrap = wrapRef.current;
        if (!shell || !wrap) return;

        const width = shell.clientWidth;
        const height = shell.clientHeight;

        const percentX = clamp((100 / width) * x);
        const percentY = clamp((100 / height) * y);

        wrap.style.setProperty("--pointer-x", percentX + "%");
        wrap.style.setProperty("--pointer-y", percentY + "%");

        wrap.style.setProperty("--rotate-x", -(percentX - 50) / 5 + "deg");
        wrap.style.setProperty("--rotate-y", (percentY - 50) / 4 + "deg");

        wrap.style.setProperty("--background-x", adjust(percentX, 0, 100, 35, 65) + "%");
        wrap.style.setProperty("--background-y", adjust(percentY, 0, 100, 35, 65) + "%");
    };

    const handleMove = e => {
        if (!enableTilt) return;

        const shell = shellRef.current;
        const rect = shell.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setVars(x, y);
    };

    const handleLeave = () => {
        const shell = shellRef.current;
        const centerX = shell.clientWidth / 2;
        const centerY = shell.clientHeight / 2;
        setVars(centerX, centerY);
    };

    useEffect(() => {
        const shell = shellRef.current;

        if (enableTilt) {
            shell.addEventListener("pointermove", handleMove);
            shell.addEventListener("pointerleave", handleLeave);
        }

        return () => {
            shell.removeEventListener("pointermove", handleMove);
            shell.removeEventListener("pointerleave", handleLeave);
        }
    }, [enableTilt]);

    const cardStyle = useMemo(() => ({
        "--behind-glow-color": behindGlowColor
    }), [behindGlowColor])

    return (
        <>

            <style>{`

:root{
--pointer-x:50%;
--pointer-y:50%;
--rotate-x:0deg;
--rotate-y:0deg;
--background-x:50%;
--background-y:50%;
--card-radius:30px;
}

.pc-wrapper{
perspective:500px;
position:relative;
}

.pc-behind{
position:absolute;
inset:0;
background:radial-gradient(circle at var(--pointer-x) var(--pointer-y),
var(--behind-glow-color) 0%, transparent 60%);
filter:blur(60px);
}

.pc-card{
height:420px;
width:300px;
border-radius:var(--card-radius);
background:#111;
color:white;
overflow:hidden;
transform:rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
transition:transform .2s ease;
box-shadow:0 20px 60px rgba(0,0,0,.6);
position:relative;
}

.pc-avatar{
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
object-fit:cover;
}

.pc-details{
position:absolute;
top:30px;
width:100%;
text-align:center;
}

.pc-details h3{
margin:0;
font-size:32px;
background:linear-gradient(#fff,#8c8cff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.pc-details p{
margin-top:5px;
font-size:15px;
color:#bbb;
}

.pc-user-info{
position:absolute;
bottom:16px;
left:16px;
right:16px;
display:flex;
justify-content:space-between;
align-items:center;
background:rgba(0,0,0,.45);
backdrop-filter:blur(16px);
-webkit-backdrop-filter:blur(16px);
padding:10px 14px;
border-radius:12px;
border:1px solid rgba(255,255,255,.08);
}

.pc-info-text{
display:flex;
flex-direction:column;
gap:1px;
}

.pc-handle{
font-size:13px;
font-weight:600;
color:#fff;
letter-spacing:0.01em;
}

.pc-status{
font-size:11px;
color:rgba(255,255,255,.6);
font-weight:400;
}

.pc-social-icons{
display:flex;
gap:8px;
align-items:center;
}

.pc-social-icons a{
width:30px;
height:30px;
display:flex;
align-items:center;
justify-content:center;
border-radius:8px;
background:rgba(255,255,255,.1);
color:rgba(255,255,255,.75);
transition:all .2s ease;
text-decoration:none;
}

.pc-social-icons a:hover{
background:rgba(255,255,255,.22);
color:#fff;
transform:translateY(-1px);
}

.pc-social-icons svg{
width:15px;
height:15px;
}


`}</style>


            <div ref={wrapRef} className="pc-wrapper" style={cardStyle}>

                {behindGlowEnabled && <div className="pc-behind" />}

                <div ref={shellRef}>

                    <div className="pc-card">

                        <img className="pc-avatar" src={avatarUrl} alt="avatar" />

                        {showUserInfo && (

                            <div className="pc-user-info">

                                <div className="pc-info-text">
                                    <div className="pc-handle">@Vishwajeet12</div>
                                    <div className="pc-status">Open for opportunities</div>
                                </div>

                                <div className="pc-social-icons">
                                    <a href="https://www.linkedin.com/in/vishwajeet-more-68178a328/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                    </a>
                                    <a href="mailto:vishwajeet12.messi@gmail.com" title="Email">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    </a>
                                    <a href="https://github.com/Darkegale12" target="_blank" rel="noopener noreferrer" title="GitHub">
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                    </a>
                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </>
    );
}