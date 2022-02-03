import HelloWorld from './Pages/HelloWorld'
import DashBord from './Pages/DashBord/DashBord'

export const routes = [
  {
    path: '/',
    component: HelloWorld,
    exact: true
  }, 

  {
    path: '/DashBord',
    component: DashBord,
    exact: false
  }, 
  
]