export function client(endpoint, customConfig = {}) {
    const apiKey = import.meta.env.VITE_BOOKS_API_KEY
    const config = {
        method: 'GET',
        ...customConfig,
    }
    return window
    .fetch(`https://www.googleapis.com/books/v1/volumes?q=${endpoint}&key=${apiKey}`, config)
        .then(async response => {
            const data = await response.json()
            return endpoint === 'FAIL' ? Promise.reject(data) : response.ok ? data : Promise.reject(data)
        })
}
