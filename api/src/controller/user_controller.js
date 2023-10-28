const User = require("../model/registration");
const bcrypt = require('bcryptjs');

module.exports.registration = async function (req, res) {
    try {
     
        const { name, email, phone, password, cpassword } = req.body;

        // Validate username and password
        if (!name || !email || !phone || !password || !cpassword) {
            return res.render('registration', { error: true, message: 'Please fill in all fields.', isLoggedIn: req.session?.isLoggedIn });
        }

        if (password.length < 6 || cpassword.length <6){
        return res.render('registration', { error: true, message: 'Password lenght should be more than 5.', isLoggedIn: req.session?.isLoggedIn });
        }

        if (phone.length < 10|| phone.length>10 ) {
            return res.render('registration', { error: true, message: 'Phone number must have 10 digit.', isLoggedIn: req.session?.isLoggedIn });
        }

        if (password === cpassword) {
            const existingUser = await User.findOne({ email: req.body.email }).exec();
            if (existingUser) {
                res.render('registration', { error: true, message: 'Email address already registered.', isLoggedIn: req.session?.isLoggedIn });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hash= await bcrypt.hash(password, salt);
                const chash= await bcrypt.hash(cpassword, salt);

                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hash,
                    cpassword: chash,
                });

                const postData = await user.save();
                res.redirect('/login');
            }
        } else {
            res.render('registration', { error: true, message: 'Passwords do not match.', isLoggedIn: req.session?.isLoggedIn });
        }

    } catch (err) {
        res.send(err);
    }
}

module.exports.login = async function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Check if the email and password match a record in the login collection
        const user = await User.findOne({ email}).exec();
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                req.session.isLoggedIn = true;
                res.render('course', { isLoggedIn: true, isLoggedInn: false });
            } else {
                res.render('login', { error: true, message: 'Passwords do not match.', isLoggedIn: req.session?.isLoggedIn });
            }
        } else {
            res.render('login', { error: true, message: 'User not found', isLoggedIn: req.session?.isLoggedIn });
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

module.exports.logout = function (req, res) {

    req.session.isLoggedIn = false;
    res.redirect('/');
}