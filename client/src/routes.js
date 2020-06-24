/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Home from "./views/Home.js";
import Analytics from "./views/Analytics.js";
import Icons from "./views/Icons.js";
import Notifications from "./views/Notifications.js";
import TableList from "./views/TableList.js";
import Settings from "./views/Settings.js";
import Typography from "./views/Typography.js";
import Profile from "./views/Profile.js";
import UserProfile from "./views/UserProfile.js";
import Leaderboard from "./views/Leaderboard.js";
import Offsets from "./views/Offsets.js";
import Lookup from "./views/Lookup.js";
import ClickExtension from "./views/ClickExtension.js";
import InstructionManual from "./views/InstructionManual.js";

var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "tim-icons icon-components",
    component: Home,
    layout: "/",
    disabled: false,
    emoji: '🏠',
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: "tim-icons icon-chart-pie-36",
    component: Analytics,
    layout: "/",
    disabled: false,
    emoji: '📈',
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    icon: "tim-icons icon-chart-bar-32",
    component: Leaderboard,
    layout: "/",
    disabled: false,
    emoji: '📊',
  },
  {
    path: "/offsets",
    name: "Offsets",
    icon: "tim-icons icon-world",
    component: Offsets,
    layout: "/",
    disabled: false,
    emoji: '🌿',
  },
  // {
  //   path: "/lookup",
  //   name: "Lookup",
  //   icon: "tim-icons icon-zoom-split",
  //   component: Lookup,
  //   layout: "/",
  //   disabled: false,
  //   emoji: '🕵',
  // },
  {
    path: "/profile",
    name: "Profile",
    icon: "tim-icons icon-single-02",
    component: Profile,
    layout: "/",
    disabled: true,
    emoji: '😉',
  },
  {
    path: "/user/:id",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/",
    disabled: true,
    emoji: '😉',
  },
  {
    path: "/settings",
    name: "Setings",
    icon: "tim-icons icon-puzzle-10",
    component: Settings,
    layout: "/",
    disabled: true,
    emoji: '⚙',
  },
  {
    path: "/click",
    name: "Click",
    icon: "tim-icons icon-puzzle-10",
    component: ClickExtension,
    layout: "/",
    disabled: true,
    emoji: '🖱️',
  },
  {
    path: "/instructions",
    name: "Instructions",
    icon: "tim-icons icon-puzzle-10",
    component: InstructionManual,
    layout: "/",
    disabled: true,
    emoji: '🛠️',
  },

/*

  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/",
    disabled: false,
  },

  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/",
    disabled: false,
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/",
    disabled: false,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/",
    disabled: false,
  },*/
];
export default routes;
