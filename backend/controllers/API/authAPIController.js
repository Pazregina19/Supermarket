    const User = require('../../models/user');
    const jwt = require('jsonwebtoken');
    const { SECRET } = require('../../middleWares/authenticationMW');

    exports.register = async (req, res) => {
    try {
        const { username, email, password, phone, address, role } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: 'Email already registered' });
        const user = await User.create({ username, email, password, phone, address, role: role || 'client' });
        res.status(201).json({ message: 'User created', userId: user._id });
    } catch (err) {
        res.status(500).json({ error: 'Error registering' });
    }
    };

    exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = jwt.sign(
        { _id: user._id, username: user.username, role: user.role, email: user.email },
        SECRET,
        { expiresIn: '24h' }
        );
        res.json({ token, role: user.role, username: user.username });
    } catch (err) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
    };

    exports.me = (req, res) => {
        res.json({ user: req.user });
    };