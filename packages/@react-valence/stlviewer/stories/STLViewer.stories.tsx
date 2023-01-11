import { Story } from "@ladle/react";

import { ValencePlaneProps } from "@types-valence/plane";
import { Plane } from "../src";


export default {
  title: "STLViewer",
  component: Plane,
};

export const Default: Story<ValencePlaneProps> = (args) => (
  <Plane {...args}/>
);

Default.args = {
  width: 480,
  height: 480,
  gridSize: 30,
  snapToGrid: true
}