import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursor.scss";

function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

    const handleIframeEnter = () => {
      gsap.to([cursor, dot], { opacity: 0, duration: 0.2 });
    };

    const handleIframeLeave = () => {
      gsap.to([cursor, dot], { opacity: 1, duration: 0.2 });
    };

    document.querySelectorAll("iframe").forEach((iframe) => {
      iframe.addEventListener("mouseenter", handleIframeEnter);
      iframe.addEventListener("mouseleave", handleIframeLeave);
    });

    // hide cursor initially
    gsap.set([cursor, dot], { opacity: 0 });

    // show on first mouse move
    const handleMouseEnter = () => {
      gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });
    };

    // follow mouse
    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "none",
      });
    };

    // hide on leave
    const handleMouseLeave = () => {
      gsap.to([cursor, dot], { opacity: 0, duration: 0.3 });
    };

    // click squish
    const handleClick = () => {
      gsap
        .timeline()
        .to(cursor, { scale: 0.8, duration: 0.1 })
        .to(cursor, { scale: 1, duration: 0.2 });
    };

    // hover effects
    const handleHoverIn = (e) => {
      const labelText = e.target.dataset.label || "VIEW";
      label.textContent = labelText;

      gsap.to(cursor, { scale: 2.5, opacity: 0.6, duration: 0.3 });
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
      gsap.to(dot, { opacity: 0, duration: 0.2 });
    };

    const handleHoverOut = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(label, { opacity: 0, scale: 0, duration: 0.2 });
      gsap.to(dot, { opacity: 1, duration: 0.2 });
    };

    // magnetic effect
    const handleMagneticMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      gsap.to(el, {
        x: (e.clientX - centerX) * 0.3,
        y: (e.clientY - centerY) * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMagneticLeave = (e) => {
      gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    // attach events
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("click", handleClick);

    // attach hover to hoverable elements
    const attachHover = () => {
      document.querySelectorAll(".hoverable").forEach((el) => {
        el.addEventListener("mouseenter", handleHoverIn);
        el.addEventListener("mouseleave", handleHoverOut);
      });

      document.querySelectorAll(".magnetic").forEach((el) => {
        el.addEventListener("mousemove", handleMagneticMove);
        el.addEventListener("mouseleave", handleMagneticLeave);
      });
    };

    const interval = setInterval(() => {
      document.querySelectorAll(".magnetic").forEach((el) => {
        if (!el.dataset.magneticAttached) {
          el.dataset.magneticAttached = "true";
          el.addEventListener("mousemove", handleMagneticMove);
          el.addEventListener("mouseleave", handleMagneticLeave);
        }
      });

      document.querySelectorAll(".hoverable").forEach((el) => {
        if (!el.dataset.hoverAttached) {
          el.dataset.hoverAttached = "true";
          el.addEventListener("mouseenter", handleHoverIn);
          el.addEventListener("mouseleave", handleHoverOut);
        }
      });
    }, 1000);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {/* outer ring */}
      <div ref={cursorRef} className="cursor">
        <span ref={labelRef} className="cursor__label">
          VIEW
        </span>
      </div>

      {/* inner dot */}
      <div ref={dotRef} className="cursor__dot" />
    </>
  );
}

export default Cursor;
