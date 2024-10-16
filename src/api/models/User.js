const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    rol: {
      type: String,
      trim: true,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    tickets: [{ type: mongoose.Types.ObjectId, ref: "Ticket" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
