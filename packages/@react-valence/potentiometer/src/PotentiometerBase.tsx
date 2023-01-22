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

// Local
import { PointerFlag } from "./PointerFlag";
import { usePotentiometer } from "./usePotentiometer";

export interface SliderBaseChildArguments {
  inputRef: RefObject<HTMLInputElement>;
}

export interface ValencePotentiometerBaseProps {
  width: number;
  height: number;
  min: number;
  max: number;
  currentValue?: number;
  targetValue?: number;
}

function PotentiometerBase(
  props: ValencePotentiometerBaseProps,
  ref: FocusableRef<HTMLDivElement>
) {
  const {
    currentPosition,
    currentValue,
    height,
    isHovered,
    isPressed,
    maxHeight,
    maxValue,
    minHeight,
    minValue,
    pointerPosition,
    pointerValue,
    setCurrentPosition,
    setCurrentValue,
    setHovered,
    setPointerPosition,
    setPointerValue,
    setPressed,
    setTargetBuffer,
    setTargetPosition,
    setTargetValue,
    targetBuffer,
    targetPosition,
    targetValue,
    width,
  } = usePotentiometer(props);

  // REFS
  const pointerSurface = useRef(null);

  // calc position to value
  const calcValueFromPosition = (position: number) => {
    let value = 0;
    let fullRange = maxHeight - minHeight;
    value = maxValue - maxValue * (position / fullRange);
    return value;
  };

  let formatter = useNumberFormatter({
    style: "unit",
    unitDisplay: "short",
    unit: "celsius",
  });

  function handlePointerMove(ev) {
    const maxMovement = maxHeight - minHeight;
    const position = svgPointerPosition(ev, pointerSurface);

    const step = 1 * (maxMovement / maxValue);

    const snappedY = snapValueToStep(position.y, 0, maxMovement, step);
    setPointerPosition({ x: position.x, y: snappedY });
    let pointerValueBuffer = toFixedNumber(
      calcValueFromPosition(snappedY),
      0,
      10
    );
    setPointerValue(formatter.format(pointerValueBuffer));

    if (isPressed) {
      setTargetPosition({ x: position.x, y: snappedY });
      let value = toFixedNumber(calcValueFromPosition(targetPosition.y), 0, 10);

      setTargetValue(formatter.format(value));
    } else {
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

  function handleMouseEnter(ev) {
    setHovered(true);
  }

  function handleMouseLeave(ev) {
    setHovered(false);
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
        onMouseEnter={(ev) => {
          handleMouseEnter(ev);
        }}
        onMouseLeave={(ev) => {
          handleMouseLeave(ev);
        }}
        onMouseMove={(ev) => handlePointerMove(ev)}
        onMouseDown={(ev) => handlePress(ev)}
        onMouseUp={(ev) => handleRelease(ev)}
      >
        <defs>
          <clipPath id="potentiometer_overflow">
            <rect x="0" rx="2" y="-10" width={35} height={160} />
            <SVGBackgroundGradientNormal />
            <SVGBackgroundGradientFrost />
          </clipPath>
        </defs>
        <g clipPath="url(#potentiometer_overflow)">
          <g className={styles.potentiometer_text}>
            <rect
              x={0}
              y={currentPosition}
              height={height}
              width={width}
              fill={"url(#gradientNormal)"}
              rx={2}
            />
            <text
              fill={"#dfdfdf"}
              x={4}
              y={currentPosition + 10}
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
              height={height}
              width={width}
              fill={"#dfdfdf"}
              rx={2}
            />
            <motion.text
              fill="url(#gradientNormal)"
              x={4}
              y={10}
              fontSize={"0.40rem"}
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 0.25 : 1 }}
            >
              {targetValue}
            </motion.text>
          </motion.g>
          {currentPosition > targetPosition.y && (
            <motion.g
              className={styles.potentiometer_text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <rect
                x={0}
                y={currentPosition}
                height={height}
                width={width}
                fill={"url(#gradientNormal)"}
                rx={2}
              />
              <text
                fill={"#dfdfdf"}
                x={4}
                y={currentPosition + 10}
                fontSize={"0.40rem"}
              >
                {currentValue}
              </text>
            </motion.g>
          )}
          {isHovered && (
            <PointerFlag position={pointerPosition} value={pointerValue} />
          )}
        </g>
      </svg>
    </div>
  );
}

const _PotentiometerBase = React.forwardRef(PotentiometerBase);
export { _PotentiometerBase as PotentiometerBase };
