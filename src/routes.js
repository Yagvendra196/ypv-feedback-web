import HelloWorld from "./Pages/HelloWorld";
import StyleGuide from "./Pages/StyleGuide/StyleGuide";
import Login from "./Pages/BeforeLogin/Login";
import ForgotPassword from "./Pages/BeforeLogin/ForgotPassword";
import Layout from "./components/containers/Layout";
import WeeklyFeedback from "./Pages/AfterLogin/WeeklyFeedback";
import MonthlyFeedback from "./Pages/AfterLogin/Monthlyfeedback";
import Buddies from './Pages/AfterLogin/Buddies';
import AddBuddies from './Pages/AfterLogin/Add Buddies';
import SignUp from "./Pages/BeforeLogin/SignUp";
import DashBord from "./components/shared/DashBord"
export const routes = [
  {
    path: "/",
    component: HelloWorld,
    exact: true,
  },

  {
    path: "/layout",
    component: Layout,
    exact: false,
  },
  {
    path: "/login",
    component: Login,
    exact: false,
  },
  {
    path: "/signUp",
    component: SignUp,
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
    path: "/DashBord",
    component: DashBord,
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
