import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Alex Chen — Portfolio</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --apple-blue: #0071e3;
      --apple-blue-hover: #0077ed;
      --apple-dark: #1d1d1f;
      --apple-gray: #86868b;
      --apple-light: #f5f5f7;
      --apple-white: #ffffff;
      --apple-card: rgba(255,255,255,0.72);
      --apple-border: rgba(0,0,0,0.08);
      --transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
      background: #000;
      color: var(--apple-dark);
      overflow-x: hidden;
    }

    /* ─── NAVBAR ─── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 2rem; height: 52px;
      background: rgba(0, 0, 0, 0.72);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      transition: var(--transition);
    }
    nav .logo {
      font-size: 1.1rem; font-weight: 700; color: #fff;
      letter-spacing: -0.02em; text-decoration: none;
    }
    nav .logo span { color: var(--apple-blue); }
    nav ul { list-style: none; display: flex; gap: 2rem; }
    nav ul a {
      color: rgba(255,255,255,0.8); text-decoration: none;
      font-size: 0.85rem; font-weight: 400; letter-spacing: 0.01em;
      transition: color 0.2s;
    }
    nav ul a:hover { color: #fff; }
    nav .nav-cta {
      background: var(--apple-blue); color: #fff; border: none;
      padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.82rem;
      font-weight: 500; cursor: pointer; text-decoration: none;
      transition: var(--transition);
    }
    nav .nav-cta:hover { background: var(--apple-blue-hover); transform: scale(1.03); }

    /* ─── HERO ─── */
    #hero {
      min-height: 100vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: #000; position: relative; overflow: hidden;
      padding: 6rem 2rem 4rem;
    }
    .hero-bg {
      position: absolute; inset: 0; z-index: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,113,227,0.18) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 40% at 20% 80%, rgba(120,40,200,0.12) 0%, transparent 60%),
                  radial-gradient(ellipse 50% 40% at 80% 20%, rgba(0,200,150,0.08) 0%, transparent 60%);
    }
    .hero-grid {
      position: absolute; inset: 0; z-index: 0; opacity: 0.06;
      background-image: linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .hero-content { position: relative; z-index: 1; text-align: center; max-width: 780px; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
      color: rgba(255,255,255,0.75); font-size: 0.78rem; font-weight: 500;
      padding: 0.35rem 1rem; border-radius: 20px; margin-bottom: 1.5rem;
      backdrop-filter: blur(10px); letter-spacing: 0.04em; text-transform: uppercase;
    }
    .hero-badge i { color: #f5a623; font-size: 0.7rem; }
    .hero-name {
      font-size: clamp(3.5rem, 9vw, 7rem); font-weight: 900;
      color: #fff; line-height: 1; letter-spacing: -0.04em;
      margin-bottom: 0.3rem;
    }
    .hero-name .highlight {
      background: linear-gradient(135deg, #0071e3 0%, #a855f7 50%, #06b6d4 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-title {
      font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-weight: 300;
      color: rgba(255,255,255,0.55); margin-bottom: 1.6rem; letter-spacing: -0.01em;
    }
    .hero-title strong { color: rgba(255,255,255,0.9); font-weight: 500; }
    .hero-desc {
      font-size: 1rem; color: rgba(255,255,255,0.45); max-width: 480px;
      margin: 0 auto 2.5rem; line-height: 1.7; font-weight: 300;
    }
    .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-primary {
      background: var(--apple-blue); color: #fff; border: none;
      padding: 0.85rem 2rem; border-radius: 50px; font-size: 0.95rem;
      font-weight: 500; cursor: pointer; text-decoration: none;
      transition: var(--transition); display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn-primary:hover { background: var(--apple-blue-hover); transform: scale(1.03); box-shadow: 0 8px 30px rgba(0,113,227,0.4); }
    .btn-secondary {
      background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85);
      border: 1px solid rgba(255,255,255,0.15);
      padding: 0.85rem 2rem; border-radius: 50px; font-size: 0.95rem;
      font-weight: 500; cursor: pointer; text-decoration: none;
      transition: var(--transition); display: inline-flex; align-items: center; gap: 0.5rem;
      backdrop-filter: blur(10px);
    }
    .btn-secondary:hover { background: rgba(255,255,255,0.14); transform: scale(1.03); }
    .hero-scroll {
      position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
      color: rgba(255,255,255,0.3); font-size: 0.7rem; letter-spacing: 0.1em;
      text-transform: uppercase; z-index: 1;
      animation: float 2.5s ease-in-out infinite;
    }
    @keyframes float { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
    .hero-scroll i { font-size: 1rem; }

    /* ─── STATS BAR ─── */
    #stats {
      background: #111; border-top: 1px solid rgba(255,255,255,0.06);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 2.5rem 2rem;
    }
    .stats-grid {
      max-width: 900px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
    }
    .stat-item { text-align: center; }
    .stat-num {
      font-size: 2.2rem; font-weight: 800; color: #fff;
      letter-spacing: -0.04em; line-height: 1;
    }
    .stat-num span { color: var(--apple-blue); }
    .stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.4); margin-top: 0.3rem; letter-spacing: 0.02em; }

    /* ─── SECTIONS COMMON ─── */
    section { padding: 6rem 2rem; }
    .section-label {
      font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--apple-blue); margin-bottom: 0.8rem;
    }
    .section-title {
      font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800;
      letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 1.2rem;
    }
    .section-sub {
      font-size: 1rem; color: var(--apple-gray); line-height: 1.7; max-width: 540px; font-weight: 300;
    }
    .container { max-width: 1100px; margin: 0 auto; }

    /* ─── ABOUT ─── */
    #about { background: var(--apple-light); }
    .about-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
      max-width: 1000px; margin: 0 auto;
    }
    .about-avatar {
      position: relative; display: flex; justify-content: center;
    }
    .avatar-ring {
      width: 300px; height: 300px; border-radius: 50%;
      background: linear-gradient(135deg, #0071e3, #a855f7, #06b6d4);
      padding: 4px; flex-shrink: 0;
    }
    .avatar-inner {
      width: 100%; height: 100%; border-radius: 50%;
      background: linear-gradient(145deg, #1a1a2e, #16213e, #0f3460);
      display: flex; align-items: center; justify-content: center; font-size: 7rem;
      overflow: hidden; position: relative;
    }
    .avatar-emoji { font-size: 7rem; line-height: 1; user-select: none; }
    .avatar-badge {
      position: absolute; bottom: 10px; right: 10px;
      background: var(--apple-blue); color: #fff;
      width: 56px; height: 56px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; border: 3px solid var(--apple-light);
      box-shadow: 0 4px 20px rgba(0,113,227,0.4);
    }
    .about-text .tag-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.5rem 0; }
    .tag {
      background: #fff; border: 1px solid var(--apple-border);
      color: #555; padding: 0.3rem 0.8rem; border-radius: 20px;
      font-size: 0.78rem; font-weight: 500;
    }
    .about-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 1.5rem; }
    .about-card {
      background: #fff; border: 1px solid var(--apple-border);
      border-radius: 16px; padding: 1rem;
      display: flex; align-items: center; gap: 0.8rem;
      transition: var(--transition);
    }
    .about-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
    .about-card-icon {
      width: 36px; height: 36px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; flex-shrink: 0;
    }
    .about-card-text p { font-size: 0.7rem; color: var(--apple-gray); }
    .about-card-text strong { font-size: 0.85rem; color: var(--apple-dark); font-weight: 600; }

    /* ─── SKILLS ─── */
    #skills { background: #000; }
    #skills .section-title { color: #fff; }
    #skills .section-label { color: #0071e3; }
    #skills .section-sub { color: rgba(255,255,255,0.4); }
    .skills-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.2rem; margin-top: 3rem;
    }
    .skill-card {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px; padding: 1.6rem;
      transition: var(--transition); cursor: default;
    }
    .skill-card:hover {
      background: rgba(255,255,255,0.07); border-color: rgba(0,113,227,0.3);
      transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    }
    .skill-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .skill-icon {
      width: 44px; height: 44px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
    }
    .skill-header h3 { font-size: 1rem; font-weight: 600; color: #fff; }
    .skill-header p { font-size: 0.75rem; color: rgba(255,255,255,0.4); }
    .skill-bar-bg {
      height: 4px; background: rgba(255,255,255,0.08);
      border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;
    }
    .skill-bar { height: 100%; border-radius: 4px; transition: width 1.5s cubic-bezier(0.22,1,0.36,1); }
    .skill-pct { font-size: 0.72rem; color: rgba(255,255,255,0.4); text-align: right; }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem; }
    .skill-tag {
      font-size: 0.7rem; padding: 0.2rem 0.6rem; border-radius: 6px;
      background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5);
      border: 1px solid rgba(255,255,255,0.08);
    }

    /* ─── PROJECTS ─── */
    #projects { background: var(--apple-light); }
    .projects-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem; margin-top: 3rem;
    }
    .project-card {
      background: #fff; border-radius: 24px; overflow: hidden;
      border: 1px solid var(--apple-border); transition: var(--transition);
      cursor: pointer; text-decoration: none; display: block;
    }
    .project-card:hover { transform: translateY(-8px); box-shadow: 0 30px 70px rgba(0,0,0,0.12); }
    .project-card:hover .project-arrow { transform: translateX(4px); }
    .project-visual {
      height: 200px; display: flex; align-items: center; justify-content: center;
      font-size: 4rem; position: relative; overflow: hidden;
    }
    .project-body { padding: 1.5rem; }
    .project-cat {
      font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; margin-bottom: 0.5rem;
    }
    .project-body h3 { font-size: 1.1rem; font-weight: 700; color: var(--apple-dark); margin-bottom: 0.5rem; }
    .project-body p { font-size: 0.85rem; color: var(--apple-gray); line-height: 1.6; margin-bottom: 1rem; }
    .project-footer { display: flex; align-items: center; justify-content: space-between; }
    .project-techs { display: flex; gap: 0.4rem; flex-wrap: wrap; }
    .project-tech {
      font-size: 0.68rem; padding: 0.2rem 0.55rem; border-radius: 6px;
      background: var(--apple-light); color: #555; border: 1px solid var(--apple-border);
    }
    .project-arrow { color: var(--apple-blue); font-size: 0.9rem; transition: transform 0.3s ease; }

    /* ─── FEATURED PROJECT (big card) ─── */
    .project-featured {
      grid-column: 1 / -1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
      border-radius: 24px; overflow: hidden;
      border: 1px solid var(--apple-border);
      background: #fff; transition: var(--transition); cursor: pointer; text-decoration: none;
    }
    .project-featured:hover { transform: translateY(-6px); box-shadow: 0 30px 70px rgba(0,0,0,0.12); }
    .project-featured .project-visual { height: 100%; min-height: 260px; font-size: 6rem; }
    .project-featured .project-body { padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; }
    .project-featured .project-body h3 { font-size: 1.6rem; margin-bottom: 0.8rem; }
    .project-featured .project-body p { font-size: 0.95rem; }
    .featured-badge {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: linear-gradient(135deg, #0071e3, #a855f7);
      color: #fff; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em;
      text-transform: uppercase; padding: 0.3rem 0.8rem; border-radius: 20px;
      margin-bottom: 1rem;
    }

    /* ─── INTERESTS ─── */
    #interests { background: #000; }
    #interests .section-title { color: #fff; }
    #interests .section-label { color: #0071e3; }
    #interests .section-sub { color: rgba(255,255,255,0.4); }
    .interests-bento {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto;
      gap: 1rem; margin-top: 3rem;
    }
    .bento-card {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px; padding: 2rem;
      transition: var(--transition); cursor: default; overflow: hidden; position: relative;
    }
    .bento-card:hover { background: rgba(255,255,255,0.07); transform: scale(1.02); }
    .bento-card.tall { grid-row: span 2; }
    .bento-card.wide { grid-column: span 2; }
    .bento-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .bento-card h3 { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
    .bento-card p { font-size: 0.85rem; color: rgba(255,255,255,0.45); line-height: 1.6; }
    .bento-glow {
      position: absolute; width: 120px; height: 120px; border-radius: 50%;
      filter: blur(40px); opacity: 0.3; top: -20px; right: -20px;
    }
    .bento-list { list-style: none; margin-top: 0.8rem; display: flex; flex-direction: column; gap: 0.4rem; }
    .bento-list li {
      font-size: 0.82rem; color: rgba(255,255,255,0.55);
      display: flex; align-items: center; gap: 0.5rem;
    }
    .bento-list li::before { content: '→'; color: var(--apple-blue); font-weight: 600; }

    /* ─── TIMELINE ─── */
    #timeline { background: var(--apple-light); }
    .timeline { max-width: 680px; margin: 3rem auto 0; position: relative; }
    .timeline::before {
      content: ''; position: absolute; left: 28px; top: 0; bottom: 0; width: 1px;
      background: linear-gradient(to bottom, var(--apple-blue), #a855f7, transparent);
    }
    .timeline-item { display: flex; gap: 1.5rem; margin-bottom: 2.5rem; }
    .timeline-dot {
      width: 56px; height: 56px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; border: 2px solid #fff; box-shadow: 0 4px 14px rgba(0,0,0,0.1);
      position: relative; z-index: 1; background: #fff;
    }
    .timeline-content {
      background: #fff; border: 1px solid var(--apple-border);
      border-radius: 16px; padding: 1.2rem 1.4rem;
      flex: 1; transition: var(--transition);
    }
    .timeline-content:hover { transform: translateX(4px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
    .timeline-date { font-size: 0.7rem; color: var(--apple-blue); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.3rem; }
    .timeline-content h3 { font-size: 1rem; font-weight: 700; color: var(--apple-dark); }
    .timeline-content p { font-size: 0.83rem; color: var(--apple-gray); margin-top: 0.3rem; line-height: 1.6; }

    /* ─── CONTACT ─── */
    #contact { background: #000; }
    .contact-inner {
      max-width: 680px; margin: 0 auto; text-align: center;
    }
    #contact .section-title { color: #fff; }
    #contact .section-label { color: #0071e3; }
    #contact .section-sub { color: rgba(255,255,255,0.4); margin: 0 auto 3rem; }
    .contact-links { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3rem; }
    .contact-link {
      display: flex; align-items: center; gap: 0.7rem;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.8); text-decoration: none;
      padding: 0.9rem 1.5rem; border-radius: 16px; font-size: 0.9rem; font-weight: 500;
      transition: var(--transition); backdrop-filter: blur(10px);
    }
    .contact-link:hover { background: rgba(255,255,255,0.1); transform: translateY(-3px); border-color: rgba(255,255,255,0.2); }
    .contact-link i { font-size: 1.1rem; }
    .contact-form {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px; padding: 2.5rem; text-align: left;
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
    .form-group label { font-size: 0.78rem; color: rgba(255,255,255,0.5); font-weight: 500; }
    .form-group input, .form-group textarea {
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      color: #fff; padding: 0.8rem 1rem; border-radius: 12px;
      font-family: inherit; font-size: 0.9rem; outline: none;
      transition: border-color 0.2s;
    }
    .form-group input:focus, .form-group textarea:focus { border-color: var(--apple-blue); }
    .form-group textarea { resize: vertical; min-height: 100px; }
    .form-group input::placeholder, .form-group textarea::placeholder { color: rgba(255,255,255,0.25); }
    .form-submit {
      width: 100%; padding: 0.9rem; background: var(--apple-blue); color: #fff;
      border: none; border-radius: 12px; font-size: 0.95rem; font-weight: 600;
      cursor: pointer; transition: var(--transition); font-family: inherit;
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    }
    .form-submit:hover { background: var(--apple-blue-hover); transform: scale(1.02); }

    /* ─── FOOTER ─── */
    footer {
      background: #000; border-top: 1px solid rgba(255,255,255,0.06);
      padding: 2.5rem 2rem; text-align: center;
    }
    footer p { font-size: 0.78rem; color: rgba(255,255,255,0.25); }
    footer span { color: rgba(255,255,255,0.5); }
    .footer-heart { color: #e44; }

    /* ─── SCROLL ANIMATIONS ─── */
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: none; }

    /* ─── MOBILE ─── */
    @media (max-width: 768px) {
      nav ul { display: none; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .about-grid { grid-template-columns: 1fr; gap: 2rem; }
      .about-avatar { order: -1; }
      .avatar-ring { width: 200px; height: 200px; }
      .avatar-emoji { font-size: 5rem; }
      .project-featured { grid-template-columns: 1fr; }
      .project-featured .project-visual { min-height: 160px; }
      .interests-bento { grid-template-columns: 1fr; }
      .bento-card.wide, .bento-card.tall { grid-column: span 1; grid-row: span 1; }
      .form-row { grid-template-columns: 1fr; }
      .about-cards { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

<!-- NAVBAR -->
<nav id="navbar">
  <a href="#hero" class="logo">Alex<span>.</span></a>
  <ul>
    <li><a href="#about">About</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#interests">Interests</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <a href="#contact" class="nav-cta">Say Hello 👋</a>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="hero-content">
    <div class="hero-badge">
      <i class="fas fa-star"></i>
      Year 10 Student &amp; Creator
    </div>
    <h1 class="hero-name">
      Alex<br/><span class="highlight">Chen.</span>
    </h1>
    <p class="hero-title">
      <strong>Coder</strong> · Designer · <strong>Future Innovator</strong>
    </p>
    <p class="hero-desc">
      A 15-year-old passionate about technology, creativity and making things
      that actually work. Building cool stuff one project at a time.
    </p>
    <div class="hero-btns">
      <a href="#projects" class="btn-primary">
        <i class="fas fa-folder-open"></i> View My Work
      </a>
      <a href="#contact" class="btn-secondary">
        <i class="fas fa-paper-plane"></i> Get In Touch
      </a>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <i class="fas fa-chevron-down"></i>
  </div>
</section>

<!-- STATS -->
<section id="stats">
  <div class="stats-grid">
    <div class="stat-item reveal">
      <div class="stat-num">12<span>+</span></div>
      <div class="stat-label">Projects Completed</div>
    </div>
    <div class="stat-item reveal">
      <div class="stat-num">6<span>+</span></div>
      <div class="stat-label">Programming Languages</div>
    </div>
    <div class="stat-item reveal">
      <div class="stat-num">3<span>×</span></div>
      <div class="stat-label">Competition Wins</div>
    </div>
    <div class="stat-item reveal">
      <div class="stat-num">1<span>k+</span></div>
      <div class="stat-label">Lines of Code Written</div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section id="about">
  <div class="container">
    <div class="about-grid">
      <div class="about-avatar reveal">
        <div class="avatar-ring">
          <div class="avatar-inner">
            <span class="avatar-emoji">🧑‍💻</span>
          </div>
        </div>
        <div class="avatar-badge">✨</div>
      </div>
      <div class="about-text reveal">
        <p class="section-label">About Me</p>
        <h2 class="section-title">Hi, I'm Alex — <br/>I build things.</h2>
        <p class="section-sub">
          I'm a Year 10 student at Westside High School with a huge passion
          for coding, design and problem-solving. When I'm not at school, you'll
          find me working on side projects, exploring new technologies or competing
          in hackathons.
        </p>
        <div class="tag-row">
          <span class="tag">🎓 Year 10</span>
          <span class="tag">📍 Sydney, Australia</span>
          <span class="tag">💻 CS Enthusiast</span>
          <span class="tag">🎨 UI/UX Fan</span>
          <span class="tag">🎮 Game Dev Hobbyist</span>
          <span class="tag">♟️ Chess Club</span>
        </div>
        <div class="about-cards">
          <div class="about-card">
            <div class="about-card-icon" style="background:#e8f4ff;">🏫</div>
            <div class="about-card-text">
              <p>School</p>
              <strong>Westside High</strong>
            </div>
          </div>
          <div class="about-card">
            <div class="about-card-icon" style="background:#f0fff4;">📚</div>
            <div class="about-card-text">
              <p>Favourite Subject</p>
              <strong>Computer Science</strong>
            </div>
          </div>
          <div class="about-card">
            <div class="about-card-icon" style="background:#fff8e8;">🏆</div>
            <div class="about-card-text">
              <p>Top Achievement</p>
              <strong>State Coding Comp</strong>
            </div>
          </div>
          <div class="about-card">
            <div class="about-card-icon" style="background:#fdf4ff;">🚀</div>
            <div class="about-card-text">
              <p>Dream Career</p>
              <strong>Software Engineer</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SKILLS -->
<section id="skills">
  <div class="container">
    <p class="section-label reveal">What I Know</p>
    <h2 class="section-title reveal">My Skills</h2>
    <p class="section-sub reveal">Self-taught and school-taught — constantly levelling up.</p>
    <div class="skills-grid">

      <div class="skill-card reveal">
        <div class="skill-header">
          <div class="skill-icon" style="background:rgba(255,159,67,0.15);">🌐</div>
          <div>
            <h3>Web Development</h3>
            <p>Frontend &amp; Backend</p>
          </div>
        </div>
        <div class="skill-bar-bg"><div class="skill-bar" style="width:82%;background:linear-gradient(90deg,#ff9f43,#ee5a24);"></div></div>
        <p class="skill-pct">82%</p>
        <div class="skill-tags">
          <span class="skill-tag">HTML</span><span class="skill-tag">CSS</span>
          <span class="skill-tag">JavaScript</span><span class="skill-tag">React</span>
          <span class="skill-tag">Node.js</span>
        </div>
      </div>

      <div class="skill-card reveal">
        <div class="skill-header">
          <div class="skill-icon" style="background:rgba(0,113,227,0.15);">🐍</div>
          <div>
            <h3>Python</h3>
            <p>Scripting &amp; Data</p>
          </div>
        </div>
        <div class="skill-bar-bg"><div class="skill-bar" style="width:75%;background:linear-gradient(90deg,#0071e3,#06b6d4);"></div></div>
        <p class="skill-pct">75%</p>
        <div class="skill-tags">
          <span class="skill-tag">NumPy</span><span class="skill-tag">Pandas</span>
          <span class="skill-tag">Flask</span><span class="skill-tag">Automation</span>
        </div>
      </div>

      <div class="skill-card reveal">
        <div class="skill-header">
          <div class="skill-icon" style="background:rgba(168,85,247,0.15);">🎨</div>
          <div>
            <h3>UI / UX Design</h3>
            <p>Figma &amp; Prototyping</p>
          </div>
        </div>
        <div class="skill-bar-bg"><div class="skill-bar" style="width:68%;background:linear-gradient(90deg,#a855f7,#ec4899);"></div></div>
        <p class="skill-pct">68%</p>
        <div class="skill-tags">
          <span class="skill-tag">Figma</span><span class="skill-tag">Wireframing</span>
          <span class="skill-tag">Prototyping</span>
        </div>
      </div>

      <div class="skill-card reveal">
        <div class="skill-header">
          <div class="skill-icon" style="background:rgba(6,182,212,0.15);">🛠️</div>
          <div>
            <h3>Tools &amp; Other</h3>
            <p>Dev Workflow</p>
          </div>
        </div>
        <div class="skill-bar-bg"><div class="skill-bar" style="width:70%;background:linear-gradient(90deg,#06b6d4,#10b981);"></div></div>
        <p class="skill-pct">70%</p>
        <div class="skill-tags">
          <span class="skill-tag">Git</span><span class="skill-tag">GitHub</span>
          <span class="skill-tag">VS Code</span><span class="skill-tag">Linux CLI</span>
        </div>
      </div>

      <div class="skill-card reveal">
        <div class="skill-header">
          <div class="skill-icon" style="background:rgba(239,68,68,0.15);">🎮</div>
          <div>
            <h3>Game Dev</h3>
            <p>Hobby Projects</p>
          </div>
        </div>
        <div class="skill-bar-bg"><div class="skill-bar" style="width:55%;background:linear-gradient(90deg,#ef4444,#f97316);"></div></div>
        <p class="skill-pct">55%</p>
        <div class="skill-tags">
          <span class="skill-tag">Unity</span><span class="skill-tag">C#</span>
          <span class="skill-tag">Godot</span><span class="skill-tag">GDScript</span>
        </div>
      </div>

      <div class="skill-card reveal">
        <div class="skill-header">
          <div class="skill-icon" style="background:rgba(16,185,129,0.15);">🧠</div>
          <div>
            <h3>Soft Skills</h3>
            <p>People &amp; Mindset</p>
          </div>
        </div>
        <div class="skill-bar-bg"><div class="skill-bar" style="width:88%;background:linear-gradient(90deg,#10b981,#84cc16);"></div></div>
        <p class="skill-pct">88%</p>
        <div class="skill-tags">
          <span class="skill-tag">Teamwork</span><span class="skill-tag">Problem-Solving</span>
          <span class="skill-tag">Creativity</span><span class="skill-tag">Curiosity</span>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- PROJECTS -->
<section id="projects">
  <div class="container">
    <p class="section-label reveal">What I've Built</p>
    <h2 class="section-title reveal">Projects</h2>
    <p class="section-sub reveal">From school assignments to passion projects — here's what I've been making.</p>
    <div class="projects-grid">

      <!-- FEATURED -->
      <a href="#" class="project-featured reveal">
        <div class="project-visual" style="background:linear-gradient(135deg,#0071e3 0%,#a855f7 100%);">
          🌦️
        </div>
        <div class="project-body">
          <div class="featured-badge"><i class="fas fa-star"></i> Featured Project</div>
          <h3>WeatherNow App</h3>
          <p>A real-time weather application built with React and a public weather API. Shows current conditions, 7-day forecasts and animated weather icons. My most polished project to date — 200+ users in first week!</p>
          <div class="project-footer" style="margin-top:auto;">
            <div class="project-techs">
              <span class="project-tech">React</span>
              <span class="project-tech">OpenWeather API</span>
              <span class="project-tech">CSS Animations</span>
            </div>
            <span class="project-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </a>

      <!-- CARD 1 -->
      <a href="#" class="project-card reveal">
        <div class="project-visual" style="background:linear-gradient(135deg,#1a1a2e,#16213e);">
          ♟️
        </div>
        <div class="project-body">
          <p class="project-cat" style="color:#a855f7;">Game Dev</p>
          <h3>Chess AI</h3>
          <p>A Python chess engine with a basic minimax algorithm and alpha-beta pruning. Plays at beginner-intermediate level.</p>
          <div class="project-footer">
            <div class="project-techs">
              <span class="project-tech">Python</span>
              <span class="project-tech">Pygame</span>
              <span class="project-tech">AI/ML</span>
            </div>
            <span class="project-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </a>

      <!-- CARD 2 -->
      <a href="#" class="project-card reveal">
        <div class="project-visual" style="background:linear-gradient(135deg,#0f3460,#533483);">
          📝
        </div>
        <div class="project-body">
          <p class="project-cat" style="color:#06b6d4;">Web App</p>
          <h3>Study Planner</h3>
          <p>A full-stack study scheduler built for my class. Tracks assignments, deadlines and sends reminders. 60+ classmates use it!</p>
          <div class="project-footer">
            <div class="project-techs">
              <span class="project-tech">Node.js</span>
              <span class="project-tech">SQLite</span>
              <span class="project-tech">HTML/CSS</span>
            </div>
            <span class="project-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </a>

      <!-- CARD 3 -->
      <a href="#" class="project-card reveal">
        <div class="project-visual" style="background:linear-gradient(135deg,#1b4332,#40916c);">
          🤖
        </div>
        <div class="project-body">
          <p class="project-cat" style="color:#10b981;">Automation</p>
          <h3>Discord Bot</h3>
          <p>A custom bot for my school Discord server. Features moderation, music playback, study timers and fun games.</p>
          <div class="project-footer">
            <div class="project-techs">
              <span class="project-tech">Python</span>
              <span class="project-tech">Discord.py</span>
              <span class="project-tech">APIs</span>
            </div>
            <span class="project-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </a>

      <!-- CARD 4 -->
      <a href="#" class="project-card reveal">
        <div class="project-visual" style="background:linear-gradient(135deg,#7f1d1d,#dc2626);">
          🎮
        </div>
        <div class="project-body">
          <p class="project-cat" style="color:#ef4444;">Game Dev</p>
          <h3>Pixel Platformer</h3>
          <p>A hand-crafted 2D platformer game made in Unity with original pixel art. Submitted to a national student game jam.</p>
          <div class="project-footer">
            <div class="project-techs">
              <span class="project-tech">Unity</span>
              <span class="project-tech">C#</span>
              <span class="project-tech">Pixel Art</span>
            </div>
            <span class="project-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </a>

    </div>
  </div>
</section>

<!-- INTERESTS -->
<section id="interests">
  <div class="container">
    <p class="section-label reveal">Beyond Code</p>
    <h2 class="section-title reveal">Interests &amp; Hobbies</h2>
    <p class="section-sub reveal">I'm more than just a programmer — here's what else makes me tick.</p>
    <div class="interests-bento">

      <div class="bento-card wide reveal" style="background:linear-gradient(135deg,rgba(0,113,227,0.15),rgba(168,85,247,0.1));">
        <div class="bento-glow" style="background:#0071e3;"></div>
        <div class="bento-icon">🧩</div>
        <h3>Problem Solving & Math</h3>
        <p>Competitive maths, logic puzzles and brain-teasers are basically my version of gaming. Currently preparing for AMC competitions.</p>
      </div>

      <div class="bento-card tall reveal" style="background:rgba(168,85,247,0.08);">
        <div class="bento-glow" style="background:#a855f7;"></div>
        <div class="bento-icon">🎵</div>
        <h3>Music</h3>
        <p>I play guitar and produce music in my bedroom. Big fan of lo-fi, indie, and film scores.</p>
        <ul class="bento-list" style="margin-top:1rem;">
          <li>Classical Guitar (4 years)</li>
          <li>FL Studio Beats</li>
          <li>School Band (Drums)</li>
          <li>Spotify Playlist Curator</li>
        </ul>
      </div>

      <div class="bento-card reveal">
        <div class="bento-icon">♟️</div>
        <h3>Chess</h3>
        <p>Club captain. Rated 1450 ELO online. Obsessed with opening theory and endgames.</p>
      </div>

      <div class="bento-card reveal" style="background:rgba(16,185,129,0.08);">
        <div class="bento-glow" style="background:#10b981;"></div>
        <div class="bento-icon">🌍</div>
        <h3>Science &amp; Space</h3>
        <p>Astronomy nerd. I have a telescope and track ISS passes from my backyard. Aspiring to do astrophysics one day.</p>
      </div>

      <div class="bento-card reveal">
        <div class="bento-icon">📸</div>
        <h3>Photography</h3>
        <p>Street and nature photography with my phone and DSLR. I post on Instagram occasionally.</p>
      </div>

      <div class="bento-card wide reveal" style="background:rgba(6,182,212,0.08);">
        <div class="bento-glow" style="background:#06b6d4;"></div>
        <div class="bento-icon">📖</div>
        <h3>Reading &amp; Sci-Fi</h3>
        <p>Favourite books: The Martian, Ender's Game, Ready Player One. Always have a book on the go. Big believer in continuous learning — currently reading "The Pragmatic Programmer".</p>
      </div>

    </div>
  </div>
</section>

<!-- TIMELINE -->
<section id="timeline">
  <div class="container">
    <p class="section-label reveal">My Journey</p>
    <h2 class="section-title reveal">How I Got Here</h2>
    <p class="section-sub reveal">The milestones that shaped who I am today.</p>
    <div class="timeline">
      <div class="timeline-item reveal">
        <div class="timeline-dot" style="background:linear-gradient(135deg,#ffeaa7,#f9ca24);">🚀</div>
        <div class="timeline-content">
          <div class="timeline-date">2021 · Year 7</div>
          <h3>First Line of Code</h3>
          <p>Wrote "Hello, World!" in Python on a school computer. Got completely hooked and spent the whole summer on freeCodeCamp.</p>
        </div>
      </div>
      <div class="timeline-item reveal">
        <div class="timeline-dot" style="background:linear-gradient(135deg,#a29bfe,#6c5ce7);">🏆</div>
        <div class="timeline-content">
          <div class="timeline-date">2022 · Year 8</div>
          <h3>First Hackathon Win</h3>
          <p>Won 2nd place at regional coding competition with a recycling app. First time coding with a team under pressure.</p>
        </div>
      </div>
      <div class="timeline-item reveal">
        <div class="timeline-dot" style="background:linear-gradient(135deg,#fd79a8,#e84393);">🎨</div>
        <div class="timeline-content">
          <div class="timeline-date">2023 · Year 9</div>
          <h3>Discovered UI/UX Design</h3>
          <p>Picked up Figma and realised that design + code is a superpower. Redesigned 3 apps as a personal project.</p>
        </div>
      </div>
      <div class="timeline-item reveal">
        <div class="timeline-dot" style="background:linear-gradient(135deg,#00cec9,#0984e3);">💻</div>
        <div class="timeline-content">
          <div class="timeline-date">2024 · Year 10</div>
          <h3>Building This Portfolio</h3>
          <p>Shipped WeatherNow to 200+ users, started this portfolio site, and aiming for a software internship in Year 11.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="contact-inner container">
    <p class="section-label reveal">Get In Touch</p>
    <h2 class="section-title reveal">Let's Talk</h2>
    <p class="section-sub reveal">
      Whether you want to collaborate on a project, give feedback, or just say hi —
      I'd love to hear from you!
    </p>
    <div class="contact-links reveal">
      <a href="mailto:alex@example.com" class="contact-link">
        <i class="fas fa-envelope"></i> alex@example.com
      </a>
      <a href="#" class="contact-link">
        <i class="fab fa-github"></i> github/alexchen
      </a>
      <a href="#" class="contact-link">
        <i class="fab fa-linkedin"></i> LinkedIn
      </a>
      <a href="#" class="contact-link">
        <i class="fab fa-discord"></i> Discord
      </a>
    </div>
    <div class="contact-form reveal">
      <div class="form-row">
        <div class="form-group">
          <label>Your Name</label>
          <input type="text" placeholder="John Doe" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="john@example.com" />
        </div>
      </div>
      <div class="form-group">
        <label>Subject</label>
        <input type="text" placeholder="Project collab, feedback, just saying hi..." />
      </div>
      <div class="form-group">
        <label>Message</label>
        <textarea placeholder="Hey Alex, I wanted to..."></textarea>
      </div>
      <button class="form-submit" onclick="handleSubmit(event)">
        <i class="fas fa-paper-plane"></i> Send Message
      </button>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <p>Designed &amp; built by <span>Alex Chen</span> · Year 10 · 2024 <span class="footer-heart">♥</span></p>
  <p style="margin-top:0.3rem;">Made with curiosity, caffeine &amp; lots of Stack Overflow.</p>
</footer>

<script>
// ── Scroll Reveal ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

// ── Skill bar animation ──
const skillBars = document.querySelectorAll('.skill-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const target = bar.style.width;
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        setTimeout(() => { bar.style.width = target; }, 50);
      });
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(b => barObserver.observe(b));

// ── Navbar scroll style ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(0,0,0,0.88)';
  } else {
    nav.style.background = 'rgba(0,0,0,0.72)';
  }
});

// ── Smooth active link highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? '#fff' : 'rgba(255,255,255,0.6)';
  });
});

// ── Counter animation ──
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent;
      const match = raw.match(/(\\d+)([+×k]*)/);
      if (match) animateCounter(el, parseInt(match[1]), match[2]);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(n => statObserver.observe(n));

// ── Form submit ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = '#10b981';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
  }, 3000);
}
</script>
</body>
</html>`)
})

export default app
