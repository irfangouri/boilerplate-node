import mongoose from 'mongoose';

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      index: true,
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      index: true,
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Course',
      default: [],
    },
    otp: {
      type: String,
      default: null,
      required: false,
    },
    otpExpires: {
      type: Date,
      default: null,
      required: false,
    },
    verificationCode: {
      type: String,
      default: null,
      required: false,
    },
    verificationCodeExpires: {
      type: Date,
      default: null,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', authSchema);
