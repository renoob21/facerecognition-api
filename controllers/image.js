const handleImage = (req, res, db) => {
    const {id, count} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', count)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage
}