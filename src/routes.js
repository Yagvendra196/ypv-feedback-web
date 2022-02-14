import HelloWorld from "./Pages/HelloWorld";
import StyleGuide from "./Pages/StyleGuide/StyleGuide";
import Login from "./Pages/BeforeLogin/Login";
import ForgotPassword from "./Pages/BeforeLogin/ForgotPassword";
import Layout from "./components/containers/Layout";


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
    path: "/forgot-password",
    component: ForgotPassword,
    exact: false,
  },
  {
    path: "/styleGuide",
    component: StyleGuide,
    exact: false,
  },
];
