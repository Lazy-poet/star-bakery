import Joi from "joi";
import { Order } from "../types";

export default (data: Order) => {
  const schema = Joi.object({
    order_item: Joi.string()
      .required()
      .error(new Error("order item is required"))
      .valid("cake", "cookies", "muffins"),
    branch_id: Joi.string().required(),


  });

  const result = schema.validate(data);
  if (result.error) {
    return result.error.message;
  } else {
    return null;
  }
};
