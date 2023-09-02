import { Printable } from "../utils/printable";
import { Comparable } from "./Comparable";

export interface Model<T> extends Printable, Comparable<T> {}