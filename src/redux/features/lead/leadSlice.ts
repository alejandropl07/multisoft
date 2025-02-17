import { createSlice } from "@reduxjs/toolkit";

const initialState = { leads: [{
    name: "Alejandro",
    email: "aprietoleon97@gmail.com",
    phone: "55596360",
    type: "admin",
    date: "2024",
    status: "active",
  }] };

export const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    createLead(state, action) {
      state.leads.push(action.payload); 
    },
  },
});

export const { createLead } = leadSlice.actions;
export default leadSlice.reducer;