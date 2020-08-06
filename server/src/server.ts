import express from 'express'

const app = express()

app.get('/users', (request, response) => {
  const users = [
    { name: 'maicon', age: 23 },
    { name: 'diego', age: 25 },
  ]
  return response.json(users)
})

app.listen(3333)