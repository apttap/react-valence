import { action, Story } from "@ladle/react";
//import { ErrorBoundary } from "@react-valence/story-utils";
import { Flex } from "@react-valence/layout";
import React from "react";
import { Potentiometer } from "..";
import { ValenceSliderProps } from "@types-valence/slider";

// let message = "Your browser may not support this set of format options.";
// .addDecorator((story) => (
//   <ErrorBoundary message={message}>{story()}</ErrorBoundary>
// ))

export default {
  title: "Potentiometer",
  component: Potentiometer,
};

const SliderRender: Story<ValenceSliderProps> = (props) => {
  return <Potentiometer {...props} />;
};

export const Default: Story<ValenceSliderProps> = SliderRender.bind({});
Default.args = { "aria-label": "Label" };
