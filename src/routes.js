import HelloWorld from "./Pages/HelloWorld";
import StyleGuide from "./Pages/StyleGuide/StyleGuide";
import Login from "./Pages/BeforeLogin/Login";
import ForgotPassword from "./Pages/BeforeLogin/ForgotPassword";
import Layout from "./components/containers/Layout";
import WeeklyFeedback from "./Pages/AfterLogin/WeeklyFeedback";
import MonthlyFeedback from "./Pages/AfterLogin/Monthlyfeedback";
import Buddies from './Pages/AfterLogin/Buddies'
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
    path: "/my-buddies",
    component: Buddies,
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
