import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: "",
    errMessage: "",
  },
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    setErrMessage: (state, action) => {
      return { errMessage: action.payload };
    },
    clearErrMessage: () => {
      return { errMessage: "" };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, setErrMessage, clearMessage, clearErrMessage } =
  actions;
export default reducer;
