import { Navigate } from "react-router-dom";
import { ThemeContext, useMode } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Applications from "./pages/applications";
import Contacts from "./pages/contacts";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";

function App() {
  const { colorMode, theme } = useMode();

  const isAuthenticated = false;

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated ? <Sidebar /> : null}
          <main className="content">
            {isAuthenticated ? <Topbar /> : null}
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <Dashboard /> : <SignIn />}
              />
              <Route
                path="/applications"
                element={
                  isAuthenticated ? <Applications /> : <Navigate to="/signIn" />
                }
              />
              <Route
                path="/contacts"
                element={
                  isAuthenticated ? <Contacts /> : <Navigate to="/signIn" />
                }
              />
              <Route
                path="/form"
                element={isAuthenticated ? <Form /> : <Navigate to="/signIn" />}
              />
              <Route
                path="/calendar"
                element={
                  isAuthenticated ? <Calendar /> : <Navigate to="/signIn" />
                }
              />
              <Route
                path="/bar"
                element={isAuthenticated ? <Bar /> : <Navigate to="/signIn" />}
              />
              <Route
                path="/line"
                element={isAuthenticated ? <Line /> : <Navigate to="/signIn" />}
              />
              <Route
                path="/pie"
                element={isAuthenticated ? <Pie /> : <Navigate to="/signIn" />}
              />
              <Route
                path="/signIn"
                element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />}
              />
              <Route
                path="/signUp"
                element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
