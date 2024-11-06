import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    message: { 
      type: String, 
      required: [true, "Notification message can't be empty!"], 
      minlength: [1, "Message should be at least 1 characters long"]
    },
    read: { 
      type: Boolean, 
      default: false 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }, { timestamps: true });
  
  export const Notification = mongoose.model("Notification", notificationSchema);