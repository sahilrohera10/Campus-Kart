const cron  = require("node-cron");
const product = require("../models/productsData");

module.exports = {
  updateNewlyAddedField,
  removeFeaturedProduct
};

async function updateNewlyAddedField() {
    const date = new Date();
    date.setDate(date.getDate() - 2);
  
    try {
      const productsToUpdate = await product.find({
        createdAt: { $lt: date },
        newly_added: true,
      });
  
      for (const product of productsToUpdate) {
        product.newly_added = false;
        await product.save();
      }
  
      console.log("Successfully updated newly_added field for products.");
    } catch (error) {
      console.error("Error while updating newly_added field:", error);
    }
  }

  async function removeFeaturedProduct() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
  
    try {
      const productsToUpdate = await product.find({
        featured_product: true,
        createdAt: { $lt: date },
      });
  
      for (const product of productsToUpdate) {
        product.featured_product = false;
        await product.save();
      }
  
      console.log("Successfully removed featured_product flag for products.");
    } catch (error) {
      console.error("Error while removing featured_product flag:", error);
    }
  }
  
  
  cron.schedule("0 0 * * *", () => {
    updateNewlyAddedField();
    removeFeaturedProduct();
  });
  
  