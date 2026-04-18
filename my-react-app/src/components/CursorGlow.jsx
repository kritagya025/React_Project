import React, { useEffect, useState } from "react";

function CursorGlow() {
  const [position, setPosition] = useState({ x: -400, y: -400 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),rgba(56,189,248,0.06),transparent_70%)] blur-3xl lg:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
      aria-hidden="true"
    />
  );
}

export default CursorGlow;
