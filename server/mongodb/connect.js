import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log(err));
};

export default connectDB;
