import { Story } from "@ladle/react";

import { ValencePlaneProps } from "../../../@types-valence/plane/src";
import { Plane } from "../src";


export default {
  title: "Plane",
  component: Plane,
};

export const Default: Story<ValencePlaneProps> = (args) => (
  <Plane {...args}/>
);

Default.args = {
  width: 480,
  height: 480,
  gridSize: 20,
  snapToGrid: true
}