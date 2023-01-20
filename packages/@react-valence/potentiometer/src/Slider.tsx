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
  SliderBase,
  SliderBaseChildArguments,
  SliderBaseProps,
} from "./SliderBase";
import { SliderThumb } from "./SliderThumb";

function Slider(props: ValenceSliderProps, ref: FocusableRef<HTMLDivElement>) {
  let {
    onChange,
    onChangeEnd,
    value,
    defaultValue,
    isFilled,
    fillOffset,
    trackGradient,
    getValueLabel,
    ...otherProps
  } = props;

  let baseProps: Omit<SliderBaseProps, "children"> = {
    ...otherProps,
    // Normalize `value: number[]` to `value: number`
    value: value != null ? [value] : undefined,
    defaultValue: defaultValue != null ? [defaultValue] : undefined,
    onChange: (v: number[]): void => {
      onChange?.(v[0]);
    },
    onChangeEnd: (v: number[]): void => {
      onChangeEnd?.(v[0]);
    },
    getValueLabel: getValueLabel ? ([v]) => getValueLabel(v) : undefined,
  };

  let { direction } = useLocale();

  return (
    <SliderBase/>
  );
}

/**
 * Sliders allow users to quickly select a value within a range. They should be used when the upper and lower bounds to the range are invariable.
 */
const _Slider = React.forwardRef(Slider);
export { _Slider as Potentiometer };
