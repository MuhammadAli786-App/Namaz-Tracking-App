// import {
//   doc,
//   onAuthStateChanged,
//   auth,
//   getDoc,
//   db,
//   updateDoc,
//   collection,
//   getDocs,
// } from "./firebase.js";

// const showUserDetails = async (user) => {
//   try {
//     const userName = document.querySelector("#userName");

//     const UId = user.uid;
//     const userRef = doc(db, "users", UId);
//     const userSnap = await getDoc(userRef);
//     if (userSnap.exists()) {
//       const userData = userSnap.data();
//       userName.innerHTML = `👋AssalamOAlakium ${
//         userData.firstName + " " + userData.lastName
//       }`;
//     } else {
//       window.location.replace("./index.html");
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// };

// const attachUpdateEvents = () => {
//   document.querySelectorAll("button[data-namaz]").forEach((btn) => {
//     btn.addEventListener("click", async () => {
//       const namaz = btn.dataset.namaz;
//       const date = btn.dataset.date;
//       const uid = btn.dataset.uid;
//       console.log("update for doc id:", date);
//       const ref = doc(db, "users", uid, "namazTracking", date);
//       const snap = await getDoc(ref);
//       if (snap.exists()) {
//         const current = snap.data()[namaz];
//         const updated = !current;

//         await updateDoc(ref, { [namaz]: updated });

//         btn.classList.toggle("green", updated);
//         const icon = btn.querySelector("i");
//         icon.className = `fa-solid ${updated ? "fa-check" : "fa-xmark"}`;

//         const updatedSnap = await getDoc(ref);
//         const newData = updatedSnap.data();

//         const allOffered = ["Fajr", "Duhur", "Asr", "Maghrib", "Isha"].every(
//           (n) => newData[n]
//         );

//         const safeId = date.replaceAll("/", "-");
//         const statusPara = document.querySelector(
//           `#StatusUpdatePara-${safeId}`
//         );
//         if (statusPara) {
//           if (allOffered) {
//             statusPara.textContent = `✅ All Namaz marked as offered`;
//           } else {
//             statusPara.textContent = `${namaz} Prayer marked as ${
//               updated ? "offered ✅" : "not offered ❌"
//             }`;
//           }
//         }
//       }
//     });
//   });
// };

// const createRecordUI = (date, data, uid, email) => {
//   const readableDate = new Date(date).toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   const safeId = date.trim().replaceAll("/", "-");
//   const allOffered = ["Fajr", "Duhur", "Asr", "Maghrib", "Isha"].every(
//     (n) => data[n]
//   );
//   const statusText = allOffered
//     ? "✅ All Namaz marked as offered"
//     : "Status: Not updated ❌";
//   return `
//     <div class="NamazCon">
//       <h1>${readableDate}</h1>
//       <h3 class="emailHeading"> Welcome to your Namaz Tracker Logged in as: ${email}</h3>
//       <ul>
//         ${["Fajr", "Duhur", "Asr", "Maghrib", "Isha"]
//           .map((namaz) => {
//             const offered = data[namaz];
//             const icon = offered ? "fa-check" : "fa-xmark";
//             const btnClass = offered ? "green" : "";
//             return `
//               <li>
//                 ${namaz}
//                 <button
//                   class="${btnClass}"
//                   data-namaz="${namaz}"
//                   data-date="${date}"
//                   data-uid="${uid}"
//                 >
//                   <i class="fa-solid ${icon}"></i>
//                 </button>
//               </li>
//             `;
//           })
//           .join("")}
//       </ul>
//       <div class="statusCon">
//         <p id="StatusUpdatePara-${safeId}">${statusText}</p>
//       </div>
//     </div>
 
//   `;
// };
// const renderPreviousRecords = async (user) => {
//   try {
//     const parent = document.querySelector("#parent");

//     let recordsContainer = document.querySelector("#recordsContainer");
//     if (!recordsContainer) {
//       recordsContainer = document.createElement("div");
//       recordsContainer.id = "recordsContainer";
//       parent.appendChild(recordsContainer);
//     }
//     recordsContainer.innerHTML = "";

//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);
//     const userData = userSnap.exists() ? userSnap.data() : {};
//     const userEmail = userData.email || "Not available";
//     const accountCreatedAt = new Date(user.metadata.creationTime);
//     const today = new Date();

//     const namazCollectionRef = collection(db, "users", user.uid, "namazTracking");
//     const allDocsSnap = await getDocs(namazCollectionRef);
//     const existingData = {};

//     allDocsSnap.forEach((docSnap) => {
//       existingData[docSnap.id] = docSnap.data();
//     });
//  console.log("existing ids:", Object.keys(existingData)); 

//     let currentDate = new Date(accountCreatedAt);

//     while (currentDate <= today) {
//       const dateStr = currentDate.toISOString().split("T")[0]; 

//       const data = existingData[dateStr] || {
//         Fajr: false,
//         Duhur: false,
//         Asr: false,
//         Maghrib: false,
//         Isha: false,
//       };

//       const html = createRecordUI(dateStr, data, user.uid, userEmail);
//       recordsContainer.innerHTML += html;

//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     attachUpdateEvents();
//   } catch (error) {
//     alert(error.message);
//   }
// };
// const initPreviousPage = async (user) => {
//   await showUserDetails(user);
//   await renderPreviousRecords(user);
// };
// const logoutHandler = () => {
//   window.location.replace("./index.html");
// };
// const trackerPage = () => {
//   window.location.href = "./dashboard.html";
// };
// const EditPage = () => {
//   window.location.href = "./editprofile.html";
// };
// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     await initPreviousPage(user);
//   } else {
//     window.location.replace("./index.html");
//   }
// });
// window.EditPage = EditPage;
// window.trackerPage = trackerPage;
// window.logoutHandler = logoutHandler;




import {
  doc,
  onAuthStateChanged,
  auth,
  getDoc,
  db,
  updateDoc,
  setDoc,
  collection,
  getDocs,
  onSnapshot
} from "./firebase.js";

const showUserDetails = async (user) => {
  try {
    const userName = document.querySelector("#userName");
    const UId = user.uid;
    const userRef = doc(db, "users", UId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      userName.innerHTML = `👋AssalamOAlakium ${
        userData.firstName + " " + userData.lastName
      }`;
    } else {
      window.location.replace("./index.html");
    }
  } catch (error) {
    alert(error.message);
  }
};

// const attachUpdateEvents = () => {
//   document.querySelectorAll("button[data-namaz]").forEach((btn) => {
//     btn.addEventListener("click", async () => {
//       const namaz = btn.dataset.namaz;
//       const date = btn.dataset.date; // yyyy-mm-dd
//       const uid = btn.dataset.uid;

//       const ref = doc(db, "users", uid, "namazTracking", date);
//       const snap = await getDoc(ref);

//       if (snap.exists()) {
//         const current = snap.data()[namaz];
//         const updated = !current;

//         // 🔥 Agar doc exist karta hai -> update karo
//         await updateDoc(ref, { [namaz]: updated });

//         // UI update
//         btn.classList.toggle("green", updated);
//         const icon = btn.querySelector("i");
//         icon.className = `fa-solid ${updated ? "fa-check" : "fa-xmark"}`;

//         const updatedSnap = await getDoc(ref);
//         const newData = updatedSnap.data();

//         const allOffered = ["Fajr", "Duhur", "Asr", "Maghrib", "Isha"].every(
//           (n) => newData[n]
//         );

//         const statusPara = document.querySelector(`#StatusUpdatePara-${date}`);
//         if (statusPara) {
//           statusPara.textContent = allOffered
//             ? `✅ All Namaz marked as offered`
//             : `${namaz} Prayer marked as ${updated ? "offered ✅" : "not offered ❌"}`;
//         }
//       } else {
//         // 🔥 Agar doc exist nahi karta -> naya doc banao
//         await setDoc(ref, {
//           Fajr: false,
//           Duhur: false,
//           Asr: false,
//           Maghrib: false,
//           Isha: false,
//           [namaz]: true,
//         });

//         btn.classList.add("green");
//         const icon = btn.querySelector("i");
//         icon.className = "fa-solid fa-check";

//         const statusPara = document.querySelector(`#StatusUpdatePara-${date}`);
//         if (statusPara) {
//           statusPara.textContent = `${namaz} Prayer marked as offered ✅`;
//         }
//       }
//     });
//   });
// };

// const createRecordUI = (date, data, uid, email) => {
//   const readableDate = new Date(date).toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const allOffered = ["Fajr", "Duhur", "Asr", "Maghrib", "Isha"].every(
//     (n) => data[n]
//   );
//   const statusText = allOffered
//     ? "✅ All Namaz marked as offered"
//     : "Status: Not updated ❌";

//   return `
//     <div class="NamazCon">
//       <h1>${readableDate}</h1>
//       <h3 class="emailHeading"> Logged in as: ${email}</h3>
//       <ul>
//         ${["Fajr", "Duhur", "Asr", "Maghrib", "Isha"]
//           .map((namaz) => {
//             const offered = data[namaz];
//             const icon = offered ? "fa-check" : "fa-xmark";
//             const btnClass = offered ? "green" : "";
//             return `
//               <li>
//                 ${namaz}
//                 <button
//                   class="${btnClass}"
//                   data-namaz="${namaz}"
//                   data-date="${date}"
//                   data-uid="${uid}"
//                 >
//                   <i class="fa-solid ${icon}"></i>
//                 </button>
//               </li>
//             `;
//           })
//           .join("")}
//       </ul>
//       <div class="statusCon">
//         <p id="StatusUpdatePara-${date}">${statusText}</p>
//       </div>
//     </div>
//   `;
// };

const attachUpdateEvents = () => {
  document.querySelectorAll("button[data-namaz]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const namaz = btn.dataset.namaz;
      const date = btn.dataset.date;
      const uid = btn.dataset.uid;

      const ref = doc(db, "users", uid, "namazTracking", date);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const current = snap.data()[namaz];
        const updated = !current;

        // 🔥 sirf Firestore update karo
        await updateDoc(ref, { [namaz]: updated });

        // ❌ ye hatao:
        // btn.classList.toggle("green", updated);
        // const icon = btn.querySelector("i");
        // icon.className = `fa-solid ${updated ? "fa-check" : "fa-xmark"}`;
        // kyunki ye kam to `onSnapshot` se hoga
      }
    });
  });
};


const createRecordUI = (date, data, uid, email) => {
  // date ko directly readable banado
  const readableDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const safeId = date.replaceAll("/", "-");
  const allOffered = ["Fajr", "Duhur", "Asr", "Maghrib", "Isha"].every(
    (n) => data[n]
  );

  const statusText = allOffered
    ? "✅ All Namaz marked as offered"
    : "Status: Not updated ❌";

  return `
    <div class="NamazCon">
      <h1>${readableDate}</h1>
      <h3 class="emailHeading"> Welcome to your Namaz Tracker Logged in as: ${email}</h3>
      <ul>
        ${["Fajr", "Duhur", "Asr", "Maghrib", "Isha"]
          .map((namaz) => {
            const offered = data[namaz];
            const icon = offered ? "fa-check" : "fa-xmark";
            const btnClass = offered ? "green" : "";
            return `
              <li>
                ${namaz}
                <button
                  class="${btnClass}"
                  data-namaz="${namaz}"
                  data-date="${date}"
                  data-uid="${uid}"
                >
                  <i class="fa-solid ${icon}"></i>
                </button>
              </li>
            `;
          })
          .join("")}
      </ul>
      <div class="statusCon">
        <p id="StatusUpdatePara-${safeId}">${statusText}</p>
      </div>
    </div>
  `;
};

// const renderPreviousRecords = async (user) => {
//   try {
//     const parent = document.querySelector("#parent");

//     let recordsContainer = document.querySelector("#recordsContainer");
//     if (!recordsContainer) {
//       recordsContainer = document.createElement("div");
//       recordsContainer.id = "recordsContainer";
//       parent.appendChild(recordsContainer);
//     }
//     recordsContainer.innerHTML = "";

//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);
//     const userData = userSnap.exists() ? userSnap.data() : {};
//     const userEmail = userData.email || "Not available";

//     const accountCreatedAt = new Date(user.metadata.creationTime);
//     const today = new Date();

//     const namazCollectionRef = collection(db, "users", user.uid, "namazTracking");
//     const allDocsSnap = await getDocs(namazCollectionRef);
//     const existingData = {};

//     allDocsSnap.forEach((docSnap) => {
//       existingData[docSnap.id] = docSnap.data();
//     });

//     let currentDate = new Date(accountCreatedAt);

//     while (currentDate <= today) {
//       const dateStr = currentDate.toISOString().split("T")[0]; // yyyy-mm-dd

//       const data = existingData[dateStr] || {
//         Fajr: false,
//         Duhur: false,
//         Asr: false,
//         Maghrib: false,
//         Isha: false,
//       };

//       const html = createRecordUI(dateStr, data, user.uid, userEmail);
//       recordsContainer.innerHTML += html;

//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     attachUpdateEvents();
//   } catch (error) {
//     alert(error.message);
//   }
// };



const renderPreviousRecords = async (user) => {
  try {
    const parent = document.querySelector("#parent");

    let recordsContainer = document.querySelector("#recordsContainer");
    if (!recordsContainer) {
      recordsContainer = document.createElement("div");
      recordsContainer.id = "recordsContainer";
      parent.appendChild(recordsContainer);
    }

    const namazCollectionRef = collection(db, "users", user.uid, "namazTracking");

    // 🔥 Real-time listener
    onSnapshot(namazCollectionRef, (snapshot) => {
      recordsContainer.innerHTML = "";

      const existingData = {};
      snapshot.forEach((docSnap) => {
        existingData[docSnap.id] = docSnap.data();
      });

      const accountCreatedAt = new Date(user.metadata.creationTime);
      const today = new Date();

      let currentDate = new Date(accountCreatedAt);

      while (currentDate <= today) {
        const dateStr = currentDate.toISOString().split("T")[0];

        const data = existingData[dateStr] || {
          Fajr: false,
          Duhur: false,
          Asr: false,
          Maghrib: false,
          Isha: false,
        };

        const html = createRecordUI(dateStr, data, user.uid, user.email);
        recordsContainer.innerHTML += html;

        currentDate.setDate(currentDate.getDate() + 1);
      }

      attachUpdateEvents();
    });
  } catch (error) {
    alert(error.message);
  }
};


const initPreviousPage = async (user) => {
  await showUserDetails(user);
  await renderPreviousRecords(user);
};

const logoutHandler = () => {
  window.location.replace("./index.html");
};
const trackerPage = () => {
  window.location.href = "./dashboard.html";
};
const EditPage = () => {
  window.location.href = "./editprofile.html";
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await initPreviousPage(user);
  } else {
    window.location.replace("./index.html");
  }
});

window.EditPage = EditPage;
window.trackerPage = trackerPage;
window.logoutHandler = logoutHandler;
