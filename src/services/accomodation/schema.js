import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const AccomodationMondel = new Schema(
  {
    name: String,
    description: String,
    maxGuests: Number,
    city: String,
    users: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model('Accomodation', AccomodationMondel);