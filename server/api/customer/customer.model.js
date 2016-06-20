'use strict';

import mongoose from 'mongoose';

var CustomerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, enum: ['Cash', 'Credit']},
  price: Number,
  date: Date
});

export default mongoose.model('Customer', CustomerSchema);
