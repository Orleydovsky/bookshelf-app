import { rest } from 'msw'
import { setupServer } from 'msw/node'



const handlers = [
    rest.get('https://www.googleapis.com/books/v1/volumes/testBookId?key=AIzaSyBWi1KVYQZrXkRHwWi9y1ytRiaSPIS_L-s', 
    (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({kind: "books#volume"}))
    }),
    rest.get('https://www.googleapis.com/books/v1/volumes?q=testQuery&key=AIzaSyBWi1KVYQZrXkRHwWi9y1ytRiaSPIS_L-s', 
    (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({kind: "books#volumes"}))
    }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())