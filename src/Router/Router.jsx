import { createBrowserRouter } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Mainlayout from "../Pages/Mainlayout";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import Home from "../Pages/Home";
import CreateAssignment from "../Pages/CreateAssignment";
import Assignment from "../Pages/Assignment/Assignment";
import MyAssainment from "../Pages/MyAssainment/MyAssainment";
import AssignmentDetails from "../Pages/View";
import PendingAssignment from "../Pages/PendingAssignment";
import UpdateAssainment from "../Pages/UpdateAssainment";
import Searchingassingment from "../Pages/Searchingassingment";
import Privateroute from "./Privateroute";
import Error from "../Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Mainlayout></Mainlayout>,
    errorElement: <Error></Error>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/assignments',
        element:<Assignment></Assignment>
      },
      {
        path:'/create-assignment',
        element:<Privateroute><CreateAssignment></CreateAssignment></Privateroute>

      },
      {
        path:'/my-attempted-assignments',
        element:<Privateroute><MyAssainment></MyAssainment></Privateroute>
      },
      {
        path:'/assignments/details/:id',
        element:<Privateroute><AssignmentDetails></AssignmentDetails></Privateroute>
      },
      {
        path:'/assignments/update-assignment/:id',
        element:<Privateroute><UpdateAssainment></UpdateAssainment></Privateroute>
      },
      {
        path:'/search',
        element:<Privateroute><Searchingassingment></Searchingassingment></Privateroute>
      },
      {
        path:'/pending-assignments',
        element:<Privateroute><PendingAssignment></PendingAssignment></Privateroute>
      },
      {
      path:'/login',
    element:<Login></Login>
    },
    {
      path:'/registration',
      element:<Registration></Registration>
    }]
  },
  
 
]);
export default router
