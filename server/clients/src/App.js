import React from "react";
import ReactGA from "react-ga";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Outlet, Route, Routes, useNavigate, useLocation  } from "react-router-dom";
import JobseekerPage from "./components/JobSeekerPage/main";
// import "./Pages/JobSeeker_Page/main.css";
import "./components/JobSeekerPage/main.css";
import ApplicationStatusComponent from "./components/JobSeekerPage/ApplicationStatusComponent";
import AddStatusComponent from "./components/JobSeekerPage/Utils/AddStatus";

import UserSchduleComponent from "./components/JobSeekerPage/UserSchduleComponent";

// App

import "./App.css";
import LandingHome from "../src/components/Landingpage/LandingHome";
import CollegeAdmin from "../src/components/CollegeAdmin/CollegeAdmin";
import UserSelect from "./components/UserSelection/UserSelect";
import Profile from "./components/Profile/Profile";
import UserSelectUI from "./components/UserSelection/UserSelectUI";

import UseAuth from "./hooks/auth";
import { useEffect } from "react";
//  Controllers
import UserController from "./components/Controller/UserController";
import CollegeAdminController from "./components/Controller/CollegeAdminController";
import Logout from "./utils/logout";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo } from "./redux/reducers/auth.data";

// Notification Function
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// reducer
import { ShowNotification } from "./redux/reducers/notification.data";
import Training from "./components/JobSeekerPage/Training.Module";
import Help from "./components/JobSeekerPage/Help.module";

import SelectingCollege from "./components/CollegeAdmin/SelectingCollege";
import CollegeUI from "./components/CollegeAdmin/CollegeUI";
import ApplicationDetails from "./components/CollegeAdmin/ApplicationDetails";
import Certification from "./components/CollegeAdmin/Certification";
import CertificationDisplay from "./components/CollegeAdmin/CertificationDisplay";

import CommingSoon from "./components/JobSeekerPage/Utils/CommingSoon";
import AdminController from "./components/Controller/AdminController";
import Admin from "./components/Admin/main";
import Dashboard from "./components/Admin/Dashboard";
import LoginSection from "./components/Admin/LoginSection";
import AdminTable from "./components/Admin/Table";
import WorkingStatusTable from "./components/Admin/WorkingStatusTable"
import CertificationVerifyTable from "./components/Admin/CertificationVerifyTable"
import SingleProfile from "./components/Admin/SingleProfile";
import PlatFormAdminController from "./components/Controller/PlatFormAdminController";
import ResumeMain from "./components/Profile/Resume/ResumeMain";
import PDF from "./components/Profile/Resume/PDFview";

import AllJobsSection from "./components/Admin/AllJobsSection";
import CreateJobOppourtunity from "./components/Admin/CreateJobOppourtunity";
import JobDetails from "./components/Admin/JobDetails";
import EditJobOppourtunity from "./components/Admin/EditJobOppourtunity";
import JobsMenuComponent from "./components/JobSeekerPage/JobsMenu/JobsMenuComponent";
import ViewJobApplications from "./components/JobSeekerPage/JobsMenu/ViewJobApplications";
import AppliedJobsMenuComponent from "./components/JobSeekerPage/JobsMenu/AppliedJobsComponent";
import ViewAppliedJobApplications from "./components/JobSeekerPage/JobsMenu/ViewAppliedJobApplication";
import ResumeViewAdmin from "./components/Admin/ResumeView";
import PDFViewAdmin from "./components/Admin/PDFViewAdmin";
import LastSeen from "./components/Admin/LastSeen";
import RecruiterController from "./components/Controller/RecruiterController";
import Jobs from "./components/Recruiter/Jobs";
import Scheduleint from "./components/Recruiter/Scheduleint/Scheduleint";
import RecruiterTable from "./components/Admin/RecruiterTable";
import Company_Info from "./components/Recruiter/Company_Info";
import ViewRecruiterJobs from "./components/Recruiter/ViewRecruiterJobs";
import PDFViewRecruiter from "./components/Recruiter/PDFViewRecruiter";
import ResumeViewRecruiter from "./components/Recruiter/ResumeView";
import SearchUser from "./components/Admin/SearchUser";
import Tips from "./components/JobSeekerPage/Tips";
import GenerateCertificateMain from "./components/Profile/Certification/CertificationApprovalTemplate";
import { REACT_APP_CLIENT_URL } from "./config";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// Google Analytics
// ReactGA.initialize("UA-265597792-1");

function App() {
  const location = useLocation();
  const notification = useSelector((state) => state.notification.value);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("user"));
  if (token !== null) {
    dispatch(changeUserInfo(token));
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(ShowNotification({ visible: false, message: "" }));
  };
  
  // PRODUCTION ENVIRONMENT

  // REACT_APP_SERVER_URL =
  //   REACT_APP_SERVER_URL || "https://www.app.careersheets.in/api";
  // REACT_APP_FORM_LINK =
  //   REACT_APP_FORM_LINK || "https://forms.gle/WVbVQw2hqrvrJaVB8";

  // REACT_APP_CLIENT_URL =
  //   REACT_APP_CLIENT_URL || "https://www.app.careersheets.in/";

  

  return (
    <div className="App">
      {/* Landing Page Routes */}
      <Routes>
        <Route path="/" element={<LandingHome />} />
        <Route path="/authredirect" element={<UserSelect />} />
        <Route path="/selectuser" element={<UserSelectUI />} />
        <Route path="/logout" element={<Logout />} />
        {/* CollegeAdmin Routes */}
        <Route
          path="/collegeadmin"
          element={
            <CollegeAdminController>
              <CollegeUI />
            </CollegeAdminController>
          }
        >
          <Route index element={<CollegeAdmin />} />
          <Route path=":id" element={<ApplicationDetails />} />
          <Route path="certification/:id" element={<Certification />} />
          <Route path="certification/:id/print" element={<CertificationDisplay />} />
          <Route path="selectcollege" element={<SelectingCollege />} />
        </Route>
        {/* JobSeeker Routes */}
        <Route
          path="/user"
          element={
            <UserController currentPath={location.pathname}>
              <JobseekerPage />
            </UserController>
          }
        >
          <Route index element={<ApplicationStatusComponent />} />
          <Route path="/user/:id" element={<AddStatusComponent />} />
          <Route path="schdule" element={<UserSchduleComponent />} />
          <Route path="profile" element={<Profile />} />
          <Route path="training" element={<Training />} />
          <Route path="help" element={<Help />} />
          <Route path="devstage" element={<CommingSoon />} />
          <Route path="profile/resume" element={<ResumeMain />} />
          <Route path="profile/certification" element={<GenerateCertificateMain />} />
          <Route path="profile/resume/pdf" element={<PDF />} />
          {/* Jobs Menu */}
          <Route path="jobs" element={<JobsMenuComponent />} />
          <Route path="jobs/*" element={<ViewJobApplications />} />
          {/* Applied Jobs */}
          <Route path="applied" element={<AppliedJobsMenuComponent />} />
          <Route path="applied/*" element={<ViewAppliedJobApplications />} />
          <Route path="tips" element={<Tips />}/>
        </Route>


{/* Tips */}

        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <PlatFormAdminController currentPath={location.pathname}>
              <Dashboard />
            </PlatFormAdminController>
          }
        >
          {/* College Admin Verification */}
          <Route path="verify" element={<AdminTable />} />
          <Route path="verify/recruiter" element={<RecruiterTable />} />
          <Route path="download" element={<h1>download</h1>} />
          <Route path="verify/:id" element={<SingleProfile />} />
          {/* Job postings */}
          <Route path="jobs" element={<AllJobsSection />} />
          <Route path="jobs/*" element={<JobDetails />} />
          <Route path="edit/*" element={<EditJobOppourtunity />} />
          <Route path="new" element={<CreateJobOppourtunity />} />
          <Route path="lastseen" element={<LastSeen />} />
          <Route path="profile/resume/pdf/*" element={<PDFViewAdmin />} />
          <Route path="profile/resume/*" element={<ResumeViewAdmin />} />

          {/* Working Status Question */}
          <Route path="verify/workingStatusAnswer" element={<WorkingStatusTable />} />

          {/* Working Status Question */}
          <Route path="verify/certifications" element={<CertificationVerifyTable />} />

          {/* Search */}
          <Route path="search" element={<SearchUser />} />
        </Route>
        {/* <Route path="/adminlogin" element={<LoginSection />} /> */}
        {/* Recruiter Login */}
        <Route
          path="/recruiter"
          element={
            <RecruiterController>
              <Outlet />
            </RecruiterController>
          }
        >
          <Route index element={<Jobs />} />
          <Route path="profile" element={<Company_Info />} />
          <Route path="jobs/*" element={<ViewRecruiterJobs />} />
          <Route path ='schedule'element={<Scheduleint/>}></Route>
          <Route path="profile/resume/pdf/*" element={<PDFViewRecruiter />} />
          <Route path="profile/resume/*" element={<ResumeViewRecruiter />} />
        </Route>
      </Routes>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={notification.visible}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default App;