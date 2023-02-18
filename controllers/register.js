const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;
    
    if (!email || !name || !password) {
        return res.status(400).json('unable to register')
    }
    
    bcrypt.hash(password, null, null, function(err, hash) {
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                trx('users')
                .returning('*')
                .insert({
                  email: loginEmail[0].email,
                  name: name,
                  joined: new Date()
              }).then(user => {
                  res.json(user[0])
              }).catch(err => res.status(400).json('unable to register'))
            }).then(trx.commit).catch(trx.rollback)
        })
    });
}

module.exports = {
    handleRegister: handleRegister
}