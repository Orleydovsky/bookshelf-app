import fetch from 'node-fetch'
globalThis.fetch = fetch
import { client } from '../utils/client'

const testBookId = 'testBookId'
const testQuery = 'testQuery'

test('should return an array of books#volumes when called', async () => { 
  const result = await client(`https://www.googleapis.com/books/v1/volumes/${testBookId}?`)
  expect(result.kind).toEqual('books#volume')
 })
 
test('should return a books#volume when called', async () => { 
  const result = await client(`https://www.googleapis.com/books/v1/volumes?q=${testQuery}&`)
  expect(result.kind).toEqual('books#volumes')
 })

