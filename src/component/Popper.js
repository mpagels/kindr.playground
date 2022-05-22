import { useRef, useEffect, useState, useCallback } from "react";
import mojs from "@mojs/core";

const Popper = () => {
  const animDom = useRef();
  const bouncyCircle = useRef();

  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    // Prevent multiple instansiations on hot reloads
    if (bouncyCircle.current) return;

    // Assign a Shape animation to a ref
    const { innerWidth: width, innerHeight: height } = window;
    const generatedTop = Math.random() * height;
    const generatedLeft = Math.random() * width;
    let top = generatedTop;
    let left = generatedLeft;

    if (generatedTop < 150) {
      top = 150;
    } else if (generatedTop > height - 150) {
      top = height - 150;
    }

    if (generatedLeft < 150) {
      left = 150;
    } else if (generatedLeft > width - 150) {
      left = width - 150;
    }
    bouncyCircle.current = new mojs.Shape({
      parent: animDom.current,
      shape: "rect",
      fill: { "#FC46AD": "#F64040" },
      radius: { 0: 150 },
      top,
      left,
      duration: 1000,
      isShowStart: true,
      easing: "elastic.inout",
    });

    // Play the animation on start, and set the state to open
    bouncyCircle.current.play();
  });

  useEffect(() => {
    if (hasClicked) {
      const { innerWidth: width, innerHeight: height } = window;
      const generatedTop = Math.random() * height;
      const generatedLeft = Math.random() * width;
      let top = generatedTop;
      let left = generatedLeft;

      if (generatedTop < 150) {
        top = 150;
      } else if (generatedTop > height - 150) {
        top = height - 150;
      }

      if (generatedLeft < 150) {
        left = 150;
      } else if (generatedLeft > width - 150) {
        left = width - 150;
      }

      bouncyCircle.current
        .tune({
          top,
          left,
        })
        .replay();
    }

    setHasClicked(false);
  }, [hasClicked]);

  const clickHandler = useCallback(() => {
    // If the circel is "open", play the animation backwards, else play it forwards

    bouncyCircle.current.playBackward();

    setTimeout(() => {
      setHasClicked(true);
    }, 700);
  }, []);

  return (
    <div ref={animDom} className="MojsExample" onClick={clickHandler}>
      <div className="content"></div>
    </div>
  );
};

export default Popper;
