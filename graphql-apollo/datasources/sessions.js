const sessions = require('../data/sessions.json');
const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class SessionAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {}

  getSessions(args) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(_.filter(sessions, args)));
    });
  }

  getSessionById(id) {
    throw new Error();
    const parsedId = parseInt(id);
    return sessions.find((s) => s.id === parsedId);
  }

  toggleFavoriteSession(id) {
    const parsedId = parseInt(id);
    const session = sessions.find((s) => s.id === parsedId);
    session.favorite = !session.favorite;
    return session;
  }

  addSession(session) {
    session.id = sessions.length;
    sessions.push(session);
    return session;
  }
}

module.exports = SessionAPI;
