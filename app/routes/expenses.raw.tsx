import { LoaderFunction } from "@remix-run/node";
import { DUMMY_EXPENSES } from "~/datas/datas";

export const loader: LoaderFunction = () => {
  return DUMMY_EXPENSES;
}