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
          certificationName: newCertificate.certificationName,
          issuedBy: newCertificate.issuedBy,
          certificateIssuedDate: newCertificate.certificateIssuedDate,
          startDate: newCertificate.startDate,
          expiryDate: newCertificate.expiryDate,
          certificateId: newCertificate.certificateId,
          approval: newCertificate.approval,
          _id: newCertificate._id,
        });
      }
    },
    updateCertification(state, action) {
      const { existingId, ...updatedFields } = action.payload;
      const index = state.items.findIndex((item) => item._id === existingId);

      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          certificationName: updatedFields.certificationName,
          issuedBy: updatedFields.issuedBy,
          certificateIssuedDate: updatedFields.issuedOn
            ? updatedFields.issuedOn.split("T")[0]
            : state.items[index].certificateIssuedDate, // Fallback to existing value
          startDate: updatedFields.startDate
            ? updatedFields.startDate.split("T")[0]
            : state.items[index].startDate, // Fallback to existing value
          expiryDate: updatedFields.endDate
            ? updatedFields.endDate.split("T")[0]
            : state.items[index].expiryDate, // Fallback to existing value
          certificateId: updatedFields.certificateId,
          approval: updatedFields.approval,
        };
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
    getCertifications(state, action) {
      const data = action.payload;
      if (data) {
        state.items = [...data];
      }
    },
  },
});

export const certificateActions = certificateSlice.actions;
export default certificateSlice;
