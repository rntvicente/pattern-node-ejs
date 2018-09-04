const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:good-reads-service');

const parse = xml2js.Parser({ explicitArray: false });

const goodreadsService = () => {
  const getBookById = (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=x55PgwjVaIyqh2XU1v3gQ`)
        .then((response) => {
          parse.parseString(response.data, (err, res) => {
            if (err) {
              debug(err);
            }

            debug(res);
            resolve(res.GoodreadsResponse.book);
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  };

  return { getBookById };
};

module.exports = goodreadsService();
