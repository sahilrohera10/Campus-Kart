const product = require("../models/productsData");
const schedule = require('node-schedule')

module.exports = {
  updateNewlyAddedField,
};

async function updateNewlyAddedField() {
    const date = new Date();
    date.setDate(date.getDate() - 10);
  
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


  
  


  const rule = new schedule.RecurrenceRule();
  rule.hour = 0; // 0 represents 12:00 AM (midnight)
  

const jobTime = new Date();
jobTime.setUTCHours(rule.hour);
jobTime.setUTCMinutes(rule.minute);
const job = schedule.scheduleJob(rule, () => {
  updateNewlyAddedField();
});
  
  