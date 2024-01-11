export function swap(l1, l2, programs) {
  const temp = programs[l1];
  programs[l1] = programs[l2];
  programs[l2] = temp;
}
