import { useState, useEffect, FormEvent } from "react";
import CampusData from "../restuarant data/CampusData";
import MenuData from "../restuarant data/MenuData";
import axios from "axios";

interface Props {
  user: string;
}

function LogMealForm({ user }: Props) {
  const [displayRestaraunt, setDisplayRestaurant] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displaySummary, setDisplaySummary] = useState(false);
  const [mealLogged, setMealLogged] = useState(false);
  const [myCampus, setMyCampus] = useState("0");
  const [myRestaurant, setMyRestaurant] = useState("0");
  const [myOrder, setMyOrder] = useState<{ [category: string]: string }>({});
  const [myPrice, setMyPrice] = useState(0);
  const [myDiscount, setMyDiscount] = useState(0);
  const [myPayment, setMyPayment] = useState("Food points");

  const handleCampusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMyCampus(e.target.value);
    setMyRestaurant("0");
    setMyOrder({});
  };
  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMyRestaurant(e.target.value);
    setMyOrder({});
  };
  const handleOrderChange = (category: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItem = e.target.value;
    if (newItem === "") {
      setMyOrder((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        delete updatedOrders[category];
        return updatedOrders;
      });
    } else {
      setMyOrder((prevOrders) => ({ ...prevOrders, [category]: newItem }));
    }
  };
  const handleDiscountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "2") {
      setMyDiscount(5.5);
    } else if (e.target.value === "3") {
      setMyDiscount(10.5);
    } else {
      setMyDiscount(0);
    }
  };
  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "2") {
      setMyPayment("Money");
    } else {
      setMyPayment("Food points");
    }
  };

  useEffect(() => {
    setDisplayRestaurant(myCampus !== "0");
  }, [myCampus]);

  useEffect(() => {
    setDisplayMenu(myRestaurant !== "0");
  }, [myRestaurant]);

  useEffect(() => {
    setDisplaySummary(Object.keys(myOrder).length !== 0);
  }, [myOrder]);

  useEffect(() => {
    if (displaySummary) {
      let totalPrice = 0;
      Object.keys(myOrder).forEach((category) => {
        const selectedItem = myOrder[category];
        const itemPrice = MenuData[myRestaurant][category].find((item) => item.item === selectedItem)?.price || 0;
        totalPrice += Number(itemPrice.toFixed(2));
      });
      totalPrice = Number(((totalPrice - myDiscount) * 1.075).toFixed(2));
      setMyPrice(Math.max(totalPrice, 0));
    }
  }, [displaySummary, myOrder, myDiscount]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let discountDone = false;
    let remainingDiscount = myDiscount;

    for (const category in myOrder) {
      const item = myOrder[category];
      const prePrice = MenuData[myRestaurant][category].find((order) => order.item === item)?.price || 0;
      let finalPrice = 0;

      if (discountDone === false) {
        finalPrice = Number((prePrice - remainingDiscount).toFixed(2));
        if (finalPrice < 0) {
          remainingDiscount = -finalPrice;
          finalPrice = 0;
        } else {
          remainingDiscount = 0;
          discountDone = true;
          finalPrice = Number((1.075 * finalPrice).toFixed(2));
        }
      } else {
        finalPrice = Number((1.075 * prePrice).toFixed(2));
      }

      const discountApplied = finalPrice - Number((1.075 * prePrice).toFixed(2));

      const formData = {
        user,
        campus: myCampus,
        restaurant: myRestaurant,
        category,
        order: item,
        price: finalPrice,
        discount: discountApplied,
        payment: myPayment,
      };

      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/record`;
        await axios.post(apiUrl, formData);
      } catch (error) {
        console.log("Error occured: ", error);
      }
    }
    setMealLogged(true);
  };


  // Animation handling
  const [hasShownSummary, setHasShownSummary] = useState(false);
  useEffect(() => {
    if (displaySummary) {setHasShownSummary(true);}
  }, [displaySummary])

  const [animation, setAnimation] = useState('');
  useEffect(() => {
    if (displaySummary) {
      setAnimation('slide-left');
    } else if (hasShownSummary && !displaySummary) {
      setAnimation('slide-right');
    }
  }, [displaySummary]);
 

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "550px",
          marginRight: "25px",
          height: '100vh'
        }}
        className={animation}
      >
        <h5 className="fade-in-fast"> Location </h5>
        <select className="form-select mb-3 fade-in-fast" onChange={handleCampusChange} value={myCampus}>
          <option value="0" disabled={mealLogged}> Select Location</option>
          {CampusData.map((campus) => (
            <option key={campus.id} value={campus.name} disabled={mealLogged}>
              {campus.name}
            </option>
          ))}
        </select>

        {displayRestaraunt && (
          <>
            <select className="form-select fade-in-fast" onChange={handleRestaurantChange} value={myRestaurant}>
              <option value="0" disabled={mealLogged}> Select Restaurant</option>
              {CampusData.find((campus) => campus.name === myCampus)?.restaurants.map((restaurant, index) => (
                <option key={index} value={restaurant} disabled={mealLogged}>
                  {restaurant}
                </option>
              ))}
            </select>
            <div className="form-text fade-in-fast">
              Note: changing the restaurant will abandon your current order.
            </div>
          </>
        )}

        {displayMenu && MenuData[myRestaurant] && (
          <div
            style={{
              display: "block",
              width: "100%",
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            <h5 style={{ marginTop: "30px" }} className="fade-in-fast"> Food Ordered</h5>
            {Object.keys(MenuData[myRestaurant]).map((category, categoryIndex) => (
              <div key={categoryIndex} style={{ margin: "0% auto" }}>
                <div style={{ margin: "0", marginBottom: "10px" }} className="fade-in-fast">{category}</div>
                <select className="form-select mb-3 fade-in-fast" onChange={(e) => handleOrderChange(category, e)} value={myOrder[category] || ""}>
                  <option value="" disabled={mealLogged}> None </option>
                  {MenuData[myRestaurant][category].map((menuItem, index) => (
                    <option key={index} value={menuItem.item} disabled={mealLogged}>
                      {menuItem.item} - ${menuItem.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {displaySummary && (
        <div
          className='fade-in-slow'
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "25px",
            width: "550px",
          }}
        >
          <h5> Payment</h5>
          <select className="form-select mb-3" onChange={handlePaymentChange}>
            <option value="1" disabled={mealLogged}> Food points</option>
            <option value="2" disabled={mealLogged}>Money </option>
          </select>
          <select className="form-select mb-3" onChange={handleDiscountChange}>
            <option value="1" disabled={mealLogged}> No discount</option>
            <option value="2" disabled={mealLogged}> $5.50 equivalency </option>
            <option value="3" disabled={mealLogged}> $10.50 eqivalency </option>
          </select>

          <div>
            <h5 style={{ marginTop: "30px" }}> Order Summary </h5>
            <strong>
              {" "}
              <br /> Food ordered
            </strong>
            <div>
              {Object.keys(myOrder).map((category) => (
                <div key={category}>
                  {category}: {myOrder[category]}
                </div>
              ))}
            </div>
            <br />
              <div className="form-text fade-in-fast">
                Note: Side prices are included in the entrees. Only select sides if you actually ordered additional sides. 
              </div>
            <strong>
              {" "}
              <br /> Price{" "}
            </strong>
            <div>
              ${myPrice} (using {myPayment})
              <br />
            </div>
          </div>
          <br />
          <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={mealLogged}>
            Submit meal
          </button>
          <br />
          {mealLogged ? (
            <div className="alert">
              Meal logged successfully! Return to stats page. 
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default LogMealForm;
