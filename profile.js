import {
  auth,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
  updateDoc,
} from "./firebase.js";

const logoutHandler = () => {
  window.location.replace("./index.html");
};
const trackerPage = () => {
  window.location.href = "./dashboard.html";
};
const PreviousPage = () => {
  window.location.href = "./previous.html";
};

const showUserData = async (user) => {
  try {
    const userName = document.querySelector("#userName");
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const mobileNumber = document.querySelector("#mobileNumber");
    const email = document.querySelector("#email");

    const UId = user.uid;
    const userRef = doc(db, "users", UId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      userName.innerHTML = `👋AssalamOAlakium ${
        userData.firstName + " " + userData.lastName
      }`;

      firstName.value = userData.firstName || "";
      lastName.value = userData.lastName || "";
      mobileNumber.value = userData.mobileNumber || "";
      email.value = userData.email || "";
    }
  } catch (error) {
    alert(error.message);
  }
};

const updateUserData = async () => {
  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();
  const mobileNumber = document.querySelector("#mobileNumber").value.trim();

  const user = auth.currentUser;
  if (!user) return alert("User not authenticated");
  try {
    const userRef = doc(db, "users", user.uid);
    const updatedObj = {
      firstName,
      lastName,
      mobileNumber,
    };
    await updateDoc(userRef, updatedObj);
    alert("Profile updated successfully!");
  } catch (error) {
    alert(error.message);
  }
};
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await showUserData(user);
  }
});
window.trackerPage = trackerPage;
window.logoutHandler = logoutHandler;
window.PreviousPage = PreviousPage;
window.updateUserData = updateUserData;
