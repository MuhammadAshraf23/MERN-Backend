import User from "../models/userSchema.js";



export const userSignup=async(req,res)=>{
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        console.log("req",req.body)
        // Create a new user
       const newUser = new User({ firstName, lastName, email, password, phoneNumber });
         await newUser.save();
         res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Server error.' });
    }
}