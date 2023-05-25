import { ref, set } from "firebase/database";
import { database } from "../config/firebase";
import { v4 as uuid } from "uuid";

export function setNewProduct(product) {
  return set(ref(database, `products/${uuid()}`), product).catch(console.error);
}
