import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    wishlistJobs: [],
    wishlistCount: 0,
    searchQuery: "",
    filters: {
      // 🎯 for filter card
      location: "",
      Industry: "",
      Salary: "",
    },
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setsearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setWishlistJobs: (state, action) => {
      state.wishlistJobs = action.payload;
      state.wishlistCount = action.payload?.length || 0;
    },
    setWishlistCount: (state, action) => {
      state.wishlistCount = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAdminJobs,
  setsearchJobByText,
  setAllAppliedJobs,
  setWishlistJobs,
  setWishlistCount,
  setSearchQuery,
  setFilters,
} = jobSlice.actions;
export default jobSlice.reducer;
