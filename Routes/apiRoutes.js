const router = require("express").Router();
const product = require("../Controller/product.js");
const wishlist = require("../Controller/wishlist.js");
const forum = require("../Controller/forum.js");
const user = require("../Controller/users.js");

//USER APIS

router.post("/sendmail", user.sendMAil);
router.post("/Register", user.Register);
// router.post("/Login", user.Login);
router.get("/get/user/:id", user.getUserById);
router.put("/profile/update", user.updateCollegeName);

router.post("/contactmail", user.sendmailforcontact);
router.delete("/DeleteAccount/:id", user.Deleteaccount);

//PRODUCT APIS

router.post("/product/upload", product.uploadProduct);
router.delete("/product/delete/:productId", product.deleteProduct);
router.get(
  "/product/get/:category/:collegeName",
  product.getProductsByCategory
);

router.get("/products/get/myProducts/:sellerId", product.getAllMyProducts);
router.get("/product/get", product.getProducts);
router.get("/product/byFeature", product.getProductsByfeature);
router.put("/product/updateProduct", product.updateProductDetails);
router.put("/set-featured/:productId", product.addInFeaturedProduct);
router.put("/product/updatesoldStatus", product.UpdateSoldStatus);

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
