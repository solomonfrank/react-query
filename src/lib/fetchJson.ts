export class FetchError extends Error {
  response: Response;
  statusCode: number;
  constructor({
    message,
    response,
    statusCode,
  }: {
    message: string;
    response: Response;
    statusCode: number;
  }) {
    super(message);

    this.name = "FetchError";
    this.statusCode = statusCode;
    this.response = response;
    this.message = message;
  }
}
export const fetchJSON = async <JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const response = await fetch(input, init);

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    statusCode: response.status,
  });
};
