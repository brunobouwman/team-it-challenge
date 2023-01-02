import { Console } from "console";
import { IComment } from "../types/common";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface Response<T> {
  data: T | null;
  error: string;
  code: string;
}

interface Props {
  endpoint: Endpoints;
  comments?: boolean;
  id?: number;
  payload?: IComment;
}

export enum Endpoints {
  LOCAL = "http://localhost:9000",
}

type BaseResponse = { data: any; error: ""; code: "" };

async function request<T>(func: Promise<Response<T>>): Promise<Response<T>> {
  const defaultTimeout = 5 * 1000; // 5 seconds

  const timeoutPromise = new Promise<Response<T>>((resolve) => {
    setTimeout(() => {
      resolve({ data: null, error: "fetch timed out", code: "internal_error" });
    }, defaultTimeout);
  });

  let race: Promise<Response<T>>;

  try {
    race = Promise.race([func, timeoutPromise]);
  } catch (err: any) {
    return Promise.resolve({
      data: null,
      error: err,
      code: "internal_error",
    });
  }

  return race;
}

const get = async (props: Props, method: Method) => {
  const { endpoint, comments, id } = props;

  const baseRequest = `${endpoint}/posts${id ? `/${id}` : ""}${
    comments ? "/comments" : ""
  }`;

  const request = await fetch(baseRequest, {
    method: method.toString(),
  });

  if (!request.ok) {
    return Promise.resolve({
      data: null,
      error: request.statusText,
      code: "internal_error",
    });
  }

  const response: BaseResponse = await request.json();

  return response;
};

const post = async (props: Props, method: Method) => {
  const { endpoint, id, payload } = props;
  console.log("payload", payload);

  const request = await fetch(`${endpoint}/posts/${id}/comments`, {
    method: method.toString(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!request.ok) {
    return Promise.resolve({
      data: null,
      error: request.statusText,
      code: "internal_error",
    });
  }

  const response: BaseResponse = await request.json();

  return response;
};

const put = async (props: Props, method: Method) => {
  const { endpoint, id, payload } = props;

  const request = await fetch(`${endpoint}/comments/${id}`, {
    method: method.toString(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!request.ok) {
    return Promise.resolve({
      data: null,
      error: request.statusText,
      code: "internal_error",
    });
  }

  const response: BaseResponse = await request.json();

  return response;
};

const api = {
  get: async <T>(props: Props): Promise<Response<T>> =>
    request(get(props, Method.GET)),
  post: async <T>(props: Props): Promise<Response<T>> =>
    request(post(props, Method.POST)),
  put: async <T>(props: Props): Promise<Response<T>> =>
    request(put(props, Method.PUT)),
};

export default api;
