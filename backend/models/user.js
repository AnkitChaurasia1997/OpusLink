import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: [true, "Name can't be empty!"], 
      match: /^[a-zA-Z ]{2,50}$/,
      validate: {
        validator: function(value) {
          return /^[a-zA-Z ]+$/.test(value); 
        },
        message: 'Invalid name (2-50 characters, letters only)'
      }
    },
    email: { 
      type: String, 
      unique: true, 
      required: [true, "Email can't be empty!"], 
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      validate: {
        validator: function(value) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: 'Invalid email address'
      }
    },
    password: { 
      type: String, 
      required : [true, 'Password is required'],
      validate: {
            validator: function(value) {
                return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(value);
            },
            message: 'Invalid password (at least 8 characters with uppercase, number, special character)'
        }
    },
    role: { 
      type: String, 
      enum: ['freelancer', 'client'], 
      required: [true, "Role can't be empty!"]
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }, { timestamps: true });
  
  // Password hashing middleware
  userSchema.pre("save", async function(next){
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
  };
  
  export const User = mongoose.model("User", userSchema);