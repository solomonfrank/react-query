import { useState } from "react";
import { CreateProductReq } from "../api/createProduct";

export const useInput = (defaultValue: CreateProductReq) => {
  const [values, setValues] = useState(defaultValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return { onChange, values };
};
