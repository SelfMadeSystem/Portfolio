import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(Draggable);
gsap.registerPlugin(DrawSVGPlugin);

export default function Welcome() {
  // Create refs for elements we want to animate
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxF2PathRef = useRef<SVGPathElement>(null);
  const boxF3PathRef = useRef<SVGPathElement>(null);
  const box1PathRef = useRef<SVGPathElement>(null);
  const box2PathRef = useRef<SVGPathElement>(null);
  const box3PathRef = useRef<SVGPathElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Set up animation when component mounts
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const container = containerRef.current;
    const boxF2Path = boxF2PathRef.current;
    const boxF3Path = boxF3PathRef.current;
    const box1Path = box1PathRef.current;
    const box2Path = box2PathRef.current;
    const box3Path = box3PathRef.current;
    const box = boxRef.current;
    if (
      !title ||
      !subtitle ||
      !container ||
      !boxF2Path ||
      !boxF3Path ||
      !box1Path ||
      !box2Path ||
      !box3Path ||
      !box
    ) {
      return;
    }
    const boxBox = box.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const lWidthEdge = (windowWidth - boxBox.width) / 2;
    const lHeightEdge = (windowHeight - boxBox.height) / 2;
    const rWidthEdge = (windowWidth + boxBox.width) / 2;
    const rHeightEdge = (windowHeight + boxBox.height) / 2;

    const rd = (d: string) => {
      return d
        .replace("-69420", `-${lWidthEdge}`)
        .replace("69420", `${rWidthEdge}`)
        .replace("-42069", `-${lHeightEdge}`)
        .replace("42069", `${rHeightEdge}`);
    };

    // Create a timeline for sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state - elements are invisible
    gsap.set([title, subtitle], {
      opacity: 0,
      y: 50,
      scale: 0.8,
    });

    gsap.set([box1Path, box2Path, box3Path], {
      drawSVG: "0% 0%",
    });
    box2Path.setAttribute("d", rd(box2Path.getAttribute("d")!));
    box3Path.setAttribute("d", rd(box3Path.getAttribute("d")!));
    boxF2Path.setAttribute("d", rd(boxF2Path.getAttribute("d")!));
    boxF3Path.setAttribute("d", rd(boxF3Path.getAttribute("d")!));

    // Animation sequence
    tl.to([box2Path, box3Path], {
      drawSVG: "0% 100%",
      duration: 1.5,
      stagger: 0.5,
      ease: "power2.inOut",
    })
      .to(
        [box2Path, box3Path],
        {
          drawSVG: "100% 100%",
          duration: 1.5,
          stagger: 0.5,
          ease: "power2.inOut",
        },
        "-=0.5"
      )
      .to(
        box1Path,
        {
          drawSVG: "0% 100%",
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=1.0"
      )
      .to(
        box1Path,
        {
          fill: "rgba(255, 255, 255, 0.1)",
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=1.0"
      )
      .to(title, { opacity: 1, y: 0, duration: 1, scale: 1 }, "-=0.5")
      .to(subtitle, { opacity: 1, y: 0, duration: 1, scale: 1 }, "-=0.5")
      .call(() => {
        // Enable dragging only after animation completes
        enableDragging();
      });

    // Create a draggable instance but keep it disabled initially
    let draggableInstance: Draggable | null = null;

    // Function to enable dragging when animation is complete
    const enableDragging = () => {
      draggableInstance = Draggable.create(box, {
        type: "x,y",
        bounds: container,
        onPress: function () {
          // Animate the box to scale down slightly when pressed
          gsap.to(box, {
            scale: 0.95,
            duration: 0.2,
            ease: "power2.out",
          });
        },
        onRelease: function () {
          // Animate the box back to its original scale
          gsap.to(box, {
            scale: 1,
            duration: 0.2,
            ease: "back.out(4.0)",
          });
        },
        onDragEnd: function () {
          // Animate back to original position with a spring-like effect
          gsap.to(box, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        },
      })[0];
    };

    // Cleanup function
    return () => {
      if (draggableInstance) {
        draggableInstance.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-screen bg-black text-white"
    >
      <div
        ref={boxRef}
        className="w-84 h-48 p-2 relative flex items-center justify-center mx-auto flex-col text-center"
      >
        <svg className="absolute inset-0 overflow-visible pointer-events-none">
          <defs>
            <mask id="fBox2">
              <path
                ref={boxF2PathRef}
                fill="transparent"
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="5, 5"
                d="M-69420-164H-216a16 16 0 0116 16V68a16 16 0 0016 16H-58a16 16 0 0116 16V176a16 16 0 0016 16H320A16 16 90 00336 176V16a16 16 0 00-16-16H288a16 16 0 01-16-16V-42069"
              ></path>
            </mask>
            <mask id="fBox3">
              <path
                ref={boxF3PathRef}
                fill="transparent"
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="5, 5"
                d="M69420 283H267a16 16 0 01-16-16V208a16 16 0 00-16-16H16a16 16 90 01-16-16V16a16 16 0 0116-16H127a16 16 0 0016-16V-42069"
              ></path>
            </mask>
          </defs>
          <path
            ref={box1PathRef}
            fill="transparent"
            stroke="white"
            d="M16 0H320A16 16 0 01336 16V176A16 16 0 01320 192H16A16 16 0 010 176V16A16 16 0 0116 0Z"
          ></path>
          <path
            ref={box2PathRef}
            mask="url(#fBox2)"
            fill="transparent"
            stroke="#fff8"
            d="M-69420-164H-216a16 16 0 0116 16V68a16 16 0 0016 16H-58a16 16 0 0116 16V176a16 16 0 0016 16H320A16 16 90 00336 176V16a16 16 0 00-16-16H288a16 16 0 01-16-16V-42069"
          ></path>
          <path
            ref={box3PathRef}
            mask="url(#fBox3)"
            fill="transparent"
            stroke="#fff8"
            d="M69420 283H267a16 16 0 01-16-16V208a16 16 0 00-16-16H16a16 16 90 01-16-16V16a16 16 0 0116-16H127a16 16 0 0016-16V-42069"
          ></path>
        </svg>
        <h1 ref={titleRef} className="text-2xl font-bold">
          Welcome to Our App!
        </h1>
        <h2 ref={subtitleRef} className="text-lg text-gray-200">
          Your journey starts here.
        </h2>
      </div>
    </div>
  );
}
