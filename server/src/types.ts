
import { Types } from 'mongoose';

export type User = {
  username: string
  password: string
  _id: Types.ObjectId
  validatePassword: (password: string) => Promise<boolean>
}
export type SignupData = {
  full_name: string;
  email: string;
  password: string;
};
export type Order = {
  order_item: string;
  state: string;
  order_id: string;
  branch_id: string;
  customer_id: string;
  created_at: number;
  updated_at: number;
  amount: string;

};
export type ResponseData = Record<string, any> | Record<string, any>[];
