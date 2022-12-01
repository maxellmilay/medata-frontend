import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from './index';

const db = getFirestore(firebaseApp);

export default db;
