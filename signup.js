import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  onAuthStateChanged,
  setDoc,
} from "./firebase.js";
const cloudName = "des9c2jqi";
const uploadPreset = "My_unsigned_preset";
const profileImage = document.querySelector("#profileImage");
const imageUploader = document.querySelector("#ImageUploader");

let imageFile = null;
let uploadedImageURL = "./images/default.webp"; 


profileImage.addEventListener("click", () => {
  imageUploader.click();
});


imageUploader.addEventListener("change", async (e) => {
  imageFile = e.target.files[0];

  if (imageFile) {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      uploadedImageURL = data.secure_url;
      profileImage.src = uploadedImageURL;
    } catch (error) {
      alert("Image upload failed");
    }
  }
});

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
    if (mobileNumber.value.length !== 11) {
      alert("Mobile number must be exactly 11 digits!");
      return;
    }

    let imageURL = "./images/default.webp";

  
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
      profileImage: uploadedImageURL,
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
