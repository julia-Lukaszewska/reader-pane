/**
 * @file User.js
 * @description Mongoose model for User accounts.
 * Defines schema structure for:
 * - email/password authentication
 * - optional Google OAuth login
 * - refresh tokens for JWT auth
 * Used for login, registration, token validation and profile management.
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// -----------------------------------------------------------------------------
// USER SCHEMA – fields for authentication and profile
// -----------------------------------------------------------------------------

const userSchema = new mongoose.Schema(
  {
    // Required email (unique identifier)
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Hashed password for local login
    password: {
      type: String,
    },

    // Google OAuth ID (if using Google login)
    googleId: {
      type: String,
    },

    // User display name
    name: {
      type: String,
    },

    // Stored refresh tokens (used for JWT refresh logic)
    refresh: [
      {
        token: String,
        exp: Date,
      },
    ],
  },
  { timestamps: true }
)

// -----------------------------------------------------------------------------
// MIDDLEWARE – hash password before saving if modified
// -----------------------------------------------------------------------------

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

// -----------------------------------------------------------------------------
// METHODS – compare plain password with hashed password
// -----------------------------------------------------------------------------

userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password)
}

// -----------------------------------------------------------------------------
// EXPORT – Mongoose model
// -----------------------------------------------------------------------------

const User = mongoose.model('User', userSchema)
export default User
