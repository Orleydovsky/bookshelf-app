import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
const apiKey = import.meta.env.VITE_BOOKS_API_KEY

const handlers = [
    rest.get(`https://www.googleapis.com/books/v1/volumes/testBookId?key=${apiKey}`, 
    (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({kind: "books#volume"}))
    }),
    rest.get(`https://www.googleapis.com/books/v1/volumes?q=testQuery&key=${apiKey}`, 
    (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({kind: "books#volumes"}))
    }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())