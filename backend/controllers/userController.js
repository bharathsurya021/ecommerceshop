import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

//Auth user & get token
// Post /api/users/login
// Public route
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })

    } else {
        res.status(401)
        throw new Error('Inavlid email or password')
    }
})

export { authUser }