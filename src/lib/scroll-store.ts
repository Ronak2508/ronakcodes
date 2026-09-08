export const scrollState = {
  progress: 0,
  velocity: 0,
  pointerX: 0,
  pointerY: 0,
};

export function setPointer(x: number, y: number) {
  if (typeof window === "undefined") return;
  scrollState.pointerX = (x / window.innerWidth) * 2 - 1;
  scrollState.pointerY = -((y / window.innerHeight) * 2 - 1);
}
