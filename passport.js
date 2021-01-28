const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User  = require('./models/usersModel.js')
const JwtStrategy = require('passport-jwt').Strategy

const cookieExtractor = req => {
    let token = null;

    if (req && req.cookies){
        token = req.cookies["access_token"]
    }
    return token
}

//Authorization
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "NoobCoder"
}, (payload, done)=> {
    User.findById({_id: payload.sub}, (err, user)=>{
        if (err)
            return done(err, false);
        if (user)
            return done(null, user);
        else   
            return done(null, false);
    });
}))

//Authentication local strategy username and password
passport.use(new LocalStrategy((username,password, done) => {
    User.findOne({username}, (err, user)=>{
        //Something bad with database
        if (err)
            return done(err);
        // If no user exists
        if (!user)
            return done(null, false);
        //Checks if password is correct
        user.comparePassword(password, done);

    });
}));