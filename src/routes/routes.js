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
  }

];

export default routes;
