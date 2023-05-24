import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { get, ref } from "firebase/database";
import { auth, database } from "../config/firebase";

const provider = new GoogleAuthProvider();

export const signin = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export const signout = () => {
  signOut(auth).catch(console.error);
};

export const onAuthState = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });
};

const adminUser = async (user) => {
  return await get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    } else {
      return user;
    }
  });
};
