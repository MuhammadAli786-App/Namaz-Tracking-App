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
const cloudName = "des9c2jqi";
const uploadPreset = "My_unsigned_preset";

const profileImage = document.querySelector("#profileImage");
const imageUploader = document.querySelector("#ImageUploader");
let uploadedImageURL = "./images/default.webp";

profileImage.addEventListener("click", () => {
  imageUploader.click();
});


imageUploader.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    uploadedImageURL = data.secure_url;
    profileImage.src = uploadedImageURL;
  } catch (error) {
    alert("Image upload failed!");
  }
});
const showUserData = async (user) => {
  try {
    const userName = document.querySelector("#userName");
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const mobileNumber = document.querySelector("#mobileNumber");
    const email = document.querySelector("#email");
    const profileImage = document.querySelector("#profileImage");

    const UId = user.uid;
    const userRef = doc(db, "users", UId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      profileImage.src = userData.profileImage || "./images/default.webp";
      uploadedImageURL = userData.profileImage || "./images/default.webp";
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
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return alert("User data not found");
    if (mobileNumber && mobileNumber.length !== 11) {
      alert("Mobile number must be exactly 11 digits.");
      return;
    }
    const existingData = userSnap.data();
    const updatedObj = {
      firstName: firstName || existingData.firstName,
      lastName: lastName || existingData.lastName,
      mobileNumber: mobileNumber || existingData.mobileNumber,
      profileImage: uploadedImageURL || existingData.profileImage,
    };
    await updateDoc(userRef, updatedObj);
    const userName = document.querySelector("#userName");
    userName.innerHTML = `👋AssalamOAlakium ${updatedObj.firstName} ${updatedObj.lastName}`;
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
