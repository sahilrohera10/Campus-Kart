import React, { useLayoutEffect, useState } from "react";
import canteen from "./canteenImg.png";
import stars from "./stars.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Shops() {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    fetch("http://localhost:8080/api/getshop")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("resp =>", resp.user);
        setData(resp.user);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {data.map((shop) => (
        <div
          style={{
            width: "450px",
            height: "280px",
            background: "blue",
            backgroundImage: "linear-gradient(#C75A6D, #451A45)",
            marginLeft: "20px",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex" }}>
            <img
              style={{
                width: "150px",
                marginTop: "-50px",
                position: "absolute",
                marginRight: "20px",
              }}
              src={canteen}
              alt=""
            />
            <p
              style={{
                fontSize: "50px",
                fontWeight: "500",
                color: "white",
                marginLeft: "180px",
                marginTop: "1px",
              }}
            >
              {shop.shopname}
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <p
              style={{
                color: "white",
                marginLeft: "20px",
                fontSize: "20px",
                marginBottom: "0px",
                marginTop: "12px",
              }}
            >
              Timings : <span>9:00am - 8:00pm</span>{" "}
            </p>
            <img
              style={{ width: "120px", height: "50px", marginLeft: "30px" }}
              src={stars}
              alt=""
            />
          </div>

          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: "20px",
              marginTop: "20px",
            }}
          >
            <LocationOnIcon style={{ width: "40px" }} />
            <p>
              {" "}
              {shop.address} near {shop.landmark}{" "}
            </p>
          </div>

          <Link to="/menupage">
            <Button style={{ marginLeft: "350px" }} variant="contained">
              Order
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
