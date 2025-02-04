import { createSlice } from "@reduxjs/toolkit";

const certificateSlice = createSlice({
  name: "certification",
  initialState: {
    items: [],
  },
  reducers: {
    addCertification(state, action) {
      const newCertificate = action.payload;
      if (newCertificate) {
        state.items.unshift({
            certificationName: newCertificate.certificateName,
            issuedBy: newCertificate.providedBy,
            certificateIssuedDate: newCertificate.issuedOn,
            startDate: newCertificate.startDate,
            expiryDate: newCertificate.expiryDate,
            certificateId: newCertificate.certificateId,
            approval:newCertificate.approval,
          _id: newCertificate._id,
        });
      }
    },
    removeCertificate(state, action) {
      const id = action.payload;
      //   const existingEdu=state.items.find((item)=>item._id===id)
      state.items = state.items.filter((item) => item._id !== id);
    },
    replaceCertificate(state, action) {
      const data = action.payload;
      state.items = [...data];
    },
  },
});

export const certificateActions = certificateSlice.actions;
export default certificateSlice;