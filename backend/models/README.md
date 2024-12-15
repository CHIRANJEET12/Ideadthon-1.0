# MongoDB Models Documentation

This document provides detailed information about the MongoDB models used in the construction service platform. The platform connects homeowners with architects and contractors.

## Models Overview

The platform uses three main models:
- User (Homeowner)
- Architect
- Contractor

### Common Features Across Professional Models (Architects & Contractors)

Both architects and contractors share these base fields:

```javascript
{
  fullname: {
    firstname: String,  // required
    lastname: String
  },
  email: String,       // required, unique
  password: String,    // required, hashed
  phone: String,       // required
  businessName: String,// required
  businessLicense: String, // required
  yearsOfExperience: Number, // required
  portfolio: [{
    title: String,
    description: String,
    images: [String]
  }],
  ratings: [{
    user: ObjectId,    // reference to User model
    rating: Number,    // 1-5 scale
    review: String
  }],
  activeProjects: [{
    project: ObjectId, // reference to Project
    status: String    // 'ongoing' or 'completed'
  }]
}
```

## User Model

### Purpose
Represents homeowners who can post projects and hire professionals.

### Schema Structure

```javascript
{
  fullname: {
    firstname: String,  // required
    lastname: String
  },
  email: String,       // required, unique
  password: String,    // required, hashed
  phone: String,
  location: {
    city: String,
    state: String
  },
  projects: [{
    title: String,     // required
    description: String,// required
    budget: {
      min: Number,     // required
      max: Number      // required
    },
    location: {
      city: String,    // required
      state: String    // required
    },
    status: String,    // 'active', 'completed', or 'cancelled'
    createdAt: Date
  }],
  shortlistedProviders: [{
    provider: ObjectId, // reference to architect or contractor
    providerType: String // 'architect' or 'contractor'
  }]
}
```

## Architect Model

### Purpose
Represents architectural professionals who can bid on and complete projects.

### Unique Fields

```javascript
{
  specializations: [{
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'landscape', 'interior']
  }]
}
```

## Contractor Model

### Purpose
Represents construction contractors who can bid on and complete projects.

### Unique Fields

```javascript
{
  specializations: [{
    type: String,
    enum: ['general', 'electrical', 'plumbing', 'carpentry', 'masonry']
  }],
  insurance: {
    provider: String,
    policyNumber: String,
    expiryDate: Date
  }
}
```

## Authentication Methods

All models include the following authentication methods:

1. `generateAuthToken()`
   - Generates a JWT token
   - Expires in 24 hours
   - Uses environment variable JWT_SECRET

2. `comparePassword(password)`
   - Async method
   - Compares provided password with hashed password
   - Returns boolean

3. `hashPassword(password)` (static method)
   - Async method
   - Hashes password using bcrypt
   - Salt rounds: 10

## Usage Examples

### Creating a New User

```javascript
import User from './models/user.js';

const newUser = new User({
  fullname: {
    firstname: "John",
    lastname: "Doe"
  },
  email: "john@example.com",
  password: await User.hashPassword("securepassword"),
  phone: "1234567890",
  location: {
    city: "New York",
    state: "NY"
  }
});

await newUser.save();
```

### Authentication

```javascript
// Login verification
const user = await User.findOne({ email });
const isValid = await user.comparePassword(password);
if (isValid) {
  const token = user.generateAuthToken();
  // Use token for authentication
}
```

## Important Notes

1. Password Security
   - Passwords are never stored in plain text
   - Always use the hashPassword method before saving
   - Use comparePassword for verification

2. Validation
   - Email addresses must be unique across all models
   - Required fields must be provided
   - Specializations must match predefined enum values

3. References
   - Projects maintain references to both users and professionals
   - Ratings include references to the user who provided them

## Environment Variables

The following environment variables are required:

```
JWT_SECRET=your_jwt_secret_key
```