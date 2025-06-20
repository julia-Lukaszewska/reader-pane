/**
 * @file User.js
 * @description Mongoose model for User accounts.
 *              Defines schema structure for:
 *                - email/password authentication
 *                - optional Google OAuth login
 *                - refresh tokens for JWT auth
 *              Used for login, registration, token validation and profile management.
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// -----------------------------------------------------------------------------
// PASSWORD COMPLEXITY VALIDATOR
// -----------------------------------------------------------------------------
/**
 * Ensure password meets complexity requirements:
 *  - Minimum 8 characters
 *  - At least one uppercase letter
 *  - At least one lowercase letter
 *  - At least one digit
 *  - At least one special character
 *
 * @param {string} pwd
 * @returns {boolean}
 */
function validatePasswordComplexity(pwd) {
    // eslint-disable-next-line no-useless-escape
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
  return regex.test(pwd)
}

// -----------------------------------------------------------------------------
// USER SCHEMA – fields for authentication and profile
// -----------------------------------------------------------------------------
const userSchema = new mongoose.Schema(
  {
    // Required email (unique identifier)
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: 'Invalid email format.',
      },
    },

    // Hashed password for local login
    password: {
      type: String,
      required: [true, 'Password is required.'],
      validate: {
        validator: validatePasswordComplexity,
        message:
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      },
    },

    // Google OAuth ID (if using Google login)
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // User display name
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },

    // Stored refresh tokens (used for JWT refresh logic)
    refresh: [
      {
        token: { type: String },
        exp: { type: Date },
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
    try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    } catch (err) {
      return next(err)
    }
  }
  next()
})

// -----------------------------------------------------------------------------
// METHODS – compare plain password with hashed password
// -----------------------------------------------------------------------------
/**
 * Compare a plaintext password to the hashed password stored in the database.
 *
 * @param {string} plainPassword
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password)
}

// -----------------------------------------------------------------------------
// EXPORT – Mongoose model
// -----------------------------------------------------------------------------
const User = mongoose.model('User', userSchema)
export default User
