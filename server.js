
var request = require('request')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var app = new (require('express'))()
var serverPort = 3000
var webpackPort = 3001

var config = require('./webpack-hot-dev-server.config')
config.entry.main.unshift("webpack-dev-server/client?http://localhost:"+webpackPort+"/", "webpack/hot/dev-server");
config.plugins.push( new webpack.HotModuleReplacementPlugin())

var entryHtml
console.log(config)
var compiler = webpack(config)
new WebpackDevServer(compiler, {
  noInfo: false,
	publicPath: config.output.publicPath,
	hot: true,
	colors: true
   }).listen(webpackPort, 'localhost', function (err, result) {
  if (err) {
    return console.log(err)
  }
  request('http://localhost:'+ webpackPort + '/dist/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
     console.log(body)
     entryHtml = body
    }
  })
  console.log('webpack served at http://localhost:'+ webpackPort + '/')
})


app.get('/', function(req, res) {
  res.send(entryHtml)
//	res.sendFile(__dirname + '/index.html')
})

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api',function(req,res){
  var list=require('./src/actions/api.js')
  /*u={"fishBall":(Math.random()*10+10).toFixed(2),"username":"卟呤卟呤的闪耀","waitingOrderCount":1};*/
  res.header("Access-Control-Allow-Origin", "*");

  res.json(list)
})

app.post('/test', function(req, res) {
    console.log(req.query)
    console.log(req.body)
})

app.listen(serverPort, function(error) {
    if (error) {
		console.error(error)
	} else {
		console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', serverPort, serverPort)
	}
})

