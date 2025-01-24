const { validationResult } = require('express-validator');
const User = require('../models/User');
const JWT = require('jsonwebtoken');

signUp = async (req, res) => {

    try {

        const errors=validationResult(req);

        if(!errors.isEmpty())
        {
            return res.status(400).json({error:errors.array()[0].msg});
        }

        const { userName, email, password} = req.body;
        
        const profileImage=req.file?req.file.filename:undefined;

        const alreadyExists = await User.findOne({ email: email });

        if (alreadyExists) {
            return res.status(409).json({ error: "Invalid credentials" });
        }

        const user = new User({ userName, email, password ,profileImage});
        await user.save(); 

        res.status(201).json({ message: "User created successfully" });
    }

    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}

logIn = async (req, res) => {

    try {

        const errors=validationResult(req);

        if(!errors.isEmpty())
        {
            return res.status(400).json({error:errors.array()[0].msg});
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user ||! (await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = await JWT.sign({user_Id:user._id.toString()}, process.env.SECRET_KEY);

        res.status(200).json({ token });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }


}

module.exports = { signUp, logIn }