function getHost(env) {
  switch (env) {
    case 'production': {
      return "'http://teachers-data-scraping.herokuapp.com'";
    }
    case 'development': {
      return "'http://localhost:3000'";
    }
    default: {
      return "'http://localhost:3000'";
    }
  }
}

module.exports = getHost(process.env.NODE_ENV);