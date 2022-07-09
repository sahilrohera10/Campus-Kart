import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import DropdownSelect from "../Components/DropdownSelect";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// import { Link } from 'react-router-dom'

const ProductGrid = () => {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  // window.onload = function () {
  //   if (!window.location.hash) {
  //     window.location = window.location + "#loaded";
  //     window.location.reload();
  //   }
  // };
  // window.location.reload();

  const navigate = useNavigate();

  const [finalData, setFinalData] = useState();

  useEffect(() => {
    // window.location.reload();
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   console.log("in useEffect");
  //   setFinalData({ loading: true, finalData: null, err: null });

  //   fetcher();
  // }, []);
  const college = localStorage.getItem("collegeName");

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("in search");
    try {
      await fetch(`http://localhost:4000/product/get/${category}/${college}`)
        //  await fetch("http://localhost:3790/product/all")
        .then((resp) => resp.json())
        .then((resp) => {
          // window.location.reload(false);
          console.log("data=>", resp);
          setFinalData(resp.data);
          // console.log("img =>", resp.data[0].imageId);
          // console.log("name=>", resp.data[0].productName);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const { Category } = useParams();
  // console.log("category is =>", Category);

  useLayoutEffect(() => {
    console.log("in fetcher");
    try {
      // fetch(`http://localhost:3790/product/get/${Category}/${college}`)
      fetch("http://localhost:4000/product/all")
        .then((resp) => resp.json())
        .then((resp) => {
          // window.location.reload(false);
          console.log("data=>", resp);
          setFinalData(resp.data);
          // console.log("img =>", resp.data[0].imageId);
          // console.log("name=>", resp.data[0].productName);
        });
    } catch (error) {
      console.log(error);
    }

    // if (err) {
    //   setFinalData({ loading: false, finalData: null, err: null });
    // } else {
    //   console.log("In Async func ", response);
    //   // response = response.data;

    //   // setFinalData(response);
    //   setFinalData({ loading: false, finalData: response.data, err: null });
    // }
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

        <div className=" flex justify-between items-center">
          <form style={{ display: "flex" }} onSubmit={handleSearch}>
            <Box sx={{ minWidth: 180 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"book"}>Book</MenuItem>
                  <MenuItem value={"stationery"}>Stationery</MenuItem>
                  <MenuItem value={"electronic"}>Electronics</MenuItem>
                  <MenuItem value={"furniture"}>Furniture</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              style={{ height: "50px", width: "50px", marginTop: "2px" }}
              variant="contained"
              type="submit"
            >
              Apply
            </Button>
          </form>
          {/* <div className=" flex space-x-3 justify-center items-center">
            <svg
              className=" cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 7.5H20.25"
                stroke="#1F2937"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M3.75 12H20.25"
                stroke="#1F2937"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M3.75 16.5H20.25"
                stroke="#1F2937"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            <p className=" font-normal text-base leading-4 text-gray-800">
              Filter
            </p>
          </div> */}
          {/* <p className=" cursor-pointer hover:underline duration-100 font-normal text-base leading-4 text-gray-600">
            Showing 18 products
          </p> */}
        </div>

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
                    src={`http://localhost:4000/uploads/${data.imageId}`}
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

export default ProductGrid;
