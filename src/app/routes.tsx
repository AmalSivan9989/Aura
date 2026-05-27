import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { LoginScreen } from "./components/screens/LoginScreen";
import { DashboardScreen } from "./components/screens/DashboardScreen";
import { FeedbackSubmissionScreen } from "./components/screens/FeedbackSubmissionScreen";
import { SupervisorEvaluationScreen } from "./components/screens/SupervisorEvaluationScreen";
import { TrainerInsightsScreen } from "./components/screens/TrainerInsightsScreen";
import { AdminPanelScreen } from "./components/screens/AdminPanelScreen";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: DashboardScreen },
      { path: "feedback", Component: FeedbackSubmissionScreen },
      { path: "supervisor", Component: SupervisorEvaluationScreen },
      { path: "insights", Component: TrainerInsightsScreen },
      { path: "admin", Component: AdminPanelScreen },
    ],
  },
]);
