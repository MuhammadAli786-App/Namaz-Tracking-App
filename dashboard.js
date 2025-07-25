import {
  doc,
  onAuthStateChanged,
  auth,
  getDoc,
  db,
  setDoc,
  updateDoc,
} from "./firebase.js";

const showUserDetails = async (user) => {
  try {
    const userName = document.querySelector("#userName");
    const userEmail = document.querySelector("#userEmail");

    const UId = user.uid;
    const userRef = doc(db, "users", UId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      userName.innerHTML = `👋AssalamOAlakium ${
        userData.firstName + " " + userData.lastName
      }`;
      userEmail.innerHTML = `Welcome to your Namaz Tracker Logged in as: ${userData.email}`;
    } else {
      window.location.replace("./index.html");
    }
  } catch (error) {
    alert(error.message);
  }
};

const createNamazTrackingForToday = async (user) => {
  try {
    const today = new Date().toLocaleDateString("en-CA");
    const trackingRef = doc(db, "users", user.uid, "namazTracking", today);
    console.log("today", today);

    const docSnap = await getDoc(trackingRef);

    if (!docSnap.exists()) {
      await setDoc(trackingRef, {
        Fajr: false,
        Duhur: false,
        Asr: false,
        Maghrib: false,
        Isha: false,
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

async function updateNamazStatus(namazName, btnElement) {
  try {
    const user = auth.currentUser;
    const today = new Date().toLocaleDateString("en-CA");
    const namazDocRef = doc(db, "users", user.uid, "namazTracking", today);
    let newStatus = false;
    const StatusUpdatePara = document.querySelector("#StatusUpdatePara");

    const docSnap = await getDoc(namazDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const currentStatus = data[namazName];
      newStatus = !currentStatus;

      await updateDoc(namazDocRef, {
        [namazName]: newStatus,
      });

      if (newStatus) {
        btnElement.classList.add("green");
        btnElement.innerHTML = `<i class="fa-solid fa-check"></i>`;
      } else {
        btnElement.classList.remove("green");
        btnElement.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      }

      const updatedSnap = await getDoc(namazDocRef);
      const updatedData = updatedSnap.data();

      const allOffered = ["Fajr", "Duhur", "Asr", "Maghrib", "Isha"].every(
        (n) => updatedData[n]
      );

      if (StatusUpdatePara) {
        if (allOffered) {
          StatusUpdatePara.textContent = `✅ All Namaz marked as offered`;
        } else {
          StatusUpdatePara.textContent = `${namazName} Prayer marked as ${
            newStatus ? "offered ✅" : "not offered ❌"
          }`;
        }
      }
    }

    console.log(`${namazName} updated to ${newStatus}`);
  } catch (error) {
    alert(error.message);
  }
}
const loadNamazStatusAndUpdateUI = async (user) => {
  try {
    const today = new Date().toLocaleDateString("en-CA");
    const namazDocRef = doc(db, "users", user.uid, "namazTracking", today);
    const docSnap = await getDoc(namazDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      let allOffered = true;
      Object.entries(data).forEach(([namazName, status]) => {
        const button = document.querySelector(
          `button[data-namaz="${namazName}"]`
        );

        if (!status) {
          allOffered = false;
        }
        if (button) {
          if (status) {
            button.classList.add("green");
            button.innerHTML = `<i class="fa-solid fa-check"></i>`;
          } else {
            button.classList.remove("green");
            button.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
          }
        }
      });
      if (StatusUpdatePara) {
        StatusUpdatePara.textContent = allOffered
          ? `✅ All Namaz marked as offered`
          : `Status: Not updated ❌`;
      }
    }
  } catch (error) {
    alert(error.message);
  }
};

const todayDate = () => {
  const today = new Date();
  const formateDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const Prayers = document.querySelector("#Prayers");
  Prayers.innerHTML = `Today's Prayers - ${formateDate}`;
};
const logoutHandler = () => {
  window.location.replace("./index.html");
};
const previousRecord = () => {
  window.location.href = "./previous.html";
};
const EditPage = () => {
  window.location.href = "./editprofile.html";
};
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await createNamazTrackingForToday(user);
    await showUserDetails(user);
    await loadNamazStatusAndUpdateUI(user);
  } else {
    window.location.replace("./index.html");
  }
});
window.logoutHandler = logoutHandler;
window.updateNamazStatus = updateNamazStatus;
window.onload = todayDate;
window.EditPage = EditPage;
window.previousRecord = previousRecord;
