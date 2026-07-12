import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RegistrationPage from "./pages/registration/RegistrationPage";
import VerifyEmailPage from "./pages/verifyEmail/VerifyEmailPage";
import SignInPage from "./pages/signin/SignInPage";
import ForgotPasswordPage from "./pages/forgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./pages/resetPassword/ResetPasswordPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

function AppRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-page-in">
      <Routes>
        <Route path="/" element={<Navigate to="/connexion" replace />} />
        <Route
          path="/inscription"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route path="/verification-email" element={<VerifyEmailPage />} />
        <Route
          path="/connexion"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
        <Route path="/reinitialiser-mot-de-passe" element={<ResetPasswordPage />} />
        <Route
          path="/tableau-de-bord"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/connexion" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
