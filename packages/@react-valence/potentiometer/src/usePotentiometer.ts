import { useState } from "react";

export type PointerPosition2D = {
  x: number;
  y: number;
};

export interface ValencePotentiometerBaseProps {
    width: number;
    height: number;
    min: number;
    max: number;
    currentValue?: number;
    targetValue?: number;
  }

export function usePotentiometer(props: ValencePotentiometerBaseProps) {

  let limits = {
    minHeight: 15,
    maxHeight: 150,
  };

  const { width, height, min, max } = props;

  const [maxValue, setMaxValue] = useState(max);
  const [minValue, setMinValue] = useState(min);
  const [size, setSize] = useState({ width, height });
  const [currentSetpoint, setCurrentValue] = useState("21");
  const [currentPosition, setCurrentPosition] = useState(115);
  const [targetSetpoint, setTargetPosition] = useState({
    x: 0,
    y: limits.maxHeight - limits.minHeight,
  });
  const [targetValue, setTargetValue] = useState("0");
  const [targetBuffer, setTargetBuffer] = useState("0");
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [pointerValue, setPointerValue] = useState("0");
  const [isPressed, setPressed] = useState(false);
  const [isHovered, setHovered] = useState(false);
  return {
    width,
    height,
    maxValue,
    setMaxValue,
    minValue,
    setMinValue,
    size,
    setSize,
    currentValue: currentSetpoint,
    setCurrentValue,
    currentPosition,
    setCurrentPosition,
    targetPosition: targetSetpoint,
    setTargetPosition,
    targetValue,
    setTargetValue,
    targetBuffer,
    setTargetBuffer,
    pointerPosition,
    setPointerPosition,
    pointerValue,
    setPointerValue,
    isPressed,
    setPressed,
    isHovered,
    setHovered,
    minHeight: limits.minHeight,
    maxHeight: limits.maxHeight,
  };
}
