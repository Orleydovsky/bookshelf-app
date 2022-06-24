export function client(endpoint, customConfig = {}) {
    const apiKey = import.meta.env.VITE_BOOKS_API_KEY
    const linkIAmRequesting = `${endpoint}&key=${apiKey}`
    console.log(linkIAmRequesting)
    const config = {
        method: 'GET',
        ...customConfig,
    }
    return window
    .fetch(`${endpoint}key=${apiKey}`, config)
    
        .then(async response => {
            const data = await response.json()
            return response.ok ? data : Promise.reject(data)
        })
}
