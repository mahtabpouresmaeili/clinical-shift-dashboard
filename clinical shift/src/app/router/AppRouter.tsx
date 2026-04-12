import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardPage from "../../features/dashboard/DashboardPage";
import TasksPage from "../../features/tasks/TasksPage";
import ShiftReportPage from "../../features/shift-report/ShiftReportPage";
import TaskDetailPage from "../../features/tasks/TasksDetailPage";


import { DashboardLayout } from "../../features/dashboard/DashboardLayout";
import PatientsPage from "../../features/patients/PatientsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage/>}/>
          <Route path="/shift-report" element={<ShiftReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}