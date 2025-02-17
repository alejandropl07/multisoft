import { initializeApp, getApps, FirebaseApp, getApp } from "firebase/app";
import { Auth, RecaptchaVerifier, browserSessionPersistence, getAuth, initializeAuth, setPersistence, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, signInWithPhoneNumber, browserLocalPersistence, signInAnonymously, updatePassword, confirmPasswordReset, sendPasswordResetEmail } from 'firebase/auth';
import { Firestore, addDoc, arrayUnion, collection, collectionGroup, count, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { toast } from 'react-toastify';
import config from "@/config";
import { CheckoutResponse } from "@/src/types/Stripe";
import { UserPublicData } from "@/src/types/UserPublicData";
import { LeadData } from "@/src/types/LeadData";

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;



if (!getApps().length) {
  app = initializeApp(config.firebaseConfig);
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth };

export const phoneProvider = new GoogleAuthProvider();

export const signInWithProvider = async (provider: string, phoneNumber?: string) => {
  try {
    switch (provider) {
      case 'google':
        await signInWithPopup(auth, new GoogleAuthProvider());
        break;
      case 'facebook':
        await signInWithPopup(auth, new FacebookAuthProvider())
          .then((result) => {
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;
            // ...
          })
          .catch((error) => {
            console.log(error);

          });
        break;
      default:
        toast.error("An error occurred while signing in. Please try again.");
        break;
    }

  } catch (error) {
    switch (error.code) {
      case 'auth/account-exists-with-different-credential':
        toast.error('An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.');
        break;
      case 'auth/credential-already-in-use':
        toast.error('This credential is already associated with a different user account.');
        break;
      case 'auth/email-already-in-use':
        toast.error('The email address is already in use by another account.');
        break;
      case 'auth/popup-blocked':
        toast.error('Unable to establish a connection with the popup. It may have been blocked by the browser.');
        break;
      case 'auth/popup-closed-by-user':
        toast.error('The popup has been closed by the user before finalizing the operation.');
        break;
      case 'auth/user-disabled':
        toast.error('The user account has been disabled by an administrator.');
        break;
      case 'auth/user-token-expired':
        toast.error('The user\'s credential is no longer valid. The user must sign in again.');
        break;
      case 'auth/web-storage-unsupported':
        toast.error('This browser is not supported or 3rd party cookies and data may be disabled.');
        break;
      default:
        toast.error("An error occurred while signing in. Please try again.");
        break;
    }
  }
}

export const signInAnon = async () => {
  const user = await signInAnonymously(auth);
  return user;
}

export const signInWithEmailAndPasswordAsync = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
export const sendPasswordResetEmailAsync = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
}

export const logOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    toast.error("An error occurred while signing out. Please try again.");
  }
}

export const updatePasswordAsync = async (newPassword: string) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
    }
  } catch (error) {
    toast.error("An error occurred while updating your password. Please try again.");
  }
}

export const saveSessionToFirestore = async (sessionData) => {
  if (!auth.currentUser) {
    toast.error("An error occurred while saving your session. Please try again.");
    console.log("No user")
    return;
  }
  try {
    const docRef = await setDoc(doc(db, "users", auth.currentUser.uid, "checkoutSessions", sessionData.id), sessionData,);
    return docRef;
  } catch (error) {
    toast.error("An error occurred while saving your session. Please try again.");
  }

}

//Dashboard Main
export const getUserLeads = async () => {
  if (!auth.currentUser) {
    toast.error("An error occurred while getting your leads. Please try again.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  const docRef = collection(db, "users", auth.currentUser.uid, "leads");
  const q = query(docRef, orderBy('created_at', 'desc'));
  const data = await getDocs(q);
  //return data, id and ref
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id, ref: doc.ref })) as LeadData[];
}

export const updateSetUserLeads = async (leadId: string, fieldName: string, fieldValue: any) => {
  if (!auth.currentUser) {
    toast.error("An error occurred while updating leads. Please try again.");
    console.log("No user")
    return;
  }
  const docRef = await setDoc(doc(db, "users", auth.currentUser.uid, "leads", leadId), { [fieldName]: fieldValue }, { merge: true });
  return docRef;
}

export const addUserLead = async (leadData) => {
  if (!auth.currentUser) {
    toast.error("An error occurred while adding leads. Please try again.");
    console.log("No user")
    return;
  }
  const docRef = await addDoc(collection(db, "users", auth.currentUser.uid, "leads"), leadData);
  return docRef;
}

export const getUserCheckoutSessions = async () => {
  if (!auth.currentUser) {
    toast.error("An error occurred. Please try again.",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  //get last checkout sessions if it was "created" at least 12 hours ago
  const docRef = query(collection(db, "users", auth.currentUser.uid, "checkoutSessions"), where('created', '<=', Date.now() - 43200000), orderBy('created', 'desc'), limit(config.numberOfCheckoutSessions));
  const data = await getDocs(docRef);
  const checkoutSessions: CheckoutResponse[] | any = data.docs.map(doc => ({ ...doc.data() }));
  return checkoutSessions;
}

export const deleteUserCheckoutSession = async (sessionId: string) => {
  if (!auth.currentUser) {
    toast.error("An error occurred. Please try again.",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  const docRef = await deleteDoc(doc(db, "users", auth.currentUser.uid, "checkoutSessions", sessionId));
  return docRef;
}

export const getUserNotifications = async () => {
  if (!auth.currentUser) {
    toast.error("An error occurred. Please try again.",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  const docRef = query(collection(db, "users", auth.currentUser.uid, "notifications"), orderBy('createdAt', 'desc'), limit(10));
  const data = await getDocs(docRef);
  //return data, id and ref
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id, ref: doc.ref }));
}

export const deleteUserNotification = async (notificationId: string) => {
  if (!auth.currentUser) {
    toast.error("An error occurred. Please try again.",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  const docRef = await deleteDoc(doc(db, "users", auth.currentUser.uid, "notifications", notificationId));
  return docRef;
}

export const getUserOwnPublic = async () => {
  if (!auth.currentUser) {
    toast.error("An error occurred. Please try again.",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  const docRef = doc(db, "users", auth.currentUser.uid);
  const data = await getDoc(docRef);
  //return data, id and ref
  return { ...data.data()?.public, id: data.id };
}

export const getUserPublic = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const data = await getDoc(docRef);
  //return data, id and ref
  return { ...data.data()?.public, id: data.id };
}

export const getUser = async () => {
  if (!auth.currentUser) {
    toast.error("An error occurred. Please try again.",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  const docRef = doc(db, "users", auth.currentUser.uid);
  const data = await getDoc(docRef);
  //return data, id and ref
  return { ...data.data(), id: data.id, ref: data.ref };
}

export const saveUserPublic = async (data: UserPublicData) => {
  if (!auth.currentUser) {
    toast.error("An error occurred. Please try again.",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  const docRef = await setDoc(doc(db, "users", auth.currentUser.uid), { public: data }, { merge: true });
  return docRef;
}

//Home Valuation
export const createPartialLead = async (uid: string, data: any) => {
  const docRef = collection(db, "users", uid, 'partialLeads');
  const result = await addDoc(docRef, data)
    .then((response) => {
      return response.id
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      return null;
    })
  return result;
}

export const deletePartialLead = async (uid: string, leadId: any) => {
  const docRef = doc(db, "users", uid, 'partialLeads', leadId);
  return await deleteDoc(docRef)
}

export const updatePartialLead = async (uid: string, leadId: any, data: any) => {
  console.log(data);
  const docRef = doc(db, "users", uid, 'partialLeads', leadId);
  return await setDoc(docRef, data, { merge: true })
}

export const completeLead = async (uid: string, leadId: any) => {
  const partialDocRef = doc(db, "users", uid, 'partialLeads', leadId);
  const completeDocRef = doc(db, "users", uid, 'leads', leadId);
  const leadData = await getDoc(partialDocRef);
  if (leadData.exists()) {
    const data = leadData.data();
    await setDoc(completeDocRef, data);
    await deleteDoc(partialDocRef);
    return true;
  } else {
    return false;
  }
}

export const updateLead = async (uid: string, leadId: any, data: any) => {
  console.log(data)
  const docRef = doc(db, "users", uid, 'leads', leadId);
  return await setDoc(docRef, data, { merge: true })
}

export const getUserData = async (uid?: string, username?: string) => {
  if (uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null
    }
  } else if (username) {
    const queryRef = query(collection(db, "users"), where("customize.homeValueSlug", "==", username))
    const docsSnap = await getDocs(queryRef);
    if (docsSnap.size > 0) {
      return docsSnap.docs[0].data();
    }
  } else {
    return null
  }

}

export const getUserIntegrationSettings = async (uid: any) => {
  const ref = doc(db, "users", uid, 'settings', 'integrations')
  return (await getDoc(ref)).data()
}

export const setUserIntegrationSettings = async (uid: any, payload: any) => {
  const ref = doc(db, "users", uid, 'settings', 'integrations')
  return setDoc(ref, payload, { merge: true })
}

export const getUserNotificationSettings = async (uid: any) => {
  const ref = doc(db, "users", uid, 'settings', 'notifications')
  return (await getDoc(ref)).data()
}

export const setUserNotificationSettings = async (uid: any, payload: any) => {
  const ref = doc(db, "users", uid, 'settings', 'notifications')
  return setDoc(ref, payload, { merge: true })
}

//When Uid is not present 

export const createNoUserLead = async (data: any) => {
  const docRef = collection(db, 'noUserLeads');
  const result = await addDoc(docRef, data)
    .then((response) => {
      return response.id
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      return null;
    })
  return result;
}

export const deleteNoUserLead = async (leadId: any) => {
  const docRef = doc(db, 'noUserLeads', leadId.toString());
  return await deleteDoc(docRef)
}

export const updateNoUserLead = async (leadId: any, data: any) => {
  const docRef = doc(db, 'noUserLeads', leadId.toString());
  return await setDoc(docRef, data, { merge: true })
}

//Firestore
export const db = getFirestore(app);

export const searchSingleZipCode = async (term: string) => {
  const ref = query(collection(db, "zipcodes"), where('zip', '==', term));
  const data = await getDocs(ref);
  //return data, id and ref if exists
  if (data.size > 0) {
    return { ...data.docs[0].data(), id: data.docs[0].id, ref: data.docs[0].ref };
  } else {
    //search in zipCodeBackup
    const ref = query(collection(db, "zipCodeBackup"), where('zip', '==', term));
    const data = await getDocs(ref);
    //return data, id and ref if exists
    if (data.size > 0) {
      return { ...data.docs[0].data(), id: data.docs[0].id, ref: data.docs[0].ref };
    } else {
      return null;
    }
  }
}

//Storage
export const storage = getStorage(app);

export const uploadAvatar = async (file: File) => {
  if (!auth.currentUser) {
    toast.error("An error occurred. Please try again.",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  const randomString = Math.random().toString(36).substring(2);
  const ext = file.name.split('.').pop();
  const storageRef = ref(storage, `users/${auth.currentUser.uid}/avatars/${randomString}.${ext}`);

  await uploadBytesResumable(storageRef, file)
  //make picture public
  const url = await getDownloadURL(storageRef);
  return url;
};

export const uploadImages = async (fileUri: any) => {
  if (!auth.currentUser) {
    toast.error("An error occurred. Please try again.",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("No user")
    return;
  }
  const randomString = Math.random().toString(36).substring(2);
  const storageRef = ref(storage, `users/${auth.currentUser.uid}/supportChat/${randomString}`);

  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", fileUri, true);
    xhr.send(null);
  });
  console.log(`blob converted`)
  await uploadBytesResumable(storageRef, blob)
  console.log(`blob uploaded`)
  return {
    uri: await getDownloadURL(storageRef),
    id: randomString
  };
};

export const deleteCurrentUser = async () => {
  const user = auth.currentUser
  if (user) {
    await user.delete()
  }
}

//Functions
export const functions = getFunctions(app);

export const authPasswordLessSignIn = httpsCallable(functions, 'authPasswordLessSignIn');
export const stripeNewCheckout = httpsCallable(functions, 'stripeNewCheckout');
export const exportLeads = httpsCallable(functions, 'exportLeads');
export const stripeOpenPortal = httpsCallable(functions, 'stripeOpenPortal');
export const getZipCodeAvailability = httpsCallable(functions, 'getZipCodeAvailability');
export const getAllUids = httpsCallable(functions, 'getAllUids');