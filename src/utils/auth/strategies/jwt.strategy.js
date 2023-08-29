import { Strategy, ExtractJwt } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

export default jwtStrategy;
