import HelloWorld from './Pages/HelloWorld';
import StyleGuide from './Pages/StyleGuide/StyleGuide';
import DashBord from './Pages/DashBord/DashBord'
import Login from './Pages/BeforeLogin/Login';
import ForgotPassword from './Pages/BeforeLogin/ForgotPassword';

export const routes = [
  {
    path: "/",
    component: HelloWorld,
    exact: true
  }, 

  {
    path: '/DashBord',
    component: DashBord,
    exact: false
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
  {
    path: "/sidenav",
    component: Sidenav,
    exact: false,
  },
  
]

 ;

