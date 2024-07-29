interface Props {
    user: string;
    onClick: () => void;
}
  
  function Banner2( {user, onClick}: Props) {
  
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            textAlign: "left",
            paddingLeft: "30px",
            height: "100px",
            alignContent: "center",
          }}
        >
          <h1 style={{ color: "white" }}>{user}'s Dashboard</h1>
            <div>
                Hope you like the website!
            </div>
        </div>
  
        <div
          style={{
            textAlign: "right",
            flex: 1,
            paddingRight: "30px",
          }}
        >
          <button type="button" className="btn btn-light btn-lg" onClick={onClick}>
            Log meal
          </button>
        </div>
      </div>
    );
  }
  
  export default Banner2;
  