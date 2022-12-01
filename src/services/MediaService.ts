import {
  addDoc,
  collection,
  getDocs,
  DocumentData,
  doc,
  query,
  where,
  getDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import db from '../firebase/db'

type InfoType = {
  owner: string;
  synopsis: string;
  title: string;
  type: string;
  statusType: string;
  progress: number;
  totalContent: number;
  email: string;
  photoURL: string;
};

export async function createMedia(info: InfoType) {
  await addDoc(collection(db, 'media'), info);
}

export async function getAllMedia(email?: any) {
  const q = query(collection(db, 'media'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  const allMedia: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    allMedia.push({ id: doc.id, ...docData });
  });

  return allMedia;
}
export async function getAllFilteredMedia(type?: any, email?: any) {
  const q = query(collection(db, 'media'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  const allMedia: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    if (docData.type === type) {
      allMedia.push({ id: doc.id, ...docData });
    }
  });
  return allMedia;
}

export async function getSingleMedia(queryID: any) {
  const docRef = doc(db, 'media', queryID);
  const docSnap = await getDoc(docRef);
  const mediaData = docSnap.data();
  return mediaData;
}

export async function deleteSingleMedia(queryID: any) {
  await deleteDoc(doc(db, 'media', queryID));
}

export async function updateSingleMedia(queryID: any, info: any) {
  const docRef = doc(db, 'media', queryID);
  await updateDoc(docRef, { ...info });
}
