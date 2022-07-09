const router = require("express").Router();
const product = require("../Controller/Product");

const wishlist = require("../Controller/wishlist");
const forum = require("../Controller/forum");

//PRODUCT APIS

router.post("/product/upload", product.uploadProduct);
router.delete("/product/delete/:productId", product.deleteProduct);
router.get(
  "/product/get/:category/:collegeName",
  product.getProductsByCategory
);

router.get("/products/get/myProducts/:sellerId", product.getAllMyProducts);
router.get("/product/all", product.getAllProducts);
router.put("/product/updateProduct", product.updateProductDetails);

//FORUM APIS

router.post("/AddRequest", forum.AddForum);
router.get("/ShowAllRequest", forum.GetAllForum);

//WISHLIST APIS

router.post("/addprodinWishlist", wishlist.AddprodinWishlist);
router.get("/getProdfromWishlist/:id", wishlist.getprodfromwishlist);
router.delete(
  "/deleteprodfromwishlist/:cid/:pid",
  wishlist.deleteprodfromwishlist
);

module.exports = router;
