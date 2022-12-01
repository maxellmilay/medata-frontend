import { createSlice } from '@reduxjs/toolkit';

interface InitialStateInterface {
  displayName: string;
  email: string;
  uid: string;
  profileImage: string;
}

const initialState: InitialStateInterface = {
  displayName: '',
  email: '',
  uid: '',
  profileImage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_CURRENT_USER: (state, { payload }) => {
      state.displayName = payload.displayName;
      state.email = payload.email;
      state.uid = payload.uid;
      state.profileImage = payload.profileImage;
    },
  },
});

export const { SET_CURRENT_USER } = userSlice.actions;

export default userSlice.reducer;
