import React from "react";

export default function TagLine() {
  return (
    <div>
      <p
        style={{
          fontSize: "60px",
          fontWeight: "600",
          paddingTop: "180px",
          marginLeft: "150px",
          fontFamily: "cursive",
        }}
      >
        {" "}
        Campus Eats{" "}
      </p>
      <div style={{ display: "flex", marginTop: "60px" }}>
        <div
          style={{
            width: "250px",
            height: "200px",
            background: "green",
            backgroundImage: "radial-gradient(#fefffe, #75ff00)",
            marginLeft: "85px",
            borderRadius: "10px",
          }}
        >
          <p style={{ fontSize: "25px", fontWeight: "500", padding: "10px" }}>
            Facilitates the pre-ordering of food from your campus canteen
          </p>
        </div>

        <div
          style={{
            width: "250px",
            height: "200px",
            background: "green",
            backgroundImage: "radial-gradient(#fefffe, #75ff00)",
            marginLeft: "85px",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "25px",
              fontWeight: "500",
              padding: "10px",
              paddingTop: "50px",
            }}
          >
            Connecting all the eatries around .
          </p>
        </div>
      </div>
    </div>
  );
}
