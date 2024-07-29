import { CSSProperties, useEffect, useState } from "react";
import axios from "axios";
import Slideshow from "./slideshow";

interface Props {
  username: string;
}

function StatFetch({ username }: Props) {
  // Time component
  const [selectedOption, setSelectedOption] = useState("All time")
  const optionToDateMap: Record<string, string> = {
    '0': "2020-01-01 to 2050-01-01", 
    '1': '2024-08-26 to 2024-12-16',   
    '2': '2025-01-08 to 2025-05-03', 
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  const [numItems, setNumItems] = useState(0);
  const [topItems, setTopItems] = useState<
    { item: string; category: string; restaurant: string; count: number }[]
  >([]);

  const [numRestaurants, setNumRestaurants] = useState(0);
  const [topRestaurants, setTopRestaurants] = useState<
    { restaurant: string; count: number }[]
  >([]);

  const [topCampus, setTopCampus] = useState("");
  const [topCampusTimes, setTopCampusTimes] = useState(0);
  const [offCampus, setOffCampus] = useState(0);

  const [foodPoints, setFoodPoints] = useState(0);
  const [moneySpent, setMoneySpent] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);

  const [hasData, setHasData] = useState(true);

  useEffect(() => {

    console.log("fetching data for time ", optionToDateMap[selectedOption])

    const fetchData = async () => {
      try {
        const dateFilterValue = optionToDateMap[selectedOption];
        const apiUrl = `${import.meta.env.VITE_API_URL}/data`;
        const response = await axios.get(apiUrl, {
          params: { username: username , date: dateFilterValue},
        });
        if (response.data.topItems.length > 1) {
          const { topItems, topRestaurant, topLocation, moneyData } =
            response.data;

          setNumItems(topItems.length);
          setTopItems(topItems);
          setNumRestaurants(topRestaurant.length);
          setTopRestaurants(topRestaurant);
          setTopCampus(topLocation[0].topLocation[0].location);
          setTopCampusTimes(topLocation[0].topLocation[0].count);
          setOffCampus(topLocation[0].offCampusCount[0].count);
          
          setFoodPoints(moneyData[0].foodPoints && moneyData[0].foodPoints.length > 0 
            ? moneyData[0].foodPoints[0].total 
            : 0
          );
          setMoneySpent(moneyData[0].money && moneyData[0].money.length > 0 
            ? moneyData[0].money[0].total 
            : 0
          );
          setMoneySaved(moneyData[0].discount && moneyData[0].discount.length > 0 
            ? moneyData[0].discount[0].total 
            : 0
          );
          
          setHasData(true);
        } else {
          setHasData(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedOption]);

  // For slideshow
  const slides = [
    { url: "resources/WU.png" },
    { url: "resources/chapel.png" },
    { url: "resources/Bostock.png" },
    { url: "resources/East.png" },
    { url: "resources/Football.png" },
    { url: "resources/Gardens.png" },
    { url: "resources/Kville.png" },
    { url: "resources/Bridge.png" },
    { url: "resources/Trinity.png" },
  ];

  const [link, setLink] = useState("resources/sad-cat.png");

  useEffect(() => {
    if (topCampus === "Brodhead Center (WU)") {
      setLink('resources/wu5.png');
    } else if (topCampus === "Bryan Center") {
      setLink('resources/bc.png');
    } else if (topCampus === "Other on campus") {
      setLink('resources/freeman.png');
    } else {
      setLink('resources/mr-tokyo.png');
    }
  }, [topCampus]);

  // Start Animation Stuff
  const [isFlipped, setIsFlipped] = useState(false);
  const handleCardClick = () => {
    setIsFlipped(!isFlipped); // Toggle the flipped state
  };
  const cardStyle: CSSProperties = {
    height: "55vh",
    width: "350px",
    background: "#e2e6ed",
    borderRadius: "15px",
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.75s',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };
  const genCardStyle: CSSProperties = {
    width: "90%",
    height: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    margin: '15px',
  }
  const cardFrontStyle: CSSProperties = {
    ...genCardStyle,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const cardBackStyle: CSSProperties = {
    ...genCardStyle,
    transform: 'rotateY(180deg)'
  }
  // End Animation stuff

  const innerDivStyle: CSSProperties = {
    display: "inline",
    backgroundColor: "#9CAFAA",
  };
  const [showInfo, setShowInfo] = useState(false);
  const infoTextStyle: CSSProperties = {
    fontSize: 12,
    display: showInfo ? 'inline' : 'none',
  };
  const handleHover = () => {
    setShowInfo(!showInfo); 
  };

  const [fadeClass, setFadeClass] = useState('');
  useEffect(() => {
    if (isFlipped) {setFadeClass("fade-in-slow")}
    else {setFadeClass("")}
  }, [isFlipped]);


  return (
    <>
      <br />
      {hasData ? (
        // If they have data, render this div
        <div
          className="container"
          style={{
            height: "75vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h2 style={{marginBottom: '30px'}}>
            Hi {username}. Good to see you again. What are the stats
            looking like?{" "}
          </h2>
          <div style={{ width: '40%', display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Time range: </div>
            <select className="form-select" aria-label="Default select example" onChange={handleDateChange}>
              <option value="0">All time</option>
              <option value="1">Fall Semester 2024</option>
              <option value="2">Spring Semester 2025</option>
            </select>
          </div>
          <div className="btn-block" style={{textDecoration: 'underline'}}onClick={handleCardClick}> Click here to flip the cards </div>
          <br/>
          <div
            className="card-containers"
            style={{
              height: "65vh",
              width: "1200px",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              background: "#011950",
              borderRadius: "30px",
            }}
          >
            <div style={cardStyle}>
              <h3 style={cardFrontStyle}>
                Food Stats
              </h3>
              <div style={cardBackStyle}>
              <h5 style={{ margin: "15px" }}>
                {" "}
                Top {numItems} favorite orders{" "}
              </h5>
              <ol style={{ textAlign: "left" }}>
                {topItems.map((item, index) => (
                  <li key={index}>
                    The {item.item} {item.category} from {item.restaurant}:
                    <div> ordered {item.count} times</div>
                    <div style={{ marginBottom: "15px" }} />
                  </li>
                ))}
              </ol>
              </div>
            </div>
            <div style={cardStyle}>
            <h3 style={cardFrontStyle}>
                Restaurant Stats
              </h3>
              <div style={cardBackStyle}>
              <h5 style={{ marginTop: "15px" }}>
                {" "}
                Top {numRestaurants} favorite restaurants
              </h5>
              <ol style={{ textAlign: "left" }}>
                {topRestaurants.map((place, index) => (
                  <li key={index}>
                    {place.restaurant} - eaten at {place.count} times
                  </li>
                ))}
              </ol>
              <h5 style={{ marginTop: "15px" }}> Favorite location</h5>
              <div>
                {" "}
                Your favorite location to eat is {topCampus}. You've eaten
                there {topCampusTimes} times!
              </div>
              <div className={`image-container ${fadeClass}`}>
              <img 
                src={link} 
                style={{
                  width: '100%',
                  height: '100%',
                  marginTop: '20px',
                  objectFit: 'contain'
                }}></img>
                </div>
              </div>
            </div>
            <div style={cardStyle}>
            <h3 style={cardFrontStyle}>
                Money Stats
              </h3>
              <div style={cardBackStyle}>
              <h5 style={{ marginTop: "15px" }}> Food points spent</h5>
              <div> You've spent ${foodPoints} food points so far. </div>
              <h5 style={{ marginTop: "15px" }}> Money Spent</h5>
              <div> You've spent ${moneySpent} in real money so far.</div>
              <div> (You've eaten off-campus {offCampus} times) </div>
              <h5 style={{ marginTop: "15px" }}> Money saved (equivalency) </h5>
              <div>
                You've saved {" "}
                <div
                  style={innerDivStyle}
                  onClick={handleHover}
                >
                  ${-moneySaved}
                </div>
                {" "}through equivalency. <br/> Click highlight for more info. 
              </div>
              <div style={infoTextStyle}>
                Why is this number not an even .50 or .00? Well, when you pay
                with equivalency, you actually pay
                before tax is applied. For example, when you have a $10.50
                equivalency, you can spend all $10.50 on food, without paying tax. If
                you didn't have equivalency, you would have needed $11.29 worth
                of food points to buy the same food, since tax would have been
                applied. This calculation includes the unspent tax 
                dollars.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // In case they have no data:
        <div
          className="container"
          style={{
            height: "75vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h2>
            Hey {username}. You don't have any logged meals for this time period yet.
          </h2>
          <br />
          <div style={{ width: '40%', display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Time range: </div>
            <select className="form-select" aria-label="Default select example" onChange={handleDateChange} value={selectedOption}>
              <option value="0">All time</option>
              <option value="1">Fall Semester 2024</option>
              <option value="2">Spring Semester 2025</option>
            </select>
          </div>
          <div>
            {" "}
            Seems you have no data for this time. Instead, please enjoy this slideshow of some cool photos I've taken
            at Duke
          </div>
          <div
            className="slideshow-container"
            style={{
              height: "65vh",
              margin: "0% auto",
              width: "1000px",
            }}
          >
            <Slideshow slides={slides} />
          </div>
        </div>
      )}
    </>
  );
}

export default StatFetch;
