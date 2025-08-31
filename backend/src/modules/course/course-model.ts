import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      enum: ['Business', 'Technology', 'UI/UX', 'Designer', 'Graphics', 'MERN Stack'],
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: [{
      type: String,
      required: true,
      trim: true,
    }],
    // image: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'media',
    // },
    publication: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['in_progress', 'draft', 'completed'],
      default: 'in_progress',
    },
    modules: [{
      type: mongoose.Types.ObjectId,
      default: [],
    }],
    examination: {
      type: mongoose.Types.ObjectId,
      ref: 'Examination',
      default: null,
    },
    preview: {
      type: mongoose.Types.ObjectId,
      ref: 'Preview',
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  },
  {
    timestamps: true,
    collection: 'courses',
  },
);

export default mongoose.model('Course', courseSchema);
