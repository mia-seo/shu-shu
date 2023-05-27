import { get, ref, remove, set } from "firebase/database";
import { database } from "../config/firebase";
import { v4 as uuid } from "uuid";

export async function setNewProduct(product) {
  return set(ref(database, `products/${uuid()}`), product).catch(console.error);
}

export async function getProducts(category) {
  return await get(ref(database, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const products = Object.values(data);
        return filterProducts(category, products);
      } else {
        return [];
      }
    })
    .catch(console.error);
}

function filterProducts(category, products) {
  switch (category) {
    case "women": {
      return products.filter((product) => product.category === "women");
    }
    case "men": {
      return products.filter((product) => product.category === "men");
    }
    default: {
      return products;
    }
  }
}

export async function setCartItem(uid, product) {
  return set(ref(database, `carts/${uid}/${product.id}`), product);
}

export async function getCarts(uid) {
  return await get(ref(database, `carts/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.val();
        const products = data ? Object.values(data) : null;
        return products;
      } else {
        return null;
      }
    })
    .catch(console.error);
}

export async function deleteItem(uid, productId) {
  return remove(ref(database, `carts/${uid}/${productId}`)).catch(
    console.error
  );
}
