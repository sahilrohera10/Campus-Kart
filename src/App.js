// import logo from "./logo.svg";
// import "./App.css";
// import MainPage from "./Pages/MainPage";
// import ProductGrid from "./Pages/ProductsGrid";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Interface from "./Pages/Interface";

// import NavBar from "./Components/NavBar";
// import Footer from "./Components/Footer";
// import ForumPage from "./Pages/ForumPage";
// import Wishlist from "./Components/Wishlist";
// // import SellProduct from "./Components/SellProduct";
// // import AddProduct from "./Components/AddProduct";
// import AddProduct from "./screens/AddProduct";
// import EditProduct from "./screens/EditProduct";
// import ProductDetail from "./screens/ProductDetail";
// import ShowProducts from "./screens/ShowProducts";
// import FoodMap from "./FoodOrdering/FoodMap";
// import Main from "./FoodOrdering/Main";
// import MenuPage from "./FoodOrdering/MenuPage";
// import ProductReview from "./Components/ProductReview";
// import PageNotFound from "./Components/PageNotFound";
// import ProfilePage from "./Components/ProfilePage";
// import MyProducts from "./Components/MyProducts";

// function App() {
//   return (
//     <>
//       {/* <MainPage /> */}
//       {/* <ProductGrid /> */}
//       {/* <NavBar /> */}
//       <Routes>
//         <Route path="/" element={<MainPage />} />
//         <Route path="products/:Category" element={<ProductGrid />} />
//         <Route path="forumpage" element={<ForumPage />} />
//         <Route path="wishlist" element={<Wishlist />} />
//         {/* <Route path="addProduct" element={<AddProduct />} /> */}
//         <Route path="/addProduct" element={<AddProduct />} />
//         <Route path="/products" element={<ShowProducts />} />
//         <Route path="/product/edit/:id" element={<EditProduct />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route path="campuseats" element={<Main />} />
//         <Route path="menupage" element={<MenuPage />} />
//         <Route path="/productReview" element={<ProductReview />} />
//         <Route path="/profilePage" element={<ProfilePage />} />
//         <Route path="/myProducts" element={<MyProducts />} />
//         <Route path="*" element={<PageNotFound />} />
//         <Route path="/interface" element={<Interface />} />
//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;

import "./App.css";
// import Sidebar from './Components/Others/Sidebar';
// import ChatBox from "./Components/ChatApp/ChatBox";
// import LoginRegister from './Components/Others/LoginRegister';
// import SidebarMain from './Components/Others/SidebarMain';
// import Dashboard from './Components/Others/Dashboard';
import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import { UserContext } from "./UserContext";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const routing = useRoutes(routes);

  return (
    <>
      <UserContext>{routing}</UserContext>
    </>
  );
}

export default App;
