const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User} = require('../models/user.model')



const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email:email});
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "YrJgpFZDKj7hwHsNIxLVU0Q9bVijrUF2",
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true });
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const registerUser = async (req, res) => {
    console.log("register")
    const { email, password } = req.body;
    try {
        const det = {
            $or: [
              { email:email}
            ]
          };
        let user = await User.findOne(det)
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = await User.create({
            email,
            password
        });
        console.log(JSON.stringify(user))
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "YrJgpFZDKj7hwHsNIxLVU0Q9bVijrUF2",
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true });
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
  loginUser,
  registerUser,
};
