import Joi from "joi";
import { SignupData } from "../types";

export default (data: SignupData) => {
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .error(new Error("user name is required")),
    password: Joi.string().allow("").min(8).required(),
  });

  const result = schema.validate(data);
  if (result.error) {
    return result.error.message;
  } else {
    return null;
  }
};
