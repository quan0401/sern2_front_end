import Home from "../components/Home";
import UserList from "../components/UserList/UserList";

const publicRoute = [
  { pathname: "/home", component: Home },
  { pathname: "/user-table", component: UserList },
];
export default publicRoute;
