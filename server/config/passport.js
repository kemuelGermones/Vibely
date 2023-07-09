require("dotenv").config();

const { User } = require("../models");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const SECRET = process.env.SECRET;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  const user = await User.findOne({ where: { id: jwt_payload.id } });

  if (user) {
    return done(null, user);
  }

  return done(null, false);
});
