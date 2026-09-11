import React, { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { adminUser, demoUsers, nutritionPlans, progressData, workouts, workoutHistory } from './data/mockData';
import { AuthState, User } from './types';
import { AuthLayout } from './components/layout/AuthLayout';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import { NutritionPage } from './pages/NutritionPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { MyWorkoutsPage } from './pages/MyWorkoutsPage';
import { WorkoutDetailPage } from './pages/WorkoutDetailPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminWorkoutsPage } from './pages/admin/AdminWorkoutsPage';
import { AdminExercisesPage } from './pages/admin/AdminExercisesPage';
import { AdminNutritionPage } from './pages/admin/AdminNutritionPage';
import { AdminMealsPage } from './pages/admin/AdminMealsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { RoleProtectedRoute } from './components/auth/RoleProtectedRoute';

const defaultAuthState: AuthState = {
  user: demoUsers[1],
  isAuthenticated: true,
  isAdmin: false,
};

export default function App() {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  const value = useMemo(
    () => ({
      authState,
      setAuthState,
      users: demoUsers,
      workouts,
      nutritionPlans,
      progressData,
      workoutHistory,
      allUsers: demoUsers,
      adminUser,
    }),
    [authState],
  );

  return (
    <AppContext.Provider value={value}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
          />
          <Route path="/my-workouts" element={<ProtectedRoute><MyWorkoutsPage /></ProtectedRoute>} />
          <Route path="/workout/:id" element={<ProtectedRoute><WorkoutDetailPage /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={<RoleProtectedRoute allowedRoles={['admin']}><AdminDashboardPage /></RoleProtectedRoute>}
          />
          <Route path="/admin/users" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminUsersPage /></RoleProtectedRoute>} />
          <Route path="/admin/workouts" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminWorkoutsPage /></RoleProtectedRoute>} />
          <Route path="/admin/exercises" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminExercisesPage /></RoleProtectedRoute>} />
          <Route path="/admin/nutrition" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminNutritionPage /></RoleProtectedRoute>} />
          <Route path="/admin/meals" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminMealsPage /></RoleProtectedRoute>} />
          <Route path="/admin/settings" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminSettingsPage /></RoleProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContext.Provider>
  );
}

export const AppContext = React.createContext<{
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  users: User[];
  workouts: typeof workouts;
  nutritionPlans: typeof nutritionPlans;
  progressData: typeof progressData;
  workoutHistory: typeof workoutHistory;
  allUsers: User[];
  adminUser: User;
}>({
  authState: defaultAuthState,
  setAuthState: () => undefined,
  users: demoUsers,
  workouts,
  nutritionPlans,
  progressData,
  workoutHistory,
  allUsers: demoUsers,
  adminUser,
});
