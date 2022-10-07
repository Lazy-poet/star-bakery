import { Response } from "express";
import { ResponseData } from "types";

class ResponseStatus {
  statusCode: number | null;
  status: "ok" | "failed" | null;
  message: string | null;
  data?: ResponseData;

  constructor() {
    this.statusCode = null;
    this.status = null;
    this.message = null;
    this.data = [];
  }

  /**
   *
   * @param res Response Object
   * @param statusCode success status code
   * @param message optional response message
   */
  public setSuccess(
    res: Response,
    statusCode: number,
    message: string | null,
    data?: ResponseData
  ): void {
    this.statusCode = statusCode;
    this.status = "ok";
    this.message = message;
    this.data = data;
    this.send(res);
  }
  /**
   *
   * @param res Response Object
   * @param statusCode success status code
   * @param message optional response message
   */
  public setErrorSuccess(
    res: Response,
    statusCode: number,
    message: string | null
  ): void {
    this.statusCode = statusCode;
    this.status = "failed";
    this.message = message;
    this.send(res);
  }

  /**
   *
   * @param res Response object
   * @param statusCode error status code
   * @param message error message
   */
  public setError(res: Response, statusCode: number, message: string): void {
    this.statusCode = statusCode;
    this.status = "failed";
    this.message = message;
    this.send(res);
  }

  private send(res: Response): Response {
    const result: {
      status: "ok" | "failed" | null;
      message?: string;
      data?: ResponseData;
    } = {
      status: this.status,
    };
    if (this.message) result.message = this.message;
    if (this.data) result.data = this.data;
    if (this.status === "ok") {
      return res.status(this.statusCode ? this.statusCode : 200).json(result);
    }

    return res.status(this.statusCode ? this.statusCode : 500).json({
      status: this.status,
      message: this.message,
    });
  }
}
export default new ResponseStatus();
