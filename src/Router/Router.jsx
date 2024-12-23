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

const router = createBrowserRouter([
  {
    path: "/",
    element:<Mainlayout></Mainlayout>,
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
        element:<CreateAssignment></CreateAssignment>

      },
      {
        path:'/my-attempted-assignments',
        element:<MyAssainment></MyAssainment>
      },
      {
        path:'/details/:id',
        element:<AssignmentDetails></AssignmentDetails>
      },
      {
        path:'/update-assainment/:id',
        element:<UpdateAssainment></UpdateAssainment>
      },
      {
        path:'/pending-assignments',
        element:<PendingAssignment></PendingAssignment>
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
