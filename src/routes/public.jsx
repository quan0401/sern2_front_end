import Home from "../components/Home/Home";
import UserList from "../components/UserList/UserList";
import Login from "../components/Login/Login";

const publicRoute = [
  { pathname: "/home", component: Home },
  { pathname: "/user-table", component: UserList },
  { pathname: "/login", component: Login },
];
export default publicRoute;
