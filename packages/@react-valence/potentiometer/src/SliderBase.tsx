import React, { CSSProperties, RefObject, useRef, useState } from "react";

// @react-aria https://react-spectrum.adobe.com/react-aria/
import { useNumberFormatter } from "@react-aria/i18n";
import { useSlider } from "@react-aria/slider";

// @react-stately https://react-spectrum.adobe.com/react-stately/
import { SliderState, useSliderState } from "@react-stately/slider";

// @react-valence https://valence.austinpittman.net
import {
  classNames,
  useFocusableRef,
  useStyleProps,
} from "@react-valence/utils";
import { useProviderProps } from "@react-valence/provider";

// @types-valence
import { FocusableRef } from "@types-valence/shared";
import { ValenceBarSliderBase } from "@types-valence/slider";

// @valence-styles
import styles from "@valence-styles/components/potentiometer/vars.module.scss";

// motion stuff
import { motion, useSpring } from "framer-motion";

export interface SliderBaseChildArguments {
  inputRef: RefObject<HTMLInputElement>;
  trackRef: RefObject<HTMLElement>;
  state: SliderState;
}

export interface SliderBaseProps<T = number[]> extends ValenceBarSliderBase<T> {
  //children: (opts: SliderBaseChildArguments) => ReactNode;
  classes?: string[] | Object;
  style?: CSSProperties;
}

function SliderBase(props: SliderBaseProps, ref: FocusableRef<HTMLDivElement>) {
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 100 });
  const [isPressed, setPressed] = useState(false);

  // REFS
  const pointerSurface = useRef(null);

  const calcRelativePosition = (ev) => {
    var pt = pointerSurface.current.createSVGPoint();
    pt.x = ev.pageX;
    pt.y = ev.pageY;
    pt = pt.matrixTransform(pointerSurface.current.getScreenCTM().inverse());

    return { x: pt.x, y: pt.y };
  };

  function handlePointerMove(ev) {
    const pointerPosition = calcRelativePosition(ev);
    if (isPressed) {
      setTargetPosition(pointerPosition);
    }
  }

  function handlePress(ev) {
    setPressed(true);
  }

  function handleRelease(ev) {
    setPressed(false);
  }

  return (
    <div
      style={{
        width: "105px",
        height: "450px",
        background: "#efefef",
        padding: "0.5rem",
        borderRadius: "10px",
      }}
    >
      <svg
        viewBox="0 0 35 150"
        style={{ userSelect: "none" }}
        ref={pointerSurface}
        onMouseMove={(ev) => handlePointerMove(ev)}
        onMouseDown={(ev) => handlePress(ev)}
        onMouseUp={(ev) => handleRelease(ev)}
      >
        <defs>
          <clipPath id="potentiometer_overflow">
            <rect x="0" rx="2" y="0" width={35} height={150} />
            <linearGradient
              id="gradientNormal"
              x1="0"
              y1="0"
              x2="800"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#ff5c85"></stop>
              <stop offset="0.14285714285714285" stop-color="#ff5881"></stop>
              <stop offset="0.2857142857142857" stop-color="#ff547d"></stop>
              <stop offset="0.42857142857142855" stop-color="#ff4f79"></stop>
              <stop offset="0.5714285714285714" stop-color="#ff4b74"></stop>
              <stop offset="0.7142857142857142" stop-color="#ff4770"></stop>
              <stop offset="0.8571428571428571" stop-color="#ff426b"></stop>
              <stop offset="1" stop-color="#ff3d67"></stop>
            </linearGradient>
          </clipPath>
        </defs>
        <g clipPath="url(#potentiometer_overflow)">
          <g className={styles.potentiometer_text}>
            <rect
              x={0}
              y={25}
              height={150}
              width={35}
              fill={"#dfdfdf"}
              rx={2}
            />
            <text
              fill={"url(#gradientNormal)"}
              x={4}
              y={35}
              fontSize={"0.40rem"}
            >
              250℃
            </text>
          </g>
          <motion.g
            className={styles.potentiometer_text}
            initial={{
              y: targetPosition.y,
            }}
            animate={{
              y: targetPosition.y,
            }}
            transition={{ type: "spring", mass: 0.05, stiffness: 100 }}
          >
            <rect
              x={0}
              y={0}
              height={150}
              width={35}
              fill={"url(#gradientNormal)"}
              rx={2}
            />
            <text fill="#efefef" x={4} y={10} fontSize={"0.40rem"}>
              250℃
            </text>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}

const _SliderBase = React.forwardRef(SliderBase);
export { _SliderBase as SliderBase };
