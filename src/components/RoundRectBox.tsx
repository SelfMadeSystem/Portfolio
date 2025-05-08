import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LineGenerator, type ScreenStuff } from "./lineGenerator";
import { Vector2 } from "../utils/vec";
import "./roundrectbox.css";

function createRoundRectPath(
  width: number,
  height: number,
  radius: number,
  xO: number = 0,
  yO: number = 0
): string {
  const r = Math.min(radius, Math.min(width, height) / 2);
  const r2 = r * 2;
  return `M${xO + r},${yO}
    h${width - r2}
    a${r},${r} 0 0 1 ${r},${r}
    v${height - r2}
    a${r},${r} 0 0 1 -${r},${r}
    h${-width + r2}
    a${r},${r} 0 0 1 -${r},-${r}
    v${-height + r2}
    a${r},${r} 0 0 1 ${r},-${r}
    Z`.replace(/\s+/g, " ");
}

function LinePath({
  pos,
  size,
  radius,
  screen,
}: {
  pos: Vector2;
  size: Vector2;
  radius: number;
  screen: ScreenStuff;
}) {
  const [path, setPath] = useState("");

  useEffect(() => {
    const pathStr = LineGenerator.fromRandom({
      pos,
      size,
      radius,
    }).loopUntilHitScreen(screen);
    setPath(pathStr);
  }, [pos, size, radius]);

  return (
    <path
      d={path}
      className="anim-stronk"
      pathLength={100}
      stroke="white"
      strokeWidth={2}
      fill="transparent"
    />
  );
}

export default function RoundRectBox({
  children,
  pathRef,
  lineWidth = 2,
  lineColor = "#fff",
  ...props
}: React.HTMLProps<HTMLDivElement> & {
  pathRef?: React.RefObject<SVGPathElement | null>;
  lineWidth?: number;
  lineColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const internalPathRef = useRef<SVGPathElement>(null);
  const [screen, setScreen] = useState<ScreenStuff>({
    l: 0,
    t: 0,
    w: 2,
    h: 2,
  });
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(2);
  const [radius, setRadius] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [mounted, setMounted] = useState(false);

  // Use the provided pathRef or fallback to the internal one
  const actualPathRef = pathRef || internalPathRef;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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
      path.setAttribute("stroke", lineColor);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-width", `${lineWidth}`);

      // Get absolute position for the SVG
      const rect = container.getBoundingClientRect();
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const documentHeight =
        window.innerHeight || document.documentElement.clientHeight;

      setScreen({
        l: scrollLeft - rect.left,
        t: scrollTop - rect.top,
        w: documentWidth,
        h: documentHeight,
      });
      setWidth(width);
      setHeight(height);
      setRadius(radius);

      setPosition({
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        width: rect.width,
        height: rect.height,
      });
    };

    const updatePosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setPosition({
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        width: rect.width,
        height: rect.height,
      });
    };

    setPath();

    const resizeObserver = new ResizeObserver(() => {
      setPath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
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
      {mounted &&
        createPortal(
          <svg
            ref={svgRef}
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              height: `${position.height}px`,
              pointerEvents: "none",
              zIndex: 9999,
            }}
            overflow="visible"
          >
            <path ref={actualPathRef} />
          </svg>,
          document.body
        )}
      {children}
    </div>
  );
}
