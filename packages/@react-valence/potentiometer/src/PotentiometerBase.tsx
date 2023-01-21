import React, {
  CSSProperties,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

// @react-aria https://react-spectrum.adobe.com/react-aria/
import { useNumberFormatter } from "@react-aria/i18n";
import { useSlider } from "@react-aria/slider";

// @react-stately https://react-spectrum.adobe.com/react-stately/
import { clamp, snapValueToStep, toFixedNumber } from "@react-stately/utils";

// @react-valence https://valence.austinpittman.net
import { classNames, svgPointerPosition } from "@react-valence/utils";
import {
  SVGBackgroundGradientFrost,
  SVGBackgroundGradientNormal,
} from "@react-valence/instrument";
import { useProviderProps } from "@react-valence/provider";

// @types-valence
import { FocusableRef } from "@types-valence/shared";
import { ValencePotentiometerBase } from "@types-valence/potentiometer";

// @valence-styles
import styles from "@valence-styles/components/potentiometer/vars.module.scss";

// Motion
import { motion } from "framer-motion";

export interface SliderBaseChildArguments {
  inputRef: RefObject<HTMLInputElement>;
}

export interface PotentiometerBaseProps<T = number[]>
  extends ValencePotentiometerBase<T> {}

function PotentiometerBase(
  props: PotentiometerBaseProps,
  ref: FocusableRef<HTMLDivElement>
) {
  let limits = {
    minHeight: 15,
    maxHeight: 150,
  };

  const [maxValue, setMaxValue] = useState(350);
  const [minValue, setMinValue] = useState(0);
  const [size, setSize] = useState({ width: 35, height: 150 });
  const [targetPosition, setTargetPosition] = useState({
    x: 0,
    y: limits.maxHeight - limits.minHeight,
  });
  const [targetValue, setTargetValue] = useState("0");
  const [currentValue, setCurrentValue] = useState("21");
  const [currentPostion, setCurrentPosition] = useState(115)
  const [isPressed, setPressed] = useState(false);

  // REFS
  const pointerSurface = useRef(null);

  // calc position to value
  const calcValueFromPosition = (position: number) => {
    let value = 0;
    let fullRange = limits.maxHeight - limits.minHeight;
    value = maxValue - maxValue * (targetPosition.y / fullRange);
    return value;
  };

  let formatter = useNumberFormatter({
    style: "unit",
    unitDisplay: "short",
    unit: "celsius",
  });

  function handlePointerMove(ev) {
    const maxMovement = limits.maxHeight - limits.minHeight;
    const pointerPosition = svgPointerPosition(ev, pointerSurface);
    const step = 1 * (maxMovement / maxValue);
    if (isPressed) {
      const snappedY = snapValueToStep(pointerPosition.y, 0, maxMovement, step);
      setTargetPosition({ x: pointerPosition.x, y: snappedY });
      let value = toFixedNumber(calcValueFromPosition(targetPosition.y), 5, 10);

      setTargetValue(formatter.format(value));
    }
  }

  useEffect(() => {
    setCurrentValue(formatter.format(19));
  }, []);

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
            <SVGBackgroundGradientFrost />
          </clipPath>
        </defs>
        <g clipPath="url(#potentiometer_overflow)">
          <g className={styles.potentiometer_text}>
            <rect
              x={0}
              y={currentPostion}
              height={size.height}
              width={size.width}
              fill={"#dfdfdf"}
              rx={2}
            />
            <text
              fill={"url(#gradientNormal)"}
              x={4}
              y={currentPostion + 10}
              fontSize={"0.40rem"}
            >
              {currentValue}
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
              height={size.height}
              width={size.width}
              fill={"url(#gradientNormal)"}
              rx={2}
            />
            <text fill="#efefef" x={4} y={10} fontSize={"0.40rem"}>
              {targetValue}
            </text>
          </motion.g>
          {currentPostion > targetPosition.y && (
            <g className={styles.potentiometer_text}>
              <rect
                x={0}
                y={currentPostion}
                height={size.height}
                width={size.width}
                fill={"#dfdfdf"}
                rx={2}
              />
              <text
                fill={"url(#gradientNormal)"}
                x={4}
                y={currentPostion + 10}
                fontSize={"0.40rem"}
              >
                {currentValue}
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

const _PotentiometerBase = React.forwardRef(PotentiometerBase);
export { _PotentiometerBase as PotentiometerBase };
