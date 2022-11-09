import mongoose from "mongoose";

export async function DBconnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://usuario:password@cluster0.o2tlg98.mongodb.net/spaceshop"
    );
  } catch (error) {
    console.log(error.message);
  }
}
