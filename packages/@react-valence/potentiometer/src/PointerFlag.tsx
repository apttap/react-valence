import { motion } from "framer-motion";

// @valence-styles
import styles from "@valence-styles/components/potentiometer/vars.module.scss";

export type ValencePointerPosition = {
  x: number;
  y: number;
};

export interface ValencePointerFlag {
  position: ValencePointerPosition;
  value: string;
}

export function PointerFlag(props: ValencePointerFlag) {
  const { position, value } = props;
  return (
    <motion.g
      className={styles.potentiometer_text}
      initial={{
        y: position.y,
      }}
      animate={{
        y: position.y,
      }}
      transition={{ type: "spring", mass: 0.05, stiffness: 100 }}
    >
      <line
        x1={0}
        y1={0}
        x2={35}
        y2={0}
        stroke={"url(#gradientNormal)"}
        strokeWidth={0.35}
      />
      {/* <line
        x1={0}
        y1={-1}
        x2={0}
        y2={1}
        stroke={"url(#gradientNormal)"}
        strokeWidth={0.7}
      /> */}
      <circle cx={0} cy={0} r={0.5} fill={"url(#gradientNormal)"}/>
      {/* <line
        x1={35}
        y1={-1}
        x2={35}
        y2={1}
        stroke={"url(#gradientNormal)"}
        strokeWidth={0.7}
      /> */}
      <circle cx={35} cy={0} r={0.5} fill={"url(#gradientNormal)"}/>
      <text fill={"url(#gradientNormal)"} x={4} y={10} fontSize={"0.40rem"}>
        {value}
      </text>
    </motion.g>
  );
}
