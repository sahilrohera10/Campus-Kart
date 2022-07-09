import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";

const CategoryProductGrid = () => {
  const navigate = useNavigate();

  const [finalData, setFinalData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const college = localStorage.getItem("collegeName");

  const { Category } = useParams();
  console.log("category is =>", Category);

  useLayoutEffect(() => {
    console.log("in fetcher");
    try {
      fetch(`http://localhost:4000/product/get/${Category}/${college}`)
        //   fetch("http://localhost:3790/product/all")
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFinalData(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const id = localStorage.getItem("id");
  const handleAdd = async (addData) => {
    try {
      const body = {
        customerId: id,
        productId: addData.id,
        productName: addData.productName,
        description: addData.description,
        price: addData.price,
        imgId: addData.imageId,
        category: addData.category,
        contactNumber: addData.contactNumber,
      };
      console.log("data=> ", body);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      const resp = await fetch(
        "http://localhost:4000/addprodinWishlist",
        requestOptions
      );
      // .then((resp) => {
      if (resp.status === 200) {
        alert("added to wishlist");
      }
      if (resp.status === 300) {
        alert("already added to wishlist");
      }
      // });
    } catch (error) {
      console.log("error=>", error);
      alert("error is occurred");
    }
  };

  return (
    <div className=" 2xl:container 2xl:mx-auto">
      <div className=" bg-gray-50 text-center lg:py-10 md:py-8 py-6">
        <p className=" w-10/12 mx-auto md:w-full  font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800"></p>
      </div>
      <div className=" py-6 lg:px-20 md:px-6 px-4">
        <p className=" font-normal text-sm leading-3 text-gray-600 ">
          Home / Shop by Category / All
        </p>
        <hr className=" w-full bg-gray-200 my-6" />

        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {finalData &&
            finalData.map((data) => (
              <div>
                <button
                  style={{
                    position: "absolute",
                    zIndex: "100",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <BsHeart
                    size={20}
                    style={{ marginLeft: "230px", marginTop: "230px" }}
                    onClick={() => {
                      handleAdd(data);
                    }}
                  />
                </button>
                <Card
                  className="shadow-lg m-2 p-3 rounded"
                  style={{ width: "18rem", cursor: "pointer", height: "18rem" }}
                  onClick={() =>
                    navigate("/product/productReview", {
                      state: {
                        data: {
                          imgId: data.imageId,
                          productName: data.productName,
                          price: data.price,
                          description: data.description,
                          contactNumber: data.contactNumber,
                        },
                      },
                    })
                  }
                >
                  <Card.Img
                    variant="top"
                    src={`https://campus-kart.herokuapp.com/uploads/${data.imageId}`}
                  />
                  <Card.Body>
                    <Card.Title>Title: {data.productName}</Card.Title>
                    <Card.Title>Price: Rs{data.price}</Card.Title>
                    <Card.Text>
                      Description: {data.description.slice(0, 10)}...
                    </Card.Text>

                    {/* <Link to={`product/${product.id}`}> */}
                    {/* <button>Detail</button> */}
                    {/* </Link> */}
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductGrid;
