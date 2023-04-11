const dataMapper = require('./dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  homePage: async (req, res) => {
    try{
      const figurines = await dataMapper.getAllFigurinesWithAvgNote()
      const categories = await dataMapper.getCategory()
      res.render('accueil', {figurines, categories});
    }catch(error) {
      console.log(error)
      res.status(500).send(error.message);
    }
  },

  // méthode pour la page article
  articlePage: async (req, res) => {
    try{
      const id = req.params.id;
      const reviews = await dataMapper.getReviewsById(id)
      const figurine = await dataMapper.getOneFigurineWithReviewsStats(id)
      const categories = await dataMapper.getCategory()

      res.render('article', {figurine, reviews, categories});
    }catch(error) {
      console.log(error)
      res.status(500).send(error.message);
    }
  },

  categoryPage: async (req, res) => {
    try{
      const category = req.params.category;
      const categories = await dataMapper.getCategory()
      const figurines = await dataMapper.getAllFigurinesWithAvgNoteByCategory(category)

      res.render('accueil', {figurines, categories});
    }catch(error) {
      console.log(error)
      res.status(500).send(error.message);
    }
  }



};


module.exports = mainController;
