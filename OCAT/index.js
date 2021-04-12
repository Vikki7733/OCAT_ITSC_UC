

const { config } = require(`./server/libs`);
const express = require(`express`);
const app = express();
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
var bodyParser = require('body-parser');

const server = require(`http`).Server(app);
const cors = require('cors')

const { RouteLoader, IndexRoute} = require(`./server/utils`);

const favicon = require(`serve-favicon`);
const compression = require(`compression`);
app.use(compression());
app.use(cors());

app.use(session({
  secret: 'Your_Secret_Key',
  resave: true,
  saveUninitialized: true
}))

app.use(favicon(`${__dirname}/public/img/favicon.ico`));
app.use(express.static(`${__dirname}/public`));
app.set(`view engine`, `ejs`);
app.set(`views`, `${__dirname}/views`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1)


const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
})

redisClient.on('error', function (err) {
  //console.log('Could not establish a connection with redis. ' + err);
});

redisClient.on('connect', function (err) {
  //console.log('Connected to redis successfully');
});

//Configure session middleware
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'secret$%^134',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 1000 * 60 * 10 // session max age in milliseconds
  }
}));

app.use(`/public`, (req, res) => {
  res
    .status(404)
    .send(`resource not found`);
});

RouteLoader(app)
  .then(() => {
    app.all(`/*`, IndexRoute);
    server.listen(config.server.port);
    //console.log(`Listening on port: ${ config.server.port }!`); // eslint-disable-line
  })
  .catch((err) => {
    if (process.env.NODE_ENV !== `production`) {
      //console.log(err);  // eslint-disable-line
    }
    process.exit(1);
  });