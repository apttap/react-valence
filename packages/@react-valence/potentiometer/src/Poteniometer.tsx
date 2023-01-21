import React from "react";

// @react-aria https://react-spectrum.adobe.com/react-aria/
import { clamp } from "@react-aria/utils";
import { useLocale } from "@react-aria/i18n";

// @react-valence https://valence.austinpittman.net
import { classNames } from "@react-valence/utils";

// @types-valence
import { FocusableRef } from "@types-valence/shared";
import { ValenceSliderProps } from "@types-valence/slider";

// @valence-styles
import styles from "@valence-styles/components/slider/vars.module.scss";

import {
  PotentiometerBase,
} from "./PotentiometerBase";

function Potentiometer(props: ValenceSliderProps, ref: FocusableRef<HTMLDivElement>) {

  return (
    <PotentiometerBase/>
  );
}

/**
 * Potentiometers allow users to quickly select a value within a range. They should be used when the upper and lower bounds to the range are invariable.
 */
const _Potentiometer = React.forwardRef(Potentiometer);
export { _Potentiometer as Potentiometer };
