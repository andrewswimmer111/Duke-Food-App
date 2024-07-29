
interface Props {
  onClick: (page: number) => void;
}

function Banner( {onClick}: Props) {

  const handleClick = () => {
    onClick(1);
  }

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
        <h1 style={{ color: "white" }}>Duke Food Tracker</h1>
        <div>
          Kind of like Spotify Wrapped, but for your meals instead. Log meals,
          see stats. Get started today -&gt;
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
          flex: 1,
          paddingRight: "30px",
        }}
      >
        <button type="button" className="btn btn-light btn-lg" onClick={handleClick}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Banner;
