var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserCollection = require('../models/UserSchema');




router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  userCollection.findById(id, function(err, user) {
    done(err, user);
  });
});
var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
passport.use('signup', new LocalStrategy(
    {passReqToCallback: true},
    function(req, username,password, done){
      findOrCreateUser = function(){
        UserCollection.findOne({'username': username}, function(err,user){
          if(err){
            return done(err);
          }
          if (user){
            return done(null,false,{
              message: 'user exist'});
          }
          else {
            var newUser = new UserCollection();
            newUser.username = req.body.username;
            newUser.password = createHash(req.body.password);

            newUser.save(function(err){
              if (err){
                throw err;
              }
              return done(null, newUser)
            });

          }
        });

      };
      process.nextTick(findOrCreateUser);
    }
));

router.post('/',
    passport.authenticate('signup',
        {failureRedirect: '/users/failNewUser'}),
        function(req,res){
      res.send('User Created');
        });


passport.use(new LocalStrategy(
    function(username, password, done){
      UserCollection.findOne({username: username}, function(err,user){
        if(err){console.log('1');
        return done(err);}
        if(!user){
          console.log('2');
          return done(null, false, {message: 'Incorrect username'});
        }
        if(!isValidPassword(user,password)){
          return done(null, false, {message: 'incorrect password'});
        }
        return done(null, user, {user: user.username});
      })

}


));

router.post('/login',
    passport.authenticate('local',
        {failureRedirect: '/users/loginfail' }),
    function(req,res){
  req.session.username=req.user.username;
  res.send({

  });
        username: req.user.username,
    });

router.get('loginfail', (req,res)=>{
  res.send({});
});

router.get('/logout', (req, res, next)=>{
  req.session = null;
});

module.exports = router;

