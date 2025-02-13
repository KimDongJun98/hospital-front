import fetchRequest from "./fetchRequest";

export type RequestParams<T> = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  // headers: { [key: string]: any };
  headers: Record<string, unknown>;
  body?: T;
};

export type AjaxInstance = typeof fetchRequest;
