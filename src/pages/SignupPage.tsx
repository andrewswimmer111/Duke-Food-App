import SignupForm from "../components/signup-form";
import BackBtn from "../components/Back-btn";

interface Props {
  handlePageSwitch: (page: number) => void;
}

function SignupPage( {handlePageSwitch} : Props) {
  return (
    <div className="SignupForm" >
        <div>
        `<BackBtn onClick={() => handlePageSwitch(0)} />
        </div>
        <div style={{ 
          display: "flex",
          alignItems: "center", 
          height: "85vh"
        }}>
            <SignupForm />
        </div>
    </div>
  );
}

export default SignupPage;
