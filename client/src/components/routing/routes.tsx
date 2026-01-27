import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Dashboard from "../../pages/Dashboard";
import Profile from "../../pages/Profile";
import SignIn from "../../pages/auth/SignIn";
import AuthLayout from "../../layouts/AuthLayout";
import SignUp from "../../pages/auth/SignUp";
import Table from "../../pages/Table";
import Billing from "../../pages/billing/Billing";
import Invoices from "../../pages/billing/Invoices";
import SettingsLayout from "../../layouts/SettingsLayout";
import AccountSettings from "../settings/AccountSettings";
import ProfileSettings from "../settings/ProfileSettings";
import NotificationSettings from "../settings/NotificationSettings";
import PrivacySettings from "../settings/PrivacySettings";
import PreferencesSettings from "../settings/PreferencesSettings";
import Search from "../../pages/Search";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "profile", element: <Profile /> },
          { path: "tables", element: <Table /> },
          { path: "billing", element: <Billing /> },
          { path: "invoices", element: <Invoices /> },
          { path: "search", element: <Search /> },
        ],
      },
      {
        path: "/settings",
        element: <SettingsLayout />,
        children: [
          { index: true, element: <Navigate to="account" replace /> },
          { path: "account", element: <AccountSettings /> },
          { path: "profile", element: <ProfileSettings /> },
          { path: "notifications", element: <NotificationSettings /> },
          { path: "privacy", element: <PrivacySettings /> },
          { path: "preferences", element: <PreferencesSettings /> },
        ],
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <SignIn /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

export default router;
