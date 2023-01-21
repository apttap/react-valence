import { MouseEvent, Ref, useRef } from "react";

export function svgPointerPosition(ev: MouseEvent, ref: Ref<HTMLOrSVGElement>) {
  var pt = ref.current.createSVGPoint();
  pt.x = ev.pageX;
  pt.y = ev.pageY;
  pt = pt.matrixTransform(ref.current.getScreenCTM().inverse());

  return { x: pt.x, y: pt.y };
}
