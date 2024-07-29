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
  console.log(apiUrl)

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
      <link rel="preload" href="/resources/chapel.png" as="image" />
      <link rel="preload" href="/resources/WU.png" as="image" />
      <link rel="preload" href="resources/chapel.png" as="image" />
      <link rel="preload" href="resources/Bostock.png" as="image" />
      <link rel="preload" href="resources/East.png" as="image" />
      <link rel="preload" href="resources/Football.png" as="image" />
      <link rel="preload" href="resources/Gardens.png" as="image" />
      <link rel="preload" href="resources/Kville.png" as="image" />
      <link rel="preload" href="resources/Bridge.png" as="image" />
      <link rel="preload" href="resources/Trinity.png" as="image" />
      
      
    </Helmet>

      <div className="App">
        {pageContent}
      </div>
    </>
  );
}

export default App;
