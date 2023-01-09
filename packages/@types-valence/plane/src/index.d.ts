declare type dimensions2d = {
  width: number,
  height: number
}

export interface ValencePlaneProps extends dimensions2d {
  variant?: "Grid" | undefined,
  snapToGrid?: boolean,
  gridSize?: number 
}