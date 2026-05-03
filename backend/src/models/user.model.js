import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    index: true 
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true 
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  // --- ADDED FOR STRIPE & PRD WEEK 3 ---
  subscriptionStatus: {
    type: String,
    enum: ["standard", "pro"], // Restricts values to your PRD tiers
    default: "standard"
  },
  stripeCustomerId: {
    type: String, // Stored after first successful payment
    default: null
  },
  aiCredits: {
        type: Number,
        default: 5 // Default free credits for new users
    },
    subscriptionStatus: {
        type: String,
        enum: ["free", "pro"],
        default: "free"
    }
  // -------------------------------------
}, { 
  timestamps: true 
});

// Pre-save Middleware for Hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance Method for Authentication
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);
export default User;