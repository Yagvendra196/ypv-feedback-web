import HelloWorld from './Pages/HelloWorld'
import Login from './Pages/BeforeLogin/Login';
import ForgotPassword from './Pages/BeforeLogin/ForgotPassword';
import StyleGuide from './Pages/StyleGuide/StyleGuide';

export const routes = [
  {
    path: "/",
    component: HelloWorld,
    exact: true,
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
  // {
  //   path: "/sidenav",
  //   component: Sidenav,
  //   exact: false,
  // },
];