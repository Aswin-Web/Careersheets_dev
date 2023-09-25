import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/auth.data";

import EducationSlice from "./reducers/education-Data";
import skillSlice from "./reducers/Skill-data";
import statusSlice from "./reducers/status-data";
import applicationSlice from "./reducers/application.data";
import notificationSlice from "./reducers/notification.data";
import DetailsSlice from "./reducers/userDetails";
import collegeAdminData from "./reducers/collegeAdmin-data";
import applicationDetailSlice from "./reducers/applicationDetails";
import CollegeAdminListSlice from "./reducers/collegeAdminlist";
import projectSlice from "./reducers/project-data";
import roleSlice from "./reducers/role-data";
import personalSlice from "./reducers/personalInfo";
import summarySlice from "./reducers/summary-data";
import { dataSlice } from "./reducers/data";
import AllJobDetails from "./reducers/AllJobDetails";
import JobsUsers from "./reducers/JobsUsers";
export default configureStore({
  reducer: {
    auth: userSlice,
    edu: EducationSlice.reducer,
    skill: skillSlice.reducer,
    status: statusSlice.reducer,
    userDetail: DetailsSlice.reducer,
    collegeAdmin: collegeAdminData.reducer,
    applicationDetail: applicationDetailSlice.reducer,
    project: projectSlice.reducer,
    role: roleSlice.reducer,
    application: applicationSlice,
    notification: notificationSlice,
    collegeAdminList: CollegeAdminListSlice,
    allJobs: AllJobDetails,
    allJobsUser: JobsUsers,
    data:dataSlice.reducer,
    summary:summarySlice.reducer,
    personalInfo:personalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
