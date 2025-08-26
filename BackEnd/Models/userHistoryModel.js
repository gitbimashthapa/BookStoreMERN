import mongoose from 'mongoose';

const userHistorySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT']
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const UserHistory = mongoose.model('UserHistory', userHistorySchema);
