const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
    minlength: 8,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Incorrect email format",
    },
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  avatarURL: {
    type: String,
    required: true,
  },
});

userSchema.post("save", handleMongooseError);

const registerJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .required()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one letter and one digit",
    }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const loginJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const User = model("user", userSchema);

module.exports = {
  User,
  schemas: { registerJoiSchema, loginJoiSchema },
};
