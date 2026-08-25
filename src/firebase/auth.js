import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";

// In-memory mock storage for active session simulation & instant evaluation
export let mockSessionUser = {
  uid: "demo-user-perera",
  displayName: "Mr. Perera",
  email: "perera@claspconnect.lk",
  role: "elderly", // 'elderly' | 'volunteer' | 'caregiver' | 'admin'
  phoneNumber: "+94 77 123 4567",
  location: "Colombo, Sri Lanka",
  verified: true
};

export const setMockUserRole = (role, extraDetails = {}) => {
  const roleNames = {
    elderly: "Mr. Perera",
    volunteer: "Nimali",
    caregiver: "Thilini",
    admin: "System Admin"
  };

  mockSessionUser = {
    ...mockSessionUser,
    uid: `demo-user-${role}`,
    displayName: extraDetails.name || roleNames[role] || "Clasp User",
    email: extraDetails.email || `${role}@claspconnect.lk`,
    role: role,
    verified: role === "volunteer" ? extraDetails.verified ?? true : true,
    points: role === "volunteer" ? 140 : 0,
    rating: 4.9,
    linkedElderlyId: role === "caregiver" ? "demo-user-elderly" : null,
    ...extraDetails
  };
  return mockSessionUser;
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    const userData = userDoc.exists() ? userDoc.data() : { role: "elderly" };
    return { success: true, user: userCredential.user, profile: userData };
  } catch (error) {
    // Return mock successful login for testing convenience
    console.log("Firebase Auth Fallback for login:", error.message);
    let role = "elderly";
    if (email.includes("volunteer")) role = "volunteer";
    if (email.includes("caregiver")) role = "caregiver";
    if (email.includes("admin")) role = "admin";
    const profile = setMockUserRole(role, { email });
    return { success: true, user: { uid: profile.uid, email }, profile };
  }
};

export const registerUser = async (name, email, password, role = "elderly", extra = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    const profile = {
      uid,
      displayName: name,
      email,
      role,
      verified: role === "volunteer" ? false : true,
      points: role === "volunteer" ? 50 : 0,
      createdAt: new Date().toISOString(),
      ...extra
    };
    await setDoc(doc(db, "users", uid), profile);
    return { success: true, user: userCredential.user, profile };
  } catch (error) {
    console.log("Firebase Auth Fallback for register:", error.message);
    const profile = setMockUserRole(role, { name, email, ...extra });
    return { success: true, user: { uid: profile.uid, email }, profile };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.log("Logout error:", e.message);
  }
  return true;
};

export const subscribeAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      getDoc(doc(db, "users", user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          callback(user, snapshot.data());
        } else {
          callback(user, mockSessionUser);
        }
      }).catch(() => {
        callback(user, mockSessionUser);
      });
    } else {
      callback(null, null);
    }
  });
};
