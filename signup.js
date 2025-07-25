import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  onAuthStateChanged,
  setDoc,
} from "./firebase.js";

const signupHandler = async () => {
  try {
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const mobileNumber = document.querySelector("#mobileNumber");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if (
      !firstName.value ||
      !lastName.value ||
      !mobileNumber.value ||
      !email.value ||
      !password.value
    ) {
      alert("Missing Fields Are Required!");
      return;
    }
    const res = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const UId = res.user.uid;

    const userObj = {
      firstName: firstName.value,
      lastName: lastName.value,
      mobileNumber: mobileNumber.value,
      email: email.value,
      uid: UId,
    };

    const userRes = await setDoc(doc(db, "users", UId), userObj);
    alert("Signup Successfull");
    window.location.replace("./dashboard.html");
    console.log(userObj);
  } catch (error) {
    alert(error.message);
  }
};

window.signupHandler = signupHandler;
