const handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('unable to register')
    }
    
    db.select('email', 'hash').from('login')
    .where('email','=',email)
    .then(data => {
        bcrypt.compare(password, data[0].hash, (err, result) => {
            if (result) {
                db.select('*').from('users')
                 .where('email', '=', email)
                 .then(user => res.json(user[0]))
                 .catch(err => res.status(400).json('Username or password doesn\'t match'))
            } else {res.status(400).json('Username or password doesn\'t match')}
        })
    }).catch(err => res.status(400).json('Username or password doesn\'t match'))
}

module.exports = {
    handleSignin : handleSignin
}