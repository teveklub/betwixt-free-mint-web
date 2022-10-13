import Burn from "../Views/Burn/Burn";
import Home from "../Views/Home/Home";
import MintPage from "../Views/MintPage/MintPage";



const routes = [
  {
    path: "/",
    component: <Home/>,
    exact: true,
  },
  {
    path: "/mint",
    component: <MintPage/>,
    exact: true,
  },
  {
    path: "/burn",
    component: <Burn/>,
    exact: true,
  },

];

export default routes;
