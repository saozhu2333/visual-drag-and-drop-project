export function deepCopy<T>(target: T): T {
    if (typeof target === "object" && target !== null) {
      const result: any = Array.isArray(target) ? [] : {};
      for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          if (typeof target[key] === "object") {
            result[key] = deepCopy(target[key]);
          } else {
            result[key] = target[key];
          }
        }
      }
      return result;
    }
    return target;
  }

export function getAssetsFile(url: string) {
  return new URL(`../assets/image/${url}`, import.meta.url).href;
}
