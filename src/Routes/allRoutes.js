import React from "react";
import { Redirect } from "react-router-dom";

import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';

import ProfileDashoard from '../pages/Pages/Government/SimplePage';
import OpticianProfileDashboard from '../pages/Pages/Government/Pages/SimplePageOpticians';
import OptometristProfileDashboard from '../pages/Pages/Government/Pages/SimplePageOptometrists';
import IndectionProfileDashboard from '../pages/Pages/Government/Pages/SimplePageIndections';
import OpticianOptometristViewPage from "../pages/Pages/Government/Admin/OpticianOptometristViewPage";
import ProfileSetting from '../pages/Pages/Government/Settings';
import InternshipTraining from "../pages/Pages/Government/Admin/InternshipTraining";
import CoverPasswReset from '../pages/AuthenticationInner/PasswordReset/CoverPasswReset';

import CoverLockScreen from '../pages/AuthenticationInner/LockScreen/CoverLockScr';
import CoverLogout from '../pages/AuthenticationInner/Logout/CoverLogout';
import BasicSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
import CoverSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
import BasicTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
import CoverTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';

//login
// import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";

import Index from "../pages/Pages/Government/Admin/Index";
import IndexSearch from "../pages/Pages/Government/Search/Index"
import NewPasswReset from "../pages/AuthenticationInner/PasswordReset/NewPasswReset";
import CoverSigninAdmin from "../pages/AuthenticationInner/Login/CoverSignInAdmin";
import CoverSignInIndex from "../pages/AuthenticationInner/Login/CoverSignInIndex";
import CoverSignUpIndex from "../pages/AuthenticationInner/Register/CoverSignUpIndex";
import FacilityIndexing from "../pages/Pages/Government/Admin/FaciltyIndexing";
import Facility from "../pages/Pages/Government/Views/FaciltyIndexing";
import Indexing from "../pages/Pages/Government/Views/IndexingFacility";
import Optician from "../pages/Pages/Government/Views/InternshipTraining";
import Optometrist from "../pages/Pages/Government/Views/OpticianOptometrist";


import IndexingFacility from "../pages/Pages/Government/Admin/IndexingFacility";
import ViewPractice from "../pages/Pages/Government/Search/ViewPractice";

const authProtectedRoutes = [
  //Pages
  { path: '/facility-dashboard', component: ProfileDashoard },
  { path: '/optician-dashboard', component: OpticianProfileDashboard },
  { path: '/optometrist-dashboard', component: OptometristProfileDashboard },
  { path: '/indexing-dashboard', component: IndectionProfileDashboard },

  { path: `/dashboard-profile/edit/:id`, component: ProfileSetting },
  { path: "/facility-dashboard/:type/:id", component: Facility },
  { path: "/indexing-dashboard/:type/:id", component: Indexing },
  { path: "/optician-dashboard/:type/:id", component: Optician },
  { path: "/optician-dashboard/oo/:type/:id", component: Optometrist },

  { path: "/optometrist-dashboard/:type/:id", component: Optician },
  { path: "/optometrist-dashboard/oo/:type/:id", component: Optometrist },


  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/signin" />,
  },
  {
    path: "*",
    exact: true,
    component: () => <Redirect to="/auth-404-cover" />,
  }
];

const publicRoutes = [
  { path: "/admin-dashboard", component: Index },
  { path: "/search-dashboard", component: IndexSearch },
  { path: "/search-dashboard/view/:type/:id", component: ViewPractice },


  { path: "/admin-dashboard-op/:type/:id", component: OpticianOptometristViewPage },
  { path: "/admin-dashboard-it/:type/:id", component: InternshipTraining },
  { path: "/admin-dashboard-fi/:type/:id", component: FacilityIndexing },
  { path: "/admin-dashboard-if/:type/:id", component: IndexingFacility },


  // Authentication Page
  // { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/register", component: CoverSignUp },

  //AuthenticationInner pages
  { path: "/signin", component: CoverSignIn },
  { path: '/admin-login', component: CoverSigninAdmin },
  { path: '/indexing-login', component: CoverSignInIndex },
  { path: '/indexing-signup', component: CoverSignUpIndex },

  { path: "/signup", component: CoverSignUp },
  { path: "/auth-pass-reset-cover", component: CoverPasswReset },
  { path: "/auth-new-pass-cover", component: NewPasswReset },

  { path: "/auth-lockscreen-cover", component: CoverLockScreen },
  { path: "/auth-logout-cover", component: CoverLogout },
  { path: "/auth-success-msg-basic", component: BasicSuccessMsg },
  { path: "/auth-success-msg-cover", component: CoverSuccessMsg },
  { path: "/auth-twostep-basic", component: BasicTwosVerify },
  { path: "/auth-twostep-cover", component: CoverTwosVerify },
  { path: "/auth-404-basic", component: Basic404 },
  { path: "/auth-404-cover", component: Cover404 },
  { path: "/auth-404-alt", component: Alt404 },
  { path: "/auth-500", component: Error500 },
  // {
  //   path: "*",
  //   exact: true,
  //   component: () => <Redirect to="/auth-404-cover" />,
  // }
];

export { authProtectedRoutes, publicRoutes };