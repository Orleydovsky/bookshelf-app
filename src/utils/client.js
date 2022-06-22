export function client(endpoint, customConfig = {}) {
    const apiKey = import.meta.env.VITE_BOOKS_API_KEY
    const config = {
        method: 'GET',
        ...customConfig,
    }
    return window
    .fetch(`https://www.googleapis.com/books/v1/volumes?q=${endpoint}&key=${apiKey}`, config)
        .then(response => {
            const data = response.json()
            return response.ok ? data : Promise.reject(data)
        })
}
