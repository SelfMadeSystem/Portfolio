import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import RoundRectBox from "./RoundRectBox";

// Register the plugin
gsap.registerPlugin(Draggable);

export default function Welcome() {
  // Create refs for elements we want to animate
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxPathRef = useRef<SVGPathElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Set up animation when component mounts
  useEffect(() => {
    // Create a timeline for sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state - elements are invisible
    gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 50 });

    // For the box path, we'll animate it after it's been initialized
    if (boxPathRef.current) {
      gsap.set(boxPathRef.current, {
        strokeDasharray: boxPathRef.current.getTotalLength(),
        strokeDashoffset: boxPathRef.current.getTotalLength(),
        fill: "transparent",
      });
    }

    // Animation sequence
    tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 1 })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
      .to(boxPathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(
        boxPathRef.current,
        {
          fill:
            getComputedStyle(document.documentElement).getPropertyValue(
              "--box-fill-color"
            ) || "#ffffff20",
          duration: 0.8,
        },
        "-=0.5"
      );
      
    // Make the box draggable
    if (boxRef.current) {
      Draggable.create(boxRef.current, {
        type: "x,y",
        bounds: containerRef.current,
        onDragEnd: function() {
          // Animate back to original position with a spring-like effect
          gsap.to(boxRef.current, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
          });
        }
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-screen"
    >
      <div ref={boxRef}>
        <RoundRectBox
          className="rounded-2xl w-84 h-48 p-2 border-2 relative flex items-center justify-center mx-auto flex-col text-center"
          pathRef={boxPathRef}
        >
          <h1 ref={titleRef} className="text-2xl font-bold">
            Welcome to Our App!
          </h1>
          <h2 ref={subtitleRef} className="text-lg text-gray-700">
            Your journey starts here.
          </h2>
        </RoundRectBox>
      </div>
    </div>
  );
}