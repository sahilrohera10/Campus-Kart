import React from "react";
import FoodMap from "./FoodMap";
import TagLine from "./TagLine";
import Shops from "./Shops";
import campuseats from "./campuseats.jpeg";

export default function Main() {
  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
        <img
          style={{
            width: "95%",
            padding: "20px",
            paddingBottom: "40px",
            borderRadius: "50px",
            marginLeft: "50px",
          }}
          src={campuseats}
          alt=""
        />
      </div>
      <div style={{ display: "flex" }}>
        <FoodMap />
        <TagLine />
      </div>
      <br />
      <br />
      <br />
      <br />

      <p style={{ textAlign: "center", fontSize: "50px", fontWeight: "600" }}>
        Canteens
      </p>
      <br />
      <br />
      <Shops />
    </>
  );
}
