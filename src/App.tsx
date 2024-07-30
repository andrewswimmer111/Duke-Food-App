import { useState } from "react";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogMealPage from "./pages/LogMealPage";
import StatPage from "./pages/StatPage";
import ErrorPage from "./pages/ErrorPage";

import { Helmet } from "react-helmet";

function App() {

  const apiUrl = `${import.meta.env.VITE_API_URL}`;

  const [page, setPage] = useState(0);
  const [user, setUser] = useState("");

  // 0 is login page
  // 1 is sign up page
  // 2 is stat page
  // 3 is submit meal


  const handleLoginBtn = (user: string) => {
    setUser(user);
  }

  const handlePageSwitch = (page: number) => {
    setPage(page);
  }

  let pageContent;
  switch (page) {
    case 0:
      pageContent = <LoginPage 
        handleLoginBtn={handleLoginBtn}
        handlePageSwitch={handlePageSwitch}
      />;
      break;
    case 1:
      pageContent = <SignupPage handlePageSwitch={handlePageSwitch} />;
      break;
    case 2:
      pageContent = <StatPage 
        user={user} 
        handlePageSwitch={handlePageSwitch}
      />
      break;
    case 3:
      pageContent = <LogMealPage 
        handlePageSwitch={handlePageSwitch}
        user={user}
      />
      break;
    default:
      pageContent = <ErrorPage />; 
  }

  return (
  <>
    <Helmet>
      <link rel="preload" href="/chapel.png" as="image" />
      <link rel="preload" href="/WU.png" as="image" />
      <link rel="preload" href="/chapel.png" as="image" />
      <link rel="preload" href="/Bostock.png" as="image" />
      <link rel="preload" href="/East.png" as="image" />
      <link rel="preload" href="/Football.png" as="image" />
      <link rel="preload" href="/Gardens.png" as="image" />
      <link rel="preload" href="/Kville.png" as="image" />
      <link rel="preload" href="/Bridge.png" as="image" />
      <link rel="preload" href="/Trinity.png" as="image" />
      
      
    </Helmet>

      <div className="App">
        {pageContent}
      </div>
    </>
  );
}

export default App;
