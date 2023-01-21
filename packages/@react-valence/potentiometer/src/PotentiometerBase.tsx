import React, { CSSProperties, RefObject, useRef, useState } from "react";

// @react-aria https://react-spectrum.adobe.com/react-aria/
import { useNumberFormatter } from "@react-aria/i18n";
import { useSlider } from "@react-aria/slider";

// @react-stately https://react-spectrum.adobe.com/react-stately/
import { clamp, snapValueToStep, toFixedNumber } from "@react-stately/utils";

// @react-valence https://valence.austinpittman.net
import {
  classNames,
  svgPointerPosition,
} from "@react-valence/utils";
import {
  SVGBackgroundGradientFrost,
  SVGBackgroundGradientNormal,
} from "@react-valence/instrument";
import { useProviderProps } from "@react-valence/provider";

// @types-valence
import { FocusableRef } from "@types-valence/shared";
import { ValenceBarSliderBase } from "@types-valence/slider";

// @valence-styles
import styles from "@valence-styles/components/potentiometer/vars.module.scss";

// Motion
import { motion } from "framer-motion";

export interface SliderBaseChildArguments {
  inputRef: RefObject<HTMLInputElement>;
}

export interface SliderBaseProps<T = number[]> extends ValenceBarSliderBase<T> {

}

function PotentiometerBase(
  props: SliderBaseProps,
  ref: FocusableRef<HTMLDivElement>
) {
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 100 });
  const [isPressed, setPressed] = useState(false);

  // REFS
  const pointerSurface = useRef(null);

  function handlePointerMove(ev) {
    const pointerPosition = svgPointerPosition(ev, pointerSurface);
    if (isPressed) {
      const snappedY = snapValueToStep(pointerPosition.y, 0, 135, 5);
      console.log(snappedY, pointerPosition.y);
      setTargetPosition({x: pointerPosition.x, y: snappedY});
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
            <SVGBackgroundGradientNormal />
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

const _PotentiometerBase = React.forwardRef(PotentiometerBase);
export { _PotentiometerBase as PotentiometerBase };
