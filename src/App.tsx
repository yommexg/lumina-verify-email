import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmail from "./pages/verifyEmail";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Verification Route */}
        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        {/* Fallback for any other route */}
        <Route
          path="*"
          element={
            <div style={styles.fullscreenCenter}>
              <h1 style={{ fontSize: 20 }}>Welcome to the Lumina App</h1>
              <p style={{ fontSize: 12 }}>
                Use the email link to verify your account.
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const styles: { [key: string]: React.CSSProperties } = {
  fullscreenCenter: {
    minHeight: "100vh",
    backgroundColor: "#6C63FF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  },
};
