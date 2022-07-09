import React, { useLayoutEffect, useState } from "react";

export default function ForumPage() {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    fetch("http://localhost:4000/ShowAllRequest")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("resp =>", resp);
        setData(resp);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "20px",
          paddingTop: "100px",
          paddingBottom: "250px",
        }}
      >
        {data &&
          data.map((forum) => (
            <div
              style={{
                width: "300px",
                height: "90px",
                color: "black",
                background: "blue",
                backgroundImage: "radial-gradient(#78fff6 , #2678e0)",
                marginBottom: "20px",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <p>
                from <span> {forum.name} </span>{" "}
              </p>
              <p> {forum.request} </p>
            </div>
          ))}
      </div>
    </div>
  );
}
