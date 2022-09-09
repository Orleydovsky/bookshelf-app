import { rest } from 'msw'

const testEndpoint = 'https://www.googleapis.com/books/v1/volumes/62442?'
const apiKey = import.meta.env.VITE_BOOKS_API_KEY

export const handlers = [
  rest.get(`${testEndpoint}key=${apiKey}`,
    async (req, res, ctx) => {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized'
        }))
    })
]
