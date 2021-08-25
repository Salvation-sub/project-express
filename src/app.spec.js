const supertest = require('supertest')
const app = require('./app')

const request = supertest(app)

// json 형태로 된 테스트
test('retrieve user json', async () => {
  const result = await request.get('/users/15').accept('application/json')
  console.log(result.body)

  expect(result.body).toMatchObject({
    nickname: expect.any(String),
  })
})

// html 형태로 된 테스트
test('retrieve use page', async () => {
  const result = await request.get('/users/15').accept('text/html')

  expect(result.text).toMatch(/^<html>.*<\/html>$/)
  console.log(result.text)
})

test('update nickname', async () => {
  const newNickname = 'newNickname'

  const res = await request
    .post('/users/15/nickname')
    .send({ nickname: 'newNickname' })
  expect(res.status).toBe(200)

  const userResult = await request.get('/users/15').accept('application/json')
  expect(userResult.status).toBe(200)
  expect(userResult.body).toMatchObject({
    nickname: newNickname,
  })
})
