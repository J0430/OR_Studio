export function toggle<T = boolean>(
  value: T,
  a: T = true as T,
  b: T = false as T
): T {
  return value === a ? b : a;
}
