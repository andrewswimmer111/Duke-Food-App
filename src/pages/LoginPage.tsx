
import LoginForm from "../components/login-form";
import Banner from "../components/banner";

interface Props {
  handleLoginBtn: (user: string) => void;
  handlePageSwitch: (page: number) => void;
}


function LoginPage( { handleLoginBtn, handlePageSwitch}: Props ) {

    return (
        <div className="Welcome">
          <div className="Banner">
            <Banner onClick={handlePageSwitch} />
          </div>
          <div className="LoginForm">
            <LoginForm 
              setPage={handlePageSwitch} 
              setUser={handleLoginBtn}/>
          </div>
        </div>
      );
}

export default LoginPage;