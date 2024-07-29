import Banner2 from "../components/banner2";
import StatFetch from "../components/stat-fetch";

interface Props {
    user: string 
    handlePageSwitch: (page: number) => void;
}

function StatPage( {user, handlePageSwitch}: Props) {

    return (
        <div className="Webpage" style={{height: '100vh'}}>
            <div className="Banner">
                <Banner2 user={user} onClick={() => handlePageSwitch(3)}/>
            </div>
            <div className="container">
                <StatFetch username={user}/> 
            </div>
        </div>
    )
}

export default StatPage;