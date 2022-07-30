// "use strict ";
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const product = require("../models/productsData");
const wishlist = require("../models/wishlist");
const path = require("path");
const multer = require("multer");

module.exports = {
  uploadProduct,
  deleteProduct,
  getProductsByCategory,
  getAllMyProducts,
  updateProductDetails,
  getAllProducts,
};

async function getAllProducts(req, res, next) {
  try {
    const data = await product.find();
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function uploadProduct(req, res, next) {
  try {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "./ImgUploads");
        // cb(null, path.join(__dirname, "/ImgUploads/"));
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    });

    const maxSize = 10 * 2000 * 2000;

    var upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
          return cb(null, true);
        }

        cb(
          "Error: File upload only supports the " +
            "following filetypes - " +
            filetypes
        );
      },

      // mypic is the name of file attribute
    }).single("image");

    upload(req, res, async function (err) {
      if (err) {
        // ERROR occurred (here it can be occurred due
        // to uploading image of size greater than
        // 1MB or uploading different file type)
        return res.send(err);
      } else {
        // productsData.update({ imageId: req.file.filename }, { where: { id: 2 } });
        const data = await product.create({
          imageId: req.file.filename,
          productName: req.body.productName,
          sellerId: req.body.sellerId,
          price: req.body.price,
          category: req.body.category,
          description: req.body.description,
          contactNumber: req.body.contactNumber,
          collegeName: req.body.collegeName,
        });

        console.log("data uploaded :", data);
        return res.status(200).json("product uploaded successfully");
        // SUCCESS, image successfully uploaded
        // res.send("Success, Image uploaded!");
      }
    });
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await product.deleteOne({ _id: req.params.productId });
    await wishlist.deleteOne({ _id: req.params.productId });

    return res.status(200).send("product deleted successfully");
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function getProductsByCategory(req, res, next) {
  try {
    const data = await product.find({
      category: req.params.category,
      collegeName: req.params.collegeName,
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function getAllMyProducts(req, res, next) {
  const id = ObjectId(req.params.sellerId);
  try {
    const data = await product.find({ sellerId: id });

    return res.status(200).json({ data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function updateProductDetails(req, res, next) {
  try {
    // const id = ObjectId(req.body.productId);

    await product.updateOne(
      { _id: req.body.productId },
      {
        productName: req.body.productName,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        contactNumber: req.body.contactNumber,
      }
      // { where: { _id: id } }
    );

    await wishlist.updateOne(
      { _id: req.body.productId },
      {
        productName: req.body.productName,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        contactNumber: req.body.contactNumber,
      }
      // { where: { _id: id } }
    );

    return res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

// async function getAllCompo(req, res, next) {
//   try {
//     data = await content.findAll({
//       where: { category: req.params.category, status: "public" },
//     });
//     return res.status(200).send({ data });
//   } catch (error) {
//     console.log("error=>", error);
//     return next(error);
//   }
// }

// async function getCollection(req, res, next) {
//   try {
//     data = await content.findAll({
//       where: { user_id: req.params.id },
//     });
//     // if (!data.lenght) {
//     //   return res.status(400).json("no data found");
//     // }
//     return res.status(200).send({ data });
//   } catch (error) {
//     console.log("error=>", error);
//     return next(error);
//   }
// }

// async function getCollectionFilter(req, res, next) {
//   try {
//     data = await content.findAll({
//       where: { user_id: req.params.id, category: req.params.category },
//     });
//     return res.status(200).send({ data });
//   } catch (error) {
//     console.log("error=>", error);
//     return next(error);
//   }
// }

// async function deleteMyCompo(req, res, next) {
//   try {
//     await content.destroy({
//       where: { id: req.body.compoId, user_id: req.body.userId },
//     });
//     return res.status(200).send("component deleted successfully");
//   } catch (error) {
//     console.log("error=>", error);
//     return next(error);
//   }
// }

// async function updateComponent(req, res, next) {
//   try {
//     await content.update(
//       {
//         name: req.body.name,
//         category: req.body.category,
//         status: req.body.status,
//       },
//       { where: { id: req.body.compoId, user_id: req.body.userId } }
//     );

//     return res.status(200).send("component updates successfully");
//   } catch (error) {
//     console.log("error=>", error);
//     return next(error);
//   }
// }
