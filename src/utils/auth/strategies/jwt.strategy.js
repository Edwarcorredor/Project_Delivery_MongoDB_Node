import { Strategy, ExtractJwt } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
};

const jwtStrategy = new Strategy(options, (req, payload, done) => {
  if(!payload.permisos.includes(req.headers["accept-version"])){
    return done(null,false);
  }
  return done(null, payload);
});

export default jwtStrategy;
