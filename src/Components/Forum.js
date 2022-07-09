import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Forum() {
  const [values, setValues] = React.useState({
    name: "",
    request: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    const name = localStorage.getItem("name");
    event.preventDefault();
    const body = {
      name: name,
      request: values.request,
    };

    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const resp1 = await fetch(
        "https://campus-kart.herokuapp.com/AddRequest",
        requestOptions
      );

      if (resp1.ok) {
        handleClick();
        // alert("submitted")
      }
      // handleClicked();
      else throw { msg: "failed" };
    } catch (error) {
      console.log("Err ", error);
      error = error.msg ? error.msg : "could not submit the form";
      // alert(error) ;
      handleClicked();
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [openPopUpError, setOpenPopUpError] = React.useState(false);

  const handleClicked = () => {
    setOpenPopUpError(true);
  };

  const handleClosePopError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenPopUpError(false);
  };

  const handleClick = () => {
    setOpenPopUp(true);
  };

  const handleClosePop = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenPopUp(false);
  };

  return (
    <div className="2xl:mx-auto 2xl:container mx-4 py-16">
      <Snackbar open={openPopUp} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClosePop}
          severity="success"
          sx={{ width: "100%" }}
        >
          Sent Successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={openPopUpError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClosePopError}
          severity="error"
          sx={{ width: "100%" }}
        >
          Something went wrong
        </Alert>
      </Snackbar>

      <div className=" w-full  relative flex items-center justify-center">
        {/* <img
          src="https://i.ibb.co/4sYZ8gC/img-2.png"
          alt="dining"
          className="w-full h-full absolute z-0 hidden xl:block"
        /> */}
        {/* <img
          src="https://i.ibb.co/bbS3J9C/pexels-max-vakhtbovych-6301182-1.png"
          alt="dining"
          className="w-full h-full absolute z-0 hidden sm:block xl:hidden"
        /> */}
        {/* <img
          src="https://i.ibb.co/JKkzGDs/pexels-max-vakhtbovych-6301182-1.png"
          alt="dining"
          className="w-full h-full absolute z-0  sm:hidden "
        /> */}
        <div className="bg-gray-800 bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
          <h1 className="text-4xl font-semibold leading-9 text-white text-center">
            Join Our Community Forum
          </h1>
          <p className="text-base leading-normal text-center text-white mt-6">
            Subscribe to your newsletter to stay in the loop. Our newsletter is
            sent once in <br />a week on every friday so subscribe to get latest
            news and updates.
          </p>
          <form style={{ display: "flex" }} onSubmit={handleSubmit}>
            <input
              style={{ width: "800px" }}
              value={values.request}
              onChange={handleChange("request")}
              className="border border-white sm:border-transparent text-base w-full font-medium leading-none text-white p-4 focus:outline-none bg-transparent placeholder-white formInput "
              placeholder="Enter Your Requirements"
            />
            <input
              style={{ height: "50px" }}
              className="responsiveInput"
              type="text"
              value={values.request}
              onChange={handleChange("request")}
              placeholder="Enter Requirements"
            />
            <button
              type="submit"
              className="responsiveBtn"
              style={{
                background: "white",
                height: "50px",
                marginLeft: "10px",
                borderRadius: "10px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            <button
              style={{ background: "white", height: "70px" }}
              type="submit"
              className="formSubmit"
              // className="focus:outline-none focus:ring-offset-2 focus:ring border border-white sm:border-transparent w-full sm:w-auto bg-white py-4 px-6 hover:bg-opacity-75"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
