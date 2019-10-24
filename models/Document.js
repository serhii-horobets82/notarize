const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const userScheme = require('./User');

const documentSchema = new mongoose.Schema(
  {
    type: String,
    content: String,
    signers: []
  },
  { timestamps: true }
);

/**
 
 */
documentSchema.pre("save", function save(next) {
  next();
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
