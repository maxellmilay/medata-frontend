import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../firebase/auth';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { SET_CURRENT_USER } from '../redux/reducers/userSlice';

const provider = new GoogleAuthProvider();

export async function login(
  dispatch: Dispatch<AnyAction>,
  handleLoggedInState: () => void
) {
  await setPersistence(auth, browserLocalPersistence);
  await signInWithPopup(auth, provider)
    .then((result) => {
      dispatch(
        SET_CURRENT_USER({
          displayName: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid,
          profileImage: result.user.photoURL,
        })
      );
      handleLoggedInState();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function handleAuthState(dispatch: Dispatch<AnyAction>) {
  onAuthStateChanged(auth, (user) => {
    dispatch(
      SET_CURRENT_USER({
        displayName: user?.displayName,
        email: user?.email,
        uid: user?.uid,
        profileImage: user?.photoURL,
      })
    );
  });
}

export function logout() {
  signOut(auth)
    .then(() => {
      console.log('logout successful');
    })
    .catch((error) => {
      console.log(error.message);
    });
}
