import { compile } from "path-to-regexp";

export const pathToUrl = (path: string, params: Record<string, string>) => {
  const toPath = compile(path);
  return toPath(params);
};
