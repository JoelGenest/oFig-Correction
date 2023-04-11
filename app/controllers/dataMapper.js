const client = require('../database');

const dataMapper = {
  getAllFigurinesWithAvgNote: async() => {
    const query = `
    SELECT figurine.*, ROUND(AVG(review.note)) AS avg_note
    FROM figurine
    LEFT JOIN review ON figurine.id = review.figurine_id
    GROUP BY figurine.id;
    `;
    const {rows: figurines} = await client.query(query);
    console.log(figurines)
    return figurines
  },

  getAllFigurinesWithAvgNoteByCategory: async(category) => {
    const query = {
      text: `
      SELECT figurine.*, ROUND(AVG(review.note)) AS avg_note
      FROM figurine
      LEFT JOIN review ON figurine.id = review.figurine_id
      WHERE LOWER(figurine.category) = $1
      GROUP BY figurine.id;
      `,
      values: [category]
    };
    const {rows: figByCategory} = await client.query(query, [category]);
    return figByCategory
  },
  
  getOneFigurine: async(id) => {
    const {rows: figurine} = await client.query('SELECT * FROM figurine WHERE id = $1', [id]);
    return figurine[0]
  },

  getCategory: async() => {
    const query = `
    SELECT DISTINCT category AS name, COUNT(id) AS qty
    FROM figurine
    GROUP BY category
    ORDER BY name;
    `;
    const {rows: categories} = await client.query(query);
    return categories
  },


  
  getReviewsById: async(id) => {
    const query = {
      text: `
      SELECT review.author, review.note, review.title, review.message
      FROM review
      WHERE figurine_id = $1;
      `,
      values: [id]
    };
    const {rows: reviews} = await client.query(query);
   return reviews
  },

  getOneFigurineWithReviewsStats: async(id) => {
    const query = {
      text: `
      SELECT figurine.*, ROUND(AVG(review.note)) AS avg_note, COUNT(review.id) AS count
      FROM figurine, review
      WHERE figurine.id = $1 AND review.figurine_id = $1
      GROUP BY figurine.id;
      `,
      values: [id]
    };
    const {rows: figurineWithStats} = await client.query(query);
    return figurineWithStats[0]
  },
  
};


module.exports = dataMapper;