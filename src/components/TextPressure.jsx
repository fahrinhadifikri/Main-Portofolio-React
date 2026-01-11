import { useEffect, useRef, useState } from 'react';

const TextPressure = ({
  text = 'Compressa',
  fontFamily = '"Oswald", sans-serif', // Menggunakan font Oswald yang mirip gambar
  fontUrl = 'https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap', // Load font Oswald
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  strokeWidth = 2,
  className = '',
  minFontSize = 24
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split('');

  // Helper untuk jarak
  const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const handleMouseMove = e => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = e => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const setSize = () => {
      if (!containerRef.current || !titleRef.current) return;
      const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
      let newFontSize = containerW / (chars.length / 1.5); // Adjusted divider for Oswald
      newFontSize = Math.max(newFontSize, minFontSize);

      setFontSize(newFontSize);
      setScaleY(1);
      setLineHeight(1);

      if (scale) {
         // Logic scale jika diperlukan
      }
    };

    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          const d = dist(mouseRef.current, charCenter);

          // LOGIKA TEKANAN MODIFIKASI (CSS TRANSFORM)
          // Karena font Oswald bukan variable font, kita gunakan scaleX untuk meniru efek lebar
          const distFactor = Math.max(0, 1 - d / maxDist); // 0 (jauh) sampai 1 (dekat)
          
          // Efek Width: ScaleX dari 1 (normal) ke 0.5 (sempit/tertekan) atau sebaliknya
          const scaleXVal = width ? 1 - (distFactor * 0.4) : 1; 
          
          // Efek Weight: Kita simulasi dengan scale sedikit atau opacity
          // Font weight asli tidak bisa dianimasikan halus tanpa variable font
          
          // Efek Italic: Skew
          const skewVal = italic ? distFactor * 10 : 0;

          span.style.transform = `scaleX(${scaleXVal}) skewX(-${skewVal}deg)`;
          
          if (alpha) {
            span.style.opacity = 1 - (distFactor * 0.5);
          }
        });
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, italic, alpha]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent">
      <style>{`@import url('${fontUrl}');`}</style>
      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${flex ? 'flex justify-between' : ''} ${stroke ? 'stroke' : ''} uppercase text-center`}
        style={{
          fontFamily,
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          fontWeight: 700, // Bold sesuai gambar
          color: stroke ? undefined : textColor,
          whiteSpace: 'nowrap'
        }}
      >
        {chars.map((char, i) => (
          <span 
            key={i} 
            ref={el => (spansRef.current[i] = el)} 
            className="inline-block origin-bottom transition-transform duration-75 will-change-transform"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;