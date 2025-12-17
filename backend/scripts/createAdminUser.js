require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const usage = () => {
  console.log(`Usage: node scripts/createAdminUser.js --email <email> --password <password> [--name "Admin Name"]`)
  process.exit(1)
}

const parseArgs = () => {
  const args = process.argv.slice(2)
  const options = {}

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    switch (arg) {
      case '--email':
        options.email = args[++i]
        break
      case '--password':
        options.password = args[++i]
        break
      case '--name':
        options.name = args[++i]
        break
      default:
        console.error(`Unknown argument: ${arg}`)
        usage()
    }
  }

  if (!options.email || !options.password) {
    console.error('Missing required arguments.')
    usage()
  }

  return {
    email: options.email.trim().toLowerCase(),
    password: options.password,
    name: options.name || 'Admin User'
  }
}

const createAdmin = async ({ email, password, name }) => {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set.')
  }

  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB')

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      if (existingUser.role !== 'admin') {
        existingUser.role = 'admin'
      }

      existingUser.isActive = true

      if (password) {
        existingUser.password = password
      }

      if (name) {
        existingUser.name = name
      }

      await existingUser.save()
      console.log(`Updated existing user ${email} as admin.`)
      return
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      isActive: true
    })

    console.log(`Created new admin user ${email}.`)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

(async () => {
  try {
    const options = parseArgs()
    await createAdmin(options)
    process.exit(0)
  } catch (error) {
    console.error('Failed to create admin user:', error.message)
    await mongoose.disconnect().catch(() => {})
    process.exit(1)
  }
})()
