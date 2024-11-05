import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: [true, "Project title can't be empty!"], 
      minlength: [5, "Title should be at least 5 characters long"],
      maxlength: [100, "Title should not exceed 100 characters"]
    },
    description: { 
      type: String, 
      required: [true, "Description can't be empty!"], 
      minlength: [10, "Description should be at least 10 characters long"]
    },
    budget: { 
      type: Number, 
      required: [true, "Budget can't be empty!"], 
      min: [1, "Budget should be greater than 0"]
    },
    clientId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['open', 'closed'], 
      default: 'open' 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }, { timestamps: true });
  
  export const Project = mongoose.model("Project", projectSchema);