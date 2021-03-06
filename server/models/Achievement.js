const { Schema, model } = require("mongoose");

const achievementSchema = new Schema({
  activity: {
    type: Schema.Types.ObjectId,
    ref: "activity",
  },
  doneToday: {
    type: Boolean,
    required: true,
    default: false,
  },
  weeklyCount: {
    type: Number,
    required: true,
  },
  monthlyCount: {
    type: Number,
    required: true,
  },
});

const Achievement = model("achievement", achievementSchema);

module.exports = Achievement;
