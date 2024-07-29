import BackBtn from "../components/Back-btn";
import LogMealForm from "../components/logmeal-form";

interface Props {
    handlePageSwitch: (page: number) => void;
    user: string;
  }


function LogMealPage( {handlePageSwitch, user}: Props) {

    return (
        <div className="Webpage">
            <div>
                <BackBtn onClick={() => handlePageSwitch(2)}/>
            </div>

            <div style={{
                display: "flex",
                width: "75%",
                justifyContent: "center",
                margin: "0% auto"
            }}>
                <LogMealForm user={user}/>
            </div>


        </div>
    )
}

export default LogMealPage;