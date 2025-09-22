const User = require("../models/User.js");

exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signUp')
}

exports.showMembersPage = (req, res) => {
    res.render('members')
}

exports.get404Page = (req, res, next) => {
    res.status(404).render('404')
}

exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User(username, email, password);
    try {
        await user.save();
        res.redirect('/members');
    } catch (error) {
        console.error('Error during user signup:', error);
        res.redirect('/signup');
    }

}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne(email, password);
    try {
        if (user) {
            res.redirect('/members');
        } else {
            res.render('index', { error: 'Credenciais inválidas. Tente novamente.' });
        }
    } catch (error) {
        console.error('Error during user login:', error);
        res.render('index', { error: 'Ocorreu um erro. Tente novamente mais tarde.' });
    }
}