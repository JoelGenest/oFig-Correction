const dataMapper = require('./dataMapper');

const bookmarksController = {

  // méthode pour afficher les favoris
  bookmarksPage: async (req, res) => {
    try{
      res.render('favoris', {figurines: req.session.bookmarks || []});
    }catch(error) {
      console.log(error)
      res.status(500).send(error.message);
    }
  },

  addBookmarks: async (req, res) => {
    const id = req.params.id;
    if(!req.session.bookmarks) {
      req.session.bookmarks = [];
    } 
    
    if(!req.session.bookmarks.find(figurine => figurine.id == id)) {
      req.session.bookmarks.push(await dataMapper.getOneFigurine(id))
    }

    res.redirect('/bookmarks');
  },

  deleteBookmarks: (req, res) => {
    indexToDelete = req.session.bookmarks.findIndex(figurine => figurine.id == req.params.id);
    req.session.bookmarks.splice(indexToDelete, 1);
    res.redirect('/bookmarks');
  }

};


module.exports = bookmarksController;
