import HelloWorld from "./Pages/HelloWorld";
import StyleGuide from "./Pages/StyleGuide/StyleGuide";
import Login from "./Pages/BeforeLogin/Login";
import ForgotPassword from "./Pages/BeforeLogin/ForgotPassword";
import Layout from "./components/containers/Layout";
import WeeklyFeedback from "./Pages/AfterLogin/WeeklyFeedback";
import MonthlyFeedback from "./Pages/AfterLogin/Monthlyfeedback";
import Buddies from './Pages/AfterLogin/Buddies';
import AddBuddies from './Pages/AfterLogin/Add Buddies';
import NoBuddy from "./Pages/AfterLogin/No Buddy";
import SignUp from "./Pages/BeforeLogin/SignUp";
import DashBaord from "./components/shared/DashBoard";
import ChangePassword from "./Pages/AfterLogin/Change Password";
import ViewFeedback from "./Pages/AfterLogin/View Feedback";

export const routes = [
  {
    path: "/",
    component: Login,
    exact: true,
  },
  {
    path: "/helloworld",
    component: HelloWorld,
    exact: false,
  },

  {
    path: "/layout",
    component: Layout,
    exact: false,
  },

  {
    path: "/signUp",
    component: SignUp,
    exact: false,
  },
  {
    path: "/changepassword",
    component: ChangePassword,
    exact: false,
  },
  {
    path: "/my-buddies",
    component: Buddies,
    exact: false,
  },
  {
    path: "/add-buddies",
    component: AddBuddies,
    exact: false,
  },
  {
    path: "/nobuddy",
    component: NoBuddy,
    exact: false,
  },
  {
    path: "/dashboard",
    component: DashBaord,
    exact: false,
  },
  {
    path: "/view-feedback",
    component: ViewFeedback,
    exact: false,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    exact: false,
  },
  {
    path: "/weekly-feedback",
    component: WeeklyFeedback,
    exact: false,
  },
  {
    path: "/monthly-feedback",
    component: MonthlyFeedback,
    exact: false,
  },
  {
    path: "/styleGuide",
    component: StyleGuide,
    exact: false,
  },
];
