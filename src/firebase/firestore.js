import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy 
} from "firebase/firestore";
import { db } from "./config";
import { mockSessionUser } from "./auth";

// Initial Demo Seed Data matching SLIIT Lab Sheet Personas & Flows
export const MOCK_REQUESTS = [
  {
    id: "req-101",
    elderlyId: "demo-user-elderly",
    elderlyName: "Mr. Perera",
    elderlyAge: 72,
    location: "Colombo 03",
    activityType: "Grocery & Medication Help",
    activityIcon: "basket-outline",
    date: "2026-08-25",
    time: "10:00 AM",
    notes: "Need help picking up prescription from Pharmacy and light grocery.",
    status: "Pending", // Pending, Matched, In Progress, Completed, Cancelled
    volunteerId: null,
    volunteerName: null,
    createdAt: "2026-08-24T09:00:00Z"
  },
  {
    id: "req-102",
    elderlyId: "demo-user-elderly",
    elderlyName: "Mr. Perera",
    elderlyAge: 72,
    location: "Colombo 03",
    activityType: "Afternoon Companionship",
    activityIcon: "people-outline",
    date: "2026-08-26",
    time: "02:30 PM",
    notes: "Would love someone to talk to over tea and share daily stories.",
    status: "Matched",
    volunteerId: "demo-user-volunteer",
    volunteerName: "Nimali",
    volunteerPhone: "+94 71 987 6543",
    createdAt: "2026-08-24T10:15:00Z"
  },
  {
    id: "req-103",
    elderlyId: "demo-user-elderly-2",
    elderlyName: "Mrs. Jayasinghe",
    elderlyAge: 68,
    location: "Kandy Central",
    activityType: "Tech Support & Phone Help",
    activityIcon: "hardware-chip-outline",
    date: "2026-08-25",
    time: "04:00 PM",
    notes: "Help setting up video call application to talk with daughter in Canada.",
    status: "In Progress",
    volunteerId: "demo-user-volunteer",
    volunteerName: "Nimali",
    volunteerPhone: "+94 71 987 6543",
    createdAt: "2026-08-24T11:00:00Z"
  },
  {
    id: "req-104",
    elderlyId: "demo-user-elderly",
    elderlyName: "Mr. Perera",
    elderlyAge: 72,
    location: "Colombo 03",
    activityType: "Morning Park Walk",
    activityIcon: "walk-outline",
    date: "2026-08-23",
    time: "07:30 AM",
    notes: "Gentle morning walking escort around Viharamahadevi Park.",
    status: "Completed",
    volunteerId: "demo-user-volunteer",
    volunteerName: "Nimali",
    rating: 5,
    feedback: "Nimali was extremely patient, warm, and helpful. Thank you!",
    createdAt: "2026-08-23T06:00:00Z"
  }
];

export const MOCK_VOLUNTEERS = [
  {
    uid: "demo-user-volunteer",
    displayName: "Nimali",
    age: 21,
    location: "Kandy / Colombo",
    occupation: "University Student",
    verified: true,
    points: 140,
    rating: 4.9,
    completedVisits: 14,
    phone: "+94 71 987 6543",
    bio: "Passionate about helping elderly citizens and giving back to the community."
  },
  {
    uid: "volunteer-202",
    displayName: "Kavinda Bandara",
    age: 24,
    location: "Colombo 05",
    occupation: "IT Professional",
    verified: false,
    idDocument: "NIC_Kavinda_2026.pdf",
    points: 0,
    rating: 0,
    completedVisits: 0,
    phone: "+94 77 555 1234",
    bio: "Eager to assist senior citizens during evenings and weekends."
  }
];

export const MOCK_REPORTS = [
  {
    id: "rep-501",
    reporterName: "Thilini (Caregiver)",
    subjectType: "Volunteer Cancellation",
    description: "Volunteer cancelled 10 mins before visit without notice.",
    status: "Pending Review",
    createdAt: "2026-08-24T14:20:00Z"
  }
];

export const MOCK_LINKINGS = [
  {
    id: "link-1",
    caregiverId: "demo-user-caregiver",
    caregiverName: "Thilini",
    elderlyId: "demo-user-elderly",
    elderlyName: "Mr. Perera",
    linkCode: "PERERA-72",
    linkedAt: "2026-08-20"
  }
];

let liveRequests = [...MOCK_REQUESTS];
let liveVolunteers = [...MOCK_VOLUNTEERS];
let liveReports = [...MOCK_REPORTS];

// --- REQUEST FUNCTIONS ---
export const createAssistanceRequest = async (requestData) => {
  try {
    const docRef = await addDoc(collection(db, "requests"), {
      ...requestData,
      status: "Pending",
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.log("Firestore fallback for createRequest:", error.message);
    const newReq = {
      id: `req-${Date.now()}`,
      elderlyId: mockSessionUser.uid,
      elderlyName: mockSessionUser.displayName || "Mr. Perera",
      elderlyAge: 72,
      status: "Pending",
      volunteerId: null,
      volunteerName: null,
      createdAt: new Date().toISOString(),
      ...requestData
    };
    liveRequests = [newReq, ...liveRequests];
    return { success: true, id: newReq.id, request: newReq };
  }
};

export const fetchRequests = async (filters = {}) => {
  try {
    const querySnapshot = await getDocs(collection(db, "requests"));
    const data = [];
    querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.log("Firestore fallback for fetchRequests:", error.message);
    let filtered = [...liveRequests];
    if (filters.status) filtered = filtered.filter(r => r.status === filters.status);
    if (filters.elderlyId) filtered = filtered.filter(r => r.elderlyId === filters.elderlyId);
    if (filters.volunteerId) filtered = filtered.filter(r => r.volunteerId === filters.volunteerId);
    return filtered;
  }
};

export const acceptOpportunity = async (requestId, volunteerId, volunteerName) => {
  try {
    const reqRef = doc(db, "requests", requestId);
    await updateDoc(reqRef, {
      status: "Matched",
      volunteerId,
      volunteerName
    });
    return { success: true };
  } catch (error) {
    liveRequests = liveRequests.map(r => r.id === requestId ? { ...r, status: "Matched", volunteerId, volunteerName } : r);
    return { success: true };
  }
};

export const updateRequestStatus = async (requestId, newStatus) => {
  try {
    const reqRef = doc(db, "requests", requestId);
    await updateDoc(reqRef, { status: newStatus });
    return { success: true };
  } catch (error) {
    liveRequests = liveRequests.map(r => r.id === requestId ? { ...r, status: newStatus } : r);
    return { success: true };
  }
};

export const submitVisitFeedback = async (requestId, rating, feedback) => {
  try {
    const reqRef = doc(db, "requests", requestId);
    await updateDoc(reqRef, { status: "Completed", rating, feedback });
    return { success: true };
  } catch (error) {
    liveRequests = liveRequests.map(r => r.id === requestId ? { ...r, status: "Completed", rating, feedback } : r);
    return { success: true };
  }
};

// --- VOLUNTEER VERIFICATION & ADMIN FUNCTIONS ---
export const fetchVolunteersForAdmin = async () => {
  try {
    const snap = await getDocs(collection(db, "users"));
    const list = [];
    snap.forEach(d => {
      const data = d.data();
      if (data.role === "volunteer") list.push({ uid: d.id, ...data });
    });
    return list;
  } catch (e) {
    return liveVolunteers;
  }
};

export const verifyVolunteerAccount = async (volunteerUid, approve = true) => {
  try {
    await updateDoc(doc(db, "users", volunteerUid), { verified: approve });
    return { success: true };
  } catch (e) {
    liveVolunteers = liveVolunteers.map(v => v.uid === volunteerUid ? { ...v, verified: approve } : v);
    return { success: true };
  }
};

// --- SAFETY REPORTS ---
export const submitSafetyReport = async (reportData) => {
  try {
    await addDoc(collection(db, "reports"), {
      ...reportData,
      status: "Pending Review",
      createdAt: new Date().toISOString()
    });
    return { success: true };
  } catch (e) {
    const newRep = {
      id: `rep-${Date.now()}`,
      status: "Pending Review",
      createdAt: new Date().toISOString(),
      ...reportData
    };
    liveReports = [newRep, ...liveReports];
    return { success: true };
  }
};

export const fetchReportsForAdmin = async () => {
  try {
    const snap = await getDocs(collection(db, "reports"));
    const data = [];
    snap.forEach(d => data.push({ id: d.id, ...d.data() }));
    return data;
  } catch (e) {
    return liveReports;
  }
};

export const resolveReport = async (reportId, actionTaken) => {
  try {
    await updateDoc(doc(db, "reports", reportId), { status: "Resolved", actionTaken });
    return { success: true };
  } catch (e) {
    liveReports = liveReports.map(rep => rep.id === reportId ? { ...rep, status: "Resolved", actionTaken } : rep);
    return { success: true };
  }
};

// --- CAREGIVER LINKING ---
export const linkElderlyUser = async (linkCode) => {
  // Simulate linking code validation
  if (linkCode.trim().toUpperCase() === "PERERA-72" || linkCode.length >= 4) {
    return {
      success: true,
      elderly: {
        uid: "demo-user-elderly",
        displayName: "Mr. Perera",
        age: 72,
        location: "Colombo 03",
        status: "Active"
      }
    };
  }
  return { success: false, error: "Invalid link code. Please check the code provided by the elderly user." };
};
