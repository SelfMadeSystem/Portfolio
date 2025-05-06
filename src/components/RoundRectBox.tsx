import { useRef, useEffect } from "react";

function createRoundRectPath(
  width: number,
  height: number,
  radius: number
): string {
  const r = Math.min(radius, Math.min(width, height) / 2);
  return `M ${r},0
          H ${width - r}
          A ${r},${r} 0 0 1 ${width},${r}
          V ${height - r}
          A ${r},${r} 0 0 1 ${width - r},${height}
          H ${r}
          A ${r},${r} 0 0 1 0,${height - r}
          V ${r}
          A ${r},${r} 0 0 1 ${r},0
          Z`;
}

export default function RoundRectBox({
  children,
  pathRef,
  ...props
}: React.HTMLProps<HTMLDivElement> & {
  pathRef?: React.RefObject<SVGPathElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const internalPathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Use the provided pathRef or fallback to the internal one
  const actualPathRef = pathRef || internalPathRef;

  useEffect(() => {
    const setPath = () => {
      const container = containerRef.current;
      const path = actualPathRef.current;
      const svg = svgRef.current;
      if (!container || !path || !svg) return;

      const { width, height } = container.getBoundingClientRect();
      container.style.removeProperty("border");
      container.style.removeProperty("background-color");
      const style = getComputedStyle(container);
      const radius = parseFloat(style.borderRadius) || 0;
      const pathStr = createRoundRectPath(width, height, radius);
      path.setAttribute("d", pathStr);
      path.setAttribute("fill", style.backgroundColor);
      path.setAttribute("stroke", style.borderColor);
      path.setAttribute("stroke-width", style.borderWidth);
      container.style.borderColor = "transparent";
      container.style.backgroundColor = "transparent";

      svg.style.top = `-${style.borderWidth}`;
      svg.style.left = `-${style.borderWidth}`;
    };

    setPath();

    const resizeObserver = new ResizeObserver(() => {
      setPath();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [actualPathRef]);

  return (
    <div
      ref={containerRef}
      {...props}
      style={{
        ...props.style,
        position: "relative",
      }}
    >
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        overflow="visible"
      >
        <path ref={actualPathRef} />
      </svg>
      {children}
    </div>
  );
}
