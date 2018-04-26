const http = require('http')
const port = 3000


const requestHandler = (request, response) => {
  console.log(request.url)
  request.on('data', function (data) {
    console.log("recieved: " + JSON.parse(data).title) // Not showing on the console !!!!
  })
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})