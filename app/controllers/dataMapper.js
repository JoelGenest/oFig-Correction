const client = require('../database');

const dataMapper = {
  getAllFigurinesWithAvgNote: async() => {
    const query = `
    SELECT figurine.*, ROUND(AVG(review.note)) AS avg_note
    FROM figurine
    LEFT JOIN review ON figurine.id = review.figurine_id
    GROUP BY figurine.id;
    `;
    const {rows} = await client.query(query);
    return rows
  },

  getAllFigurinesWithAvgNoteByCategory: async(category) => {
    const query = `
    SELECT figurine.*, ROUND(AVG(review.note)) AS avg_note
    FROM figurine
    LEFT JOIN review ON figurine.id = review.figurine_id
    WHERE LOWER(figurine.category) = $1
    GROUP BY figurine.id;
    `;
    const {rows} = await client.query(query, [category]);
    return rows
  },
  
  getOneFigurine: async(id) => {
    const {rows} = await client.query('SELECT * FROM figurine WHERE id = $1', [id]);
    return rows[0]
  },

  getCategory: async() => {
    const query = `
    SELECT DISTINCT category AS name, COUNT(id) AS qty
    FROM figurine
    GROUP BY category
    ORDER BY name;
    `;
    const {rows} = await client.query(query);
    return rows
  },


  
  getReviewsById: async(id) => {
    const query = `
    SELECT review.author, review.note, review.title, review.message
    FROM review
    WHERE figurine_id = $1;
    `;
    const {rows} = await client.query(query, [id]);
   return rows
  },

  getOneFigurineWithReviewsStats: async(id) => {
    const query = `
    SELECT figurine.*, ROUND(AVG(review.note)) AS avg_note, COUNT(review.id) AS count
    FROM figurine, review
    WHERE figurine.id = $1 AND review.figurine_id = $1
    GROUP BY figurine.id;
    `;
    const {rows} = await client.query(query, [id]);
    return rows[0]
  },
  
};


module.exports = dataMapper;