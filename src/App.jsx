import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RegistrationPage from "./pages/registration/RegistrationPage";
import VerifyEmailPage from "./pages/verifyEmail/VerifyEmailPage";
import SignInPage from "./pages/signin/SignInPage";
import ForgotPasswordPage from "./pages/forgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./pages/resetPassword/ResetPasswordPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/inscription" replace />} />
          <Route path="/inscription" element={<RegistrationPage />} />
          <Route path="/verification-email" element={<VerifyEmailPage />} />
          <Route path="/connexion" element={<SignInPage />} />
          <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
          <Route
            path="/reinitialiser-mot-de-passe"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/tableau-de-bord"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/inscription" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
