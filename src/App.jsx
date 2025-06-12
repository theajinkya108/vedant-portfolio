import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function EnhancedPortfolioLanding() {
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const heroSlides = [
    {
      title: "CREATIVE",
      subtitle: "DEVELOPER",
      description: "Crafting digital experiences that push boundaries"
    },
    {
      title: "INNOVATIVE",
      subtitle: "DESIGNER",
      description: "Where imagination meets cutting-edge technology"
    },
    {
      title: "VISIONARY",
      subtitle: "CREATOR",
      description: "Building the future, one pixel at a time"
    }
  ];

  // Ultra-enhanced loading animation
  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(".particle", {
      scale: 0,
      opacity: 0,
      rotationX: "random(-180, 180)",
      rotationY: "random(-180, 180)",
      z: "random(-100, 100)"
    });

    gsap.to(".particle", {
      scale: "random(0.5, 2)",
      opacity: 1,
      rotationX: "random(0, 360)",
      rotationY: "random(0, 360)",
      duration: 1.2,
      stagger: 0.05,
      ease: "Back.easeOut(3)"
    });

    tl.to(".vi-mask-group", {
      rotate: 720,
      scale: 1.5,
      duration: 2.5,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    })
      .to(".vi-mask-group", {
        x: "random(-15, 15)",
        y: "random(-15, 15)",
        duration: 0.03,
        repeat: 30,
        yoyo: true,
        ease: "none"
      }, "-=1.5")
      .to(".loading-text", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.5,
        ease: "Back.easeOut(2)"
      }, "-=2")
      .to(".progress-bar", {
        width: "100%",
        duration: 2.5,
        ease: "Power2.easeOut"
      }, "-=2")
      .to(".loading-percentage", {
        textContent: "100%",
        duration: 2.5,
        ease: "none",
        snap: { textContent: 1 }
      }, "-=2.5")
      .to(".vi-mask-group", {
        scale: 20,
        rotate: 1440,
        duration: 3,
        ease: "Power4.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onComplete: () => {
          document.querySelector(".svg")?.remove();
          setShowContent(true);
        }
      }, "-=0.8");
  });

  // Hero entrance animations
  useGSAP(() => {
    if (!showContent) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Navigation entrance
    tl.fromTo(".nav-container", {
      y: -160,
      opacity: 0,
      rotationX: -90
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 1.5,
      ease: "Back.easeOut(2)"
    })

      // Hero text entrance
      .fromTo(".hero-title", {
        y: 200,
        opacity: 0,
        rotationX: -90,
        scale: 0.5
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 2,
        ease: "Power4.easeOut"
      }, "-=1")

      .fromTo(".hero-subtitle", {
        y: 150,
        opacity: 0,
        rotationX: -45
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "Power3.easeOut"
      }, "-=1.5")

      .fromTo(".hero-description", {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "Power2.easeOut"
      }, "-=1")

      .fromTo(".hero-cta", {
        scale: 0,
        opacity: 0,
        rotation: 180
      }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "Back.easeOut(2)"
      }, "-=0.5")

      .fromTo(".floating-elements > *", {
        y: 100,
        opacity: 0,
        rotation: "random(-180, 180)"
      }, {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "Back.easeOut(1.7)"
      }, "-=1");
  }, [showContent]);

  // Auto-slide functionality
  useEffect(() => {
    if (!showContent) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [showContent]);

  // Slide change animation
  useGSAP(() => {
    if (!showContent) return;

    gsap.fromTo(".hero-title", {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "Power2.easeOut"
    });

    gsap.fromTo(".hero-subtitle", {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: 0.2,
      ease: "Power2.easeOut"
    });
  }, [currentSlide]);

  // Enhanced mouse follower
  useEffect(() => {
    let rafId;
    let lastX = 0;
    let lastY = 0;
    let targetX = 0;
    let targetY = 0;
    let cursorTypeTimeout;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Debounce cursor type changes
      if (cursorTypeTimeout) {
        clearTimeout(cursorTypeTimeout);
      }

      cursorTypeTimeout = setTimeout(() => {
        const target = e.target;
        if (target.closest('.nav-item')) {
          setCursorType('nav');
        } else if (target.closest('.cta-button')) {
          setCursorType('button');
        } else if (target.closest('.portfolio-item')) {
          setCursorType('portfolio');
        } else {
          setCursorType('default');
        }
      }, 50);

      // Optimized magnetic effect
      const magneticElements = document.querySelectorAll('.magnetic');
      magneticElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        if (distance < 120) {
          const moveX = (e.clientX - centerX) * 0.4;
          const moveY = (e.clientY - centerY) * 0.4;
          el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${moveX * 0.1}deg)`;
        } else {
          el.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        }
      });
    };

    const updateCursorPosition = () => {
      // Smooth cursor movement using lerp
      lastX += (targetX - lastX) * 0.2;
      lastY += (targetY - lastY) * 0.2;

      setMousePosition({ x: lastX, y: lastY });
      rafId = requestAnimationFrame(updateCursorPosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      if (cursorTypeTimeout) {
        clearTimeout(cursorTypeTimeout);
      }
    };
  }, []);

  // Portfolio items sample data
  const portfolioItems = [
    // Content Creation (6 reels)
    { id: 1, title: 'Reel 1', category: 'Content Creation', type: 'video', url: 'https://res.cloudinary.com/ddtc6qfwh/video/upload/v1749365152/Idkw_storytelling_rockstar_reels_reelsinstagram_indore_rockstarmovie_indorecity_twxtzh.mp4' },
    { id: 2, title: 'Reel 2', category: 'Content Creation', type: 'video', url: 'https://res.cloudinary.com/ddtc6qfwh/video/upload/v1749365152/gullylabs_REPRESENTING_THE_INDIAN_DREAM._gullylabs_indianculture_houseofbrands_dhh_storytelling_s9euqp.mp4' },
    { id: 3, title: 'Reel 3', category: 'Content Creation', type: 'video', url: 'https://res.cloudinary.com/ddtc6qfwh/video/upload/v1749365152/HEREEV_1_j2d5ci.mp4' },
    { id: 4, title: 'Reel 4', category: 'Content Creation', type: 'video', url: 'https://res.cloudinary.com/ddtc6qfwh/video/upload/v1749365151/IFYOUA_1_ypsh89.mp4' },
    { id: 5, title: 'Reel 5', category: 'Content Creation', type: 'video', url: 'https://res.cloudinary.com/ddtc6qfwh/video/upload/v1749365157/SNOW_by_thecometuniverse_Stay_frosty_y_ll._nevershyneversorry_comet_cometshoes_cometshoesready_cometshoesindia_cizuxe.mp4' },
    { id: 6, title: 'Reel 6', category: 'Content Creation', type: 'video', url: 'https://res.cloudinary.com/ddtc6qfwh/video/upload/v1749483277/When_I_was_a_kid._seedhemaut_encoreabj_theycallmecalm_dhh_seedhemaut_hiphop_storytelling_indianculture_model_fashion_y6mcno.mp4' },
    // Video Editing (3 reels)
    { id: 7, title: 'Edit 1', category: 'Video Editing', type: 'video', url: 'https://res.cloudinary.com/ddtc6qfwh/video/upload/v1749365157/_4---_1_nptcep.mp4' },
    { id: 8, title: 'Edit 2', category: 'Video Editing', type: 'video', url: 'https://res.cloudinary.com/ddtc6qfwh/video/upload/v1749365153/Sensational_snacks._Literally_foodella_foodellasnacks_trending_trendingreels_snacking_frozenpotatosnacks_frozensnackoptions_instagramtrending_1_dksfrl.mp4' },
    { id: 9, title: 'Edit 3', category: 'Video Editing', type: 'video', url: 'https://res.cloudinary.com/ddtc6qfwh/video/upload/v1749365153/WAITTI_1_vrhgr6.mp4' },
    // Graphic Design (9 images)
    { id: 10, title: 'Poster 1', category: 'Graphic Design', type: 'image', url: 'https://res.cloudinary.com/ddtc6qfwh/image/upload/v1749364771/898_1_z6nknz.png' },
    { id: 11, title: 'Poster 2', category: 'Graphic Design', type: 'image', url: 'https://res.cloudinary.com/ddtc6qfwh/image/upload/v1749364771/2_PM_1_qqmb1b.png' },
    { id: 12, title: 'Poster 3', category: 'Graphic Design', type: 'image', url: 'https://res.cloudinary.com/ddtc6qfwh/image/upload/v1749364767/DONE_1_uio1ou.png' },
    { id: 13, title: 'Poster 4', category: 'Graphic Design', type: 'image', url: 'https://res.cloudinary.com/ddtc6qfwh/image/upload/v1749364768/WhatsApp_Image_2025-04-30_at_11.48.38_AM_s3tseg.jpg' },
    { id: 14, title: 'Poster 5', category: 'Graphic Design', type: 'image', url: 'https://res.cloudinary.com/ddtc6qfwh/image/upload/v1749364769/THANKYOU_2_msbhli.png' },
    { id: 15, title: 'Poster 6', category: 'Graphic Design', type: 'image', url: 'https://res.cloudinary.com/ddtc6qfwh/image/upload/v1749364770/INFOVIAN_g7n8by.jpg' },
    { id: 16, title: 'Poster 7', category: 'Graphic Design', type: 'image', url: 'https://res.cloudinary.com/ddtc6qfwh/image/upload/v1749364769/kim_4_1_ffbm82.png' },
    { id: 17, title: 'Poster 8', category: 'Graphic Design', type: 'image', url: 'https://res.cloudinary.com/ddtc6qfwh/image/upload/v1749364769/photo_added_1_rkoc5o.png' },
    { id: 18, title: 'Poster 9', category: 'Graphic Design', type: 'image', url: 'https://res.cloudinary.com/ddtc6qfwh/image/upload/v1749364769/trump_8_1_mjprgv.png' },
  ];

  const filterOptions = [
    { name: 'All', icon: 'ri-layout-grid-line' },
    { name: 'Graphic Design', icon: 'ri-palette-line' },
    { name: 'Video Editing', icon: 'ri-video-line' },
    { name: 'Content Creation', icon: 'ri-movie-2-line' }
  ];

  // Filtered items based on activeFilter
  const filteredItems =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === activeFilter);

  // Helper function to chunk an array into groups of a given size
  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  // Custom hook to detect mobile screen
  function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);
    React.useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 640);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
  }

  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          position: relative;
        }
        
        html {
          scroll-behavior: smooth;
          font-size: 16px;
        }
        
        @media (max-width: 768px) {
          html {
            font-size: 14px;
          }
        }
        
        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #000;
          cursor: none;
          min-height: 100vh;
          width: 100vw;
          overflow-x: hidden;
        }

        /* Hero Section Responsive Styles */
        .hero-container {
          min-height: 100vh;
          height: 100vh;
          max-height: 100vh;
          width: 100vw;
          max-width: 100vw;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          padding-bottom: 0;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: clamp(1.5rem, 5vw, 3rem);
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: clamp(1rem, 3vw, 1.25rem);
          max-width: 800px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .hero-cta {
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
          font-size: clamp(0.875rem, 2vw, 1rem);
          white-space: nowrap;
        }

        /* Navigation Responsive Styles */
        .nav-container {
          padding: clamp(0.75rem, 2vw, 1.5rem);
        }

        .logo {
          font-size: clamp(1.25rem, 4vw, 2rem);
        }

        /* Mobile Menu Styles */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }

        .mobile-menu.active {
          transform: translateX(0);
        }

        .mobile-menu-item {
          font-size: clamp(1.5rem, 5vw, 2rem);
          color: white;
          text-decoration: none;
          padding: 1rem;
          transition: all 0.3s ease;
        }

        /* Floating Elements Responsive */
        .floating-elements {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .floating-shape {
          position: absolute;
          width: clamp(100px, 20vw, 300px);
          height: clamp(100px, 20vw, 300px);
        }

        /* Slide Indicators Responsive */
        .slide-indicators {
          display: none;
        }

        /* Scroll Indicator Responsive */
        .scroll-indicator {
          display: none;
        }

        /* Grid Background Responsive */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
          grid-auto-rows: minmax(50px, 1fr);
        }

        /* Loading Screen Responsive */
        .svg {
          width: 100vw;
          height: 100vh;
          max-width: 100vw;
          max-height: 100vh;
          overflow: hidden;
        }

        .loading-text h2 {
          font-size: clamp(1.25rem, 4vw, 2rem);
        }

        .loading-percentage {
          font-size: clamp(1.5rem, 5vw, 2rem);
        }

        /* Ensure content doesn't overflow on small screens */
        @media (max-width: 640px) {
          .hero-container {
            padding: 1rem;
          }

          .hero-cta {
            flex-direction: column;
            width: 100%;
          }

          .cta-button {
            width: 100%;
            text-align: center;
          }
        }

        /* Prevent horizontal scroll on all devices */
        @media (max-width: 100vw) {
          body {
            overflow-x: hidden;
            width: 100%;
          }
        }
        
        /* Ultra-Enhanced Mouse Follower */
        .mouse-follower {
          position: fixed;
          top: 0;
          left: 0;
          width: 25px;
          height: 25px;
          background: conic-gradient(from 0deg, #ff0080, #00ff80, #8000ff, #ff0080);
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
          z-index: 9999;
          transform: translate3d(-50%, -50%, 0);
          will-change: transform;
          transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
        }
        
        .mouse-follower::before {
          content: '';
          position: absolute;
          top: -15px;
          left: -15px;
          right: -15px;
          bottom: -15px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: rotate 4s linear infinite;
          will-change: transform;
        }
        
        .mouse-follower::after {
          content: '';
          position: absolute;
          top: -25px;
          left: -25px;
          right: -25px;
          bottom: -25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: rotate 6s linear infinite reverse;
          will-change: transform;
        }
        
        .mouse-follower.nav {
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, #00ff80, #8000ff);
        }
        
        .mouse-follower.button {
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, #ff0080, #ff8000);
        }
        
        @keyframes rotate {
          to { transform: rotate(360deg); }
        }
        
        /* Magnetic elements */
        .magnetic {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        
        /* Enhanced Navigation */
        .nav-container {
          backdrop-filter: blur(25px);
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }
        
        .nav-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          padding: 0.8rem 1.5rem;
          border-radius: 1rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.02);
        }
        
        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }
        
        .nav-item:hover::before {
          left: 100%;
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff0080, #00ff80, #8000ff);
          transition: all 0.4s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }
        
        .nav-item:hover::after {
          width: 90%;
        }
        
        .nav-item span {
          display: inline-block;
          transition: all 0.4s ease;
          position: relative;
        }
        
        .nav-item:hover span {
          animation: textFloat 0.8s ease forwards;
          color: #00ff80;
          text-shadow: 0 0 20px rgba(0, 255, 128, 0.6);
        }
        
        @keyframes textFloat {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
        
        /* Hamburger Menu */
        .hamburger {
          width: 35px;
          height: 25px;
          position: relative;
          cursor: pointer;
          z-index: 60;
        }
        
        .hamburger span {
          display: block;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #ff0080, #00ff80);
          border-radius: 2px;
          position: absolute;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hamburger span:nth-child(1) { top: 0; }
        .hamburger span:nth-child(2) { top: 50%; transform: translateY(-50%); }
        .hamburger span:nth-child(3) { bottom: 0; }
        
        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg);
          top: 50%;
          margin-top: -1.5px;
          background: linear-gradient(90deg, #ff0080, #ff8000);
        }
        
        .hamburger.active span:nth-child(2) {
          opacity: 0;
          transform: translateX(100%);
        }
        
        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg);
          bottom: 50%;
          margin-bottom: -1.5px;
          background: linear-gradient(90deg, #ff0080, #ff8000);
        }
        
        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.98);
          backdrop-filter: blur(30px);
          z-index: 50;
          transition: right 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .mobile-menu::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: conic-gradient(from 0deg at 50% 50%, #ff0080, #00ff80, #8000ff, #ff0080);
          opacity: 0.1;
          animation: rotate 20s linear infinite;
        }
        
        .mobile-menu.active {
          right: 0;
        }
        
        .mobile-menu-item {
          font-size: 2.5rem;
          font-weight: 600;
          margin: 1.5rem 0;
          opacity: 0;
          transform: translateX(100px) rotateY(90deg);
          transition: all 0.6s ease;
          color: white;
          text-decoration: none;
          position: relative;
          z-index: 10;
        }
        
        .mobile-menu-item:hover {
          background: linear-gradient(45deg, #ff0080, #00ff80, #8000ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
        }
        
        .mobile-menu.active .mobile-menu-item {
          opacity: 1;
          transform: translateX(0) rotateY(0deg);
        }
        
        .mobile-menu-item:nth-child(1) { transition-delay: 0.1s; }
        .mobile-menu-item:nth-child(2) { transition-delay: 0.2s; }
        .mobile-menu-item:nth-child(3) { transition-delay: 0.3s; }
        .mobile-menu-item:nth-child(4) { transition-delay: 0.4s; }
        .mobile-menu-item:nth-child(5) { transition-delay: 0.5s; }
        
        /* Loading Animation */
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #00ff80, #8000ff);
          border-radius: 50%;
          box-shadow: 0 0 15px #00ff80;
        }
        
        .loading-text {
          opacity: 0;
          transform: translateY(50px) rotateX(-90deg);
        }
        
        .progress-container {
          width: 400px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .progress-bar {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #ff0080, #00ff80, #8000ff);
          background-size: 300% 100%;
          animation: progressShine 2s linear infinite;
          position: relative;
        }
        
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: progressGlow 1.5s ease-in-out infinite;
        }
        
        @keyframes progressShine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes progressGlow {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        /* Enhanced Gradient Text */
        .gradient-text {
          background: linear-gradient(45deg, #ff0080, #00ff80, #8000ff, #ff0080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease-in-out infinite;
          background-size: 300% 300%;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        .logo {
          position: relative;
        }
        
        .logo::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: conic-gradient(from 0deg, #ff0080, #00ff80, #8000ff, #ff0080);
          border-radius: 15px;
          z-index: -1;
          opacity: 0.3;
          filter: blur(15px);
          animation: rotate 8s linear infinite;
        }
        
        /* Hero Section Styles */
        .hero-container {
          background: radial-gradient(ellipse at center, rgba(128, 0, 255, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%), 
                      linear-gradient(45deg, #000 0%, #1a0033 50%, #000 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 255, 128, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(128, 0, 255, 0.1) 0%, transparent 50%);
          animation: heroGlow 8s ease-in-out infinite alternate;
        }
        
        @keyframes heroGlow {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.05); }
        }
        
        .hero-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(4rem, 12vw, 12rem);
          font-weight: 900;
          line-height: 0.8;
          letter-spacing: -0.05em;
          margin-bottom: 1rem;
          position: relative;
        }
        
        .hero-subtitle {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(3rem, 8vw, 8rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .hero-description {
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto 3rem;
          opacity: 0.8;
          line-height: 1.6;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 3rem;
          background: linear-gradient(45deg, #ff0080, #8000ff);
          border: 2px solid transparent;
          border-radius: 2rem;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }
        
        .cta-button:hover::before {
          left: 100%;
        }
        
        .cta-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 40px rgba(255, 0, 128, 0.4);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }
        
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(255, 0, 128, 0.3), rgba(128, 0, 255, 0.3));
          filter: blur(2px);
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-shape:nth-child(1) {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .floating-shape:nth-child(2) {
          width: 60px;
          height: 60px;
          top: 60%;
          right: 15%;
          animation-delay: -2s;
        }
        
        .floating-shape:nth-child(3) {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 20%;
          animation-delay: -4s;
        }
        
        .floating-shape:nth-child(4) {
          width: 120px;
          height: 120px;
          top: 30%;
          right: 25%;
          animation-delay: -1s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(15px) rotate(240deg); }
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          opacity: 0.7;
          animation: bounce 2s ease-in-out infinite;
        }
        
        .scroll-indicator span {
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        
        .scroll-arrow {
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, #ff0080, transparent);
          position: relative;
        }
        
        .scroll-arrow::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #ff0080;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        
        .slide-indicators {
          position: absolute;
          bottom: 6rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 10;
        }
        
        .slide-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .slide-dot.active {
          background: linear-gradient(45deg, #ff0080, #8000ff);
          border-color: rgba(255, 255, 255, 0.5);
          transform: scale(1.3);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-description {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }
          
          .cta-button {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
          
          .floating-shape {
            display: none;
          }
        }

        /* Portfolio Styles */
        .portfolio-filter {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .portfolio-filter:hover,
        .portfolio-filter.active {
          background: linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .portfolio-filter i {
          transition: all 0.3s ease;
        }

        .portfolio-filter:hover i {
          transform: scale(1.1);
        }
        
        .portfolio-item {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .portfolio-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border-color: rgba(78, 205, 196, 0.5);
        }

        .hover-interactive {
          transition: all 0.3s ease;
        }

        .hover-interactive:hover {
          transform: scale(1.05);
        }
      `}</style>

      {/* Mouse Follower */}
      <div
        className={`mouse-follower ${cursorType}`}
        style={{ left: mousePosition.x, top: mousePosition.y }}
      ></div>

      {/* Loading Screen */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-black to-blue-900">
        {/* Enhanced Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}

        <div className="text-center text-white relative z-10">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="w-[500px] h-[400px]">
            <defs>
              <mask id="viMask">
                <rect width="100%" height="100%" fill="black" />
                <g className="vi-mask-group">
                  <text
                    x="50%"
                    y="50%"
                    fontSize="250"
                    textAnchor="middle"
                    fill="white"
                    dominantBaseline="middle"
                    fontFamily="Orbitron, Arial Black"
                    fontWeight="900"
                  >
                    VL
                  </text>
                </g>
              </mask>
              <linearGradient id="maskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ff0080', stopOpacity: 1 }} />
                <stop offset="33%" style={{ stopColor: '#00ff80', stopOpacity: 1 }} />
                <stop offset="66%" style={{ stopColor: '#8000ff', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ff0080', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#maskGradient)"
              mask="url(#viMask)"
            />
          </svg>

          <div className="loading-text mt-12">
            <h2 className="text-3xl font-light tracking-[0.3em] mb-6 font-['Space Grotesk']">
              CRAFTING EXPERIENCE
            </h2>
            <div className="progress-container mx-auto relative">
              <div className="progress-bar"></div>
            </div>
            <div className="loading-percentage text-2xl font-bold mt-4 gradient-text">0%</div>
          </div>
        </div>
      </div>

      {showContent && (
        <div className="main w-full">
          {/* Navigation */}
          <div className="nav-container fixed z-50 top-0 left-0 right-0 w-full px-6 lg:px-20 py-6 text-white">
            <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-5 flex justify-between items-center shadow-2xl">
              <div className="logo text-2xl lg:text-3xl font-bold font-['Orbitron'] gradient-text magnetic">
                VEDANT LIKHAR
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex gap-12">
                <a href="#home" className="nav-item text-lg font-medium magnetic">
                  {"Home".split("").map((char, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char}</span>
                  ))}
                </a>
                <a href="#about" className="nav-item text-lg font-medium magnetic">
                  {"About".split("").map((char, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char}</span>
                  ))}
                </a>
                <a href="#my-work" className="nav-item text-lg font-medium magnetic">
                  {"Portfolio".split("").map((char, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char}</span>
                  ))}
                </a>
                {/* <a href="#skills" className="nav-item text-lg font-medium magnetic">
                  {"Skills".split("").map((char, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char}</span>
                  ))}
                </a> */}
                <a href="#contact" className="nav-item text-lg font-medium magnetic">
                  {"Contact".split("").map((char, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char}</span>
                  ))}
                </a>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden">
                <div
                  className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#my-work" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
            {/* <a href="#skills" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>Skills</a> */}
            <a href="#contact" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>

          {/* Enhanced Hero Section */}
          <section className="hero-container min-h-screen flex items-center justify-center text-white relative" ref={heroRef}>
            {/* Floating Background Elements */}
            <div className="floating-elements">
              <div className="floating-shape"></div>
              <div className="floating-shape"></div>
              <div className="floating-shape"></div>
              <div className="floating-shape"></div>
            </div>

            {/* Main Hero Content */}
            <div className="text-center relative z-10 px-6 lg:px-20 max-w-7xl mx-auto">
              <div className="hero-title gradient-text magnetic">
                {heroSlides[currentSlide].title}
              </div>
              <div className="hero-subtitle gradient-text magnetic">
                {heroSlides[currentSlide].subtitle}
              </div>
              <p className="hero-description text-gray-300">
                {heroSlides[currentSlide].description}
              </p>

              <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="#my-work" className="cta-button magnetic">
                  <span>View My Work</span>
                  <i className="ri-arrow-right-line text-xl"></i>
                </a>
                <a href="#contact" className="cta-button magnetic" style={{
                  background: 'transparent',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <span>Get In Touch</span>
                  <i className="ri-mail-line text-xl"></i>
                </a>
              </div>
            </div>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="grid grid-cols-12 grid-rows-8 w-full h-full">
                {[...Array(96)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-white/10"
                    style={{
                      animationDelay: `${i * 0.05}s`,
                      animation: `pulse 4s ease-in-out infinite`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white relative">
            <div className="text-center">
              <h2 className="text-6xl font-bold gradient-text mb-8">About Me</h2>
              <p className="text-2xl font-light opacity-80 max-w-2xl mx-auto">
                Hey! I’m a visual storyteller who loves turning ideas into engaging content. Whether it’s editing videos, creating motion graphics, designing eye-catching visuals, or crafting content for social media. I enjoy every part of the process. I blend creativity with the purpose of making content that not only looks good but connects with people.
              </p>
              <div className="mt-12">
                <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                  <i className="ri-code-line text-3xl text-green-400"></i>
                  {/* <span className="text-lg">Ready to build the next section...</span> */}
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section
          <section id="skills" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center text-white relative py-32">
            <div className="container mx-auto px-8 lg:px-20">
              <div className="section-header flex flex-col items-center text-center mb-20">
                <h2 className="text-5xl lg:text-6xl font-['Orbitron'] font-bold gradient-text mb-8">
                  My Skills
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl">
                  A showcase of my technical expertise and creative capabilities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"> */}
          {/* Technical Skills */}
          {/* <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-6">
                    <i className="ri-code-box-line text-4xl text-cyan-400 group-hover:scale-110 transition-transform"></i>
                    <h3 className="text-2xl font-bold">Technical Skills</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">HTML/CSS</span>
                        <span className="text-cyan-400">95%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">JavaScript</span>
                        <span className="text-cyan-400">90%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">React</span>
                        <span className="text-cyan-400">85%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div> */}

          {/* Design Skills */}
          {/* <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-pink-400/50 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-6">
                    <i className="ri-palette-line text-4xl text-pink-400 group-hover:scale-110 transition-transform"></i>
                    <h3 className="text-2xl font-bold">Design Skills</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">UI/UX Design</span>
                        <span className="text-pink-400">90%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Graphic Design</span>
                        <span className="text-pink-400">85%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Motion Design</span>
                        <span className="text-pink-400">80%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div> */}

          {/* Creative Skills */}
          {/* <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-6">
                    <i className="ri-movie-2-line text-4xl text-purple-400 group-hover:scale-110 transition-transform"></i>
                    <h3 className="text-2xl font-bold">Creative Skills</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Video Editing</span>
                        <span className="text-purple-400">95%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Content Creation</span>
                        <span className="text-purple-400">90%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Storytelling</span>
                        <span className="text-purple-400">85%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* Portfolio Section */}
          <section id="my-work" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center text-white relative py-32">
            <div className="container mx-auto px-8 lg:px-20">
              <div className="section-header flex flex-col items-center text-center" style={{ marginBottom: '50px', paddingTop: '80px' }}>
                <h2 className="text-5xl lg:text-6xl font-['Orbitron'] font-bold gradient-text" style={{ marginBottom: '60px' }}>
                  My Work
                </h2>
                <div className="w-full flex items-center justify-center" style={{ marginBottom: '0' }}>
                  <div className="max-w-3xl px-4">
                    <p className="text-xl text-gray-400 leading-relaxed tracking-wide text-center whitespace-normal" style={{ marginBottom: '0' }}>
                      A collection of my best work in
                      <span className="text-cyan-400 font-medium mx-2"> graphic design</span>,
                      <span className="text-pink-400 font-medium mx-2"> video editing</span>, and
                      <span className="text-purple-400 font-medium mx-2"> content creation</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Portfolio Filter */}
              <div className="filter-tabs flex flex-wrap justify-center gap-10 mb-2 px-10" style={{ marginBottom: '40px' }}>
                {filterOptions.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFilter(filter.name)}
                    className={`portfolio-filter group px-20 py-5 text-lg font-medium transition-all duration-300 rounded-3xl flex items-center gap-4 ${activeFilter === filter.name
                      ? 'border-cyan-400 text-cyan-400 bg-white/10'
                      : 'border-transparent hover:border-cyan-400 hover:text-cyan-400'
                      }`}
                  >
                    <i className={`${filter.icon} text-xl group-hover:scale-110 transition-transform`}></i>
                    <span>{filter.name}</span>
                  </button>
                ))}
              </div>

              {/* Portfolio Items Grid */}
              {activeFilter === 'Content Creation' && (
                <div className="w-full flex flex-col gap-8 px-4 md:px-12 py-8">
                  {chunkArray(filteredItems, isMobile ? 1 : 3).map((row, rowIndex) => (
                    <div key={rowIndex} className={`flex gap-8 justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}>
                      {row.map(item => (
                        <div key={item.id} className={`bg-white/5 rounded-xl flex flex-col items-center justify-center p-2 ${isMobile ? 'w-full' : 'w-1/3'}`}>
                          <video src={item.url} controls className="aspect-[9/16] w-full rounded-lg object-cover" />
                          <span className="mt-2 text-white text-base font-medium">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {activeFilter === 'Video Editing' && (
                <div className="w-full flex flex-col gap-8 px-4 md:px-12 py-8">
                  {chunkArray(filteredItems, isMobile ? 1 : 3).map((row, rowIndex) => (
                    <div key={rowIndex} className={`flex gap-8 justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}>
                      {row.map(item => (
                        <div key={item.id} className={`bg-white/5 rounded-xl flex flex-col items-center justify-center p-2 ${isMobile ? 'w-full' : 'w-1/3'}`}>
                          <video src={item.url} controls className="aspect-[9/16] w-full rounded-lg object-cover" />
                          <span className="mt-2 text-white text-base font-medium">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {activeFilter === 'Graphic Design' && (
                <div className="w-full flex flex-col gap-8 px-4 md:px-12 py-8">
                  {chunkArray(filteredItems, isMobile ? 1 : 3).map((row, rowIndex) => (
                    <div key={rowIndex} className={`flex gap-8 justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}>
                      {row.map(item => (
                        <div key={item.id} className={`bg-white/5 rounded-xl flex flex-col items-center justify-center p-2 ${isMobile ? 'w-full' : 'w-1/3'}`}>
                          <img src={item.url} alt={item.title} className="w-full rounded-lg object-cover" />
                          <span className="mt-2 text-white text-base font-medium">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {activeFilter === 'All' && (
                <div className="w-full flex flex-col gap-8 px-4 md:px-12 py-8">
                  {chunkArray(filteredItems, isMobile ? 1 : 3).map((row, rowIndex) => (
                    <div key={rowIndex} className={`flex gap-8 justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}>
                      {row.map(item => (
                        <div key={item.id} className={`bg-white/5 rounded-xl flex flex-col items-center justify-center p-2 ${isMobile ? 'w-full' : 'w-1/3'}`}>
                          {item.type === 'image' ? (
                            <img src={item.url} alt={item.title} className="w-full rounded-lg object-cover" />
                          ) : (
                            <video src={item.url} controls className="aspect-[9/16] w-full rounded-lg object-cover" />
                          )}
                          <span className="mt-2 text-white text-base font-medium">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white relative py-32">
            <div className="container mx-auto px-8 lg:px-20 text-center">
              <h2 className="text-5xl lg:text-6xl font-['Orbitron'] font-bold gradient-text mb-12 magnetic">Get In Touch</h2>
              {/* <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
                Let's create something extraordinary together! Reach out through my socials or drop me an email.
              </p> */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
                <a
                  href="https://www.instagram.com/ved_upclose?igsh=MXh2N21kdWszamtnbQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-400/50 hover:text-purple-400 transition-all duration-300 magnetic"
                >
                  <i className="ri-instagram-line text-2xl"></i>
                  <span className="text-lg font-medium">Instagram</span>
                </a>
                <a
                  href="https://in.linkedin.com/in/vedant-likhar-0919b3341?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-blue-400/50 hover:text-blue-400 transition-all duration-300 magnetic"
                >
                  <i className="ri-linkedin-box-line text-2xl"></i>
                  <span className="text-lg font-medium">LinkedIn</span>
                </a>
                <a
                  href="mailto:vedantlikhar67@gmail.com"
                  className="contact-link flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-green-400/50 hover:text-green-400 transition-all duration-300 magnetic"
                >
                  <i className="ri-mail-line text-2xl"></i>
                  <span className="text-lg font-medium">Email</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      )}
    </>);
}
export default EnhancedPortfolioLanding;
