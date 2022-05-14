export const maths = {
  toRadians: (value:number) => value * (Math.PI / 180),
  centerObjectByWidth: (widthOuter:number, widthInner:number) => widthOuter / 2 - widthInner / 2,
  getCoordsX: (el:HTMLElement|undefined): number => {
    if (el) return el.getBoundingClientRect().x
    else return 0
  },
  getCoordsBotX: (el:HTMLElement|undefined): number => {
    if (el) return el.getBoundingClientRect().right
    else return 0
  }
}
