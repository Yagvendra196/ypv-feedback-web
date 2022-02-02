import HelloWorld from './Pages/HelloWorld'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
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
];