import React, {
  ReactElement,
  ReactSVGElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { motion, useSpring } from "framer-motion";

// @react-valence
import {
  SVGBackgroundGradientFrost,
  SVGBackgroundGradientNormal,
} from "@react-valence/instrument";

// @types-valence
import {
  DOMRef,
  DOMRefValue,
  FocusableRefValue,
  LabelPosition,
} from "@types-valence/shared";

import { ValencePlaneProps } from "../../../@types-valence/plane/src";

// @valence-icons
import ExclamationTriangleFill from "@valence-icons/ui/AlertFill";
import CaretDown from "@valence-icons/ui/ArrowDownSLine";

// @valence-styles
import toolstyles from "@valence-styles/components/tool/vars.module.scss";
import styles from "@valence-styles/components/plane/vars.module.scss";
import { HomeButton } from "./HomeButton";
import ssrTeardown from "@react-valence/test-utils/src/ssrTeardown";
import { svgPointerPosition } from "@react-valence/utils";
import { snapValueToStep } from "@react-aria/utils";

function Plane<T extends object>(
  props: ValencePlaneProps,
  ref: DOMRef<HTMLDivElement>
) {
  const valenceVars = {
    baseSize: 16,
    baseUnit: 1,
    lineHeight: 1.619,
  };

  const planeVars = {
    physical: {
      units: "mm",
      width: 300,
      height: 300,
    },
    display: {
      width: 4,
      height: 4,
    },
    style: {
      variant: "grid",
      gridSize: 10,
      subDivision: 2,
    },
  };

  const planer = {
    width: props.width,
    height: props.height,
    margin: 48, //(valenceVars.lineHeight * valenceVars.baseSize)*2,
  };

  let gridSize = planer.width / props.gridSize;

  // REFS
  const pointerSurface = useRef(null);
  const pointerFlagText = useRef(null);

  // STATE
  const [dimensionRatio, setDimensionRatio] = useState({ x: 0, y: 0 });
  const [flagPosition, setFlagPosition] = useState({ x: 5, y: 5 });
  const [planeDimensions, setPlaneDimensions] = useState({
    units: "mm",
    x: 300,
    y: 300,
  });
  const [pointerCoord, setPointerCoord] = useState({ x: 0, y: 0 });
  const [pointerControlsVisible, setPointerControlsVisible] = useState(false);
  const [pointerFlagTextWidth, setPointerFlagTextWidth] = useState(0);
  const [selectedCoord, setSelectedCoord] = useState({ x: 0, y: 0 });

  const calcDimensionCoordsFromPixels = () => {
    let ratio = {
      x: planeDimensions.x / planer.width,
      y: planeDimensions.y / planer.height,
    };
    setDimensionRatio(ratio);
  };

  useEffect(calcDimensionCoordsFromPixels, []);

  const updatePointerPos = (ev) => {
    let coords = svgPointerPosition(ev, pointerSurface);

    if (props.snapToGrid) {
      coords.x = snapValueToStep(coords.x, 0, planer.width, 8);
      coords.y = snapValueToStep(coords.y, 0, planer.width, 8);
    }

    setPointerCoord(coords);
    setPointerFlagTextWidth(pointerFlagText.current.getComputedTextLength());

    let newFlagPosition = { ...flagPosition };

    if (pointerCoord.x > planer.width / 2) {
      newFlagPosition.x = -1 * (pointerFlagTextWidth + 25);
    } else {
      newFlagPosition.x = 5;
    }

    if (pointerCoord.y > planer.height / 2) {
      newFlagPosition.y = -30;
    } else {
      newFlagPosition.y = 5;
    }

    setFlagPosition(newFlagPosition);
  };

  const updateSelectedPos = () => {
    setSelectedCoord(pointerCoord);
  };

  const handlePointerLeave = () => {
    setPointerCoord(selectedCoord);
    setPointerControlsVisible(false);
  };

  let grid = [];

  for (let rows = 0; rows <= props.gridSize; ++rows) {
    let posY = gridSize * rows;

    grid.push(
      <line
        x1={0}
        y1={posY}
        x2={planer.width}
        y2={posY}
        stroke={"rgba(255,255,255,0.25)"}
        fill={"transparent"}
      />
    );

    let posX = gridSize * rows;

    grid.push(
      <line
        x1={posX}
        y1={0}
        x2={posX}
        y2={planer.width}
        stroke={"rgba(255,255,255,0.25)"}
        fill={"transparent"}
      />
    );
  }

  return (
    <div
      className={toolstyles.Tool_socket}
      style={{ width: planer.width, height: planer.height }}
    >
      <div className={styles.Plane}>
        <svg
          viewBox={`0 0 ${planer.width} ${planer.height}`}
          ref={pointerSurface}
        >
          <defs>
            <clipPath id="pointerClip">
              <rect
                x={planer.margin - 6}
                y={planer.margin - 6}
                width={planer.width + 12}
                height={planer.height + 12}
              />
            </clipPath>
            <SVGBackgroundGradientNormal />
            <SVGBackgroundGradientFrost />
          </defs>
          {/* <rect
            x={0}
            y={0}
            rx={10}
            fill={"url(#gradientNormal)"}
            width={set.size.width}
            height={set.size.height}
          /> */}

          <rect
            x={0}
            y={0}
            width={planer.width}
            height={planer.height}
            fill={"url(#gradientFrost)"}
          />
          {grid}
          <circle
            cx={selectedCoord.x}
            cy={selectedCoord.y}
            r={10}
            fill={"transparent"}
            stroke={"white"}
            strokeWidth={2}
          />
          <g>
            <motion.g
              className={".PointerControls"}
              width={planer.width}
              height={planer.height}
              initial={{
                x: selectedCoord.x,
                y: selectedCoord.x,
                opacity: 0,
              }}
              animate={{
                x: pointerCoord.x,
                y: pointerCoord.y,
                opacity: pointerControlsVisible ? 1 : 0,
              }}
              transition={{ type: "spring", mass: 0.05, stiffness: 100 }}
            >
              <circle cx={0} cy={0} r={6} fill={"white"} />
              <line
                x1={planer.width * -2}
                y1={0}
                x2={planer.width * 2}
                y2={0}
                stroke="white"
                strokeWidth={1}
              />
              <line
                x1={0}
                y1={planer.height * -2}
                x2={0}
                y2={planer.height * 2}
                stroke="white"
                strokeWidth={1}
              />
              <motion.g
                transform={`translate(${flagPosition.x}, ${flagPosition.y})`}
              >
                <rect
                  rx={13}
                  width={pointerFlagTextWidth + 20}
                  height={26}
                  fill={"white"}
                />
                <text
                  x={10}
                  y={19}
                  fill={"hotpink"}
                  fontWeight={600}
                  className={styles.PointerFlagCoords}
                  ref={pointerFlagText}
                >
                  {pointerCoord.x * dimensionRatio.x},{" "}
                  {pointerCoord.y * dimensionRatio.x}
                </text>
              </motion.g>
            </motion.g>
          </g>
          <rect
            onMouseMove={(e) => updatePointerPos(e)}
            onClick={() => updateSelectedPos()}
            onMouseEnter={() => setPointerControlsVisible(true)}
            onMouseLeave={() => handlePointerLeave()}
            x={0}
            y={0}
            width={planer.width}
            height={planer.height}
            fill={"transparent"}
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Pickers allow users to choose a single option from a collapsible list of options when space is limited.
 */
// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _Plane = React.forwardRef(Plane) as <T>(
  props: ValencePlaneProps & { ref?: DOMRef<HTMLDivElement> }
) => ReactElement;
export { _Plane as Plane };
