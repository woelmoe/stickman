export const maths = {
  toRadians: (value:number) => value * (Math.PI / 180),
  centerObjectByWidth: (widthOuter:number, widthInner:number) => widthOuter / 2 - widthInner / 2,
  getCoordsX: (el:HTMLElement|undefined): number|undefined => {
    if (el !== undefined) return el.getBoundingClientRect().x
    else return 0
  }
}
