export function client(endpoint) {
    const apiKey = import.meta.env.VITE_BOOKS_API_KEY
    return window.fetch(`${endpoint}key=${apiKey}`)
        .then(async response => {
                const data = await response.json()
                return response.ok ? data : Promise.reject(data)
            })
        }