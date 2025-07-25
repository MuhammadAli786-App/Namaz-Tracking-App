import {
  auth,
  doc,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "./firebase.js";

const loginHandler = async () => {
  try {
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    if (!email.value || !password.value) {
      alert("Missing Fields Are Required");
      return;
    }

    const userRes = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const userUId = userRes.user.uid;
    localStorage.setItem("uid", userUId);
    alert("Login Successfull!");
    window.location.replace("./dashboard.html");
  } catch (error) {
    alert(error.message);
  }
};

window.loginHandler = loginHandler;
