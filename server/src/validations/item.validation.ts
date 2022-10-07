import Joi from "joi";
import { Order } from "../types";

export default (data: Order) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .valid("cake", "cookies", "muffins"),
    amount: Joi.number().required(),
    

  });

  const result = schema.validate(data);
  if (result.error) {
    return result.error.message;
  } else {
    return null;
  }
};
