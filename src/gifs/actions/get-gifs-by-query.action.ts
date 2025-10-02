import { giphyApi } from "../api/giphy.api";

import type { GiphyResponse } from "../interfaces/giphy.response";
import type { Gif } from "../interfaces/gif.interface";


export const getGifsByQuery = async (query: string): Promise<Gif[]> => {

    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=1spci8QHaEX1KnZ5WnSm5iB5M7rpGryN&q=${query}&limit=10&lang=es`)

    const response = await giphyApi<GiphyResponse>('/search', {
        params: {
            q: query,
            limit: 10,
            // lang: 'es',
            // api_key: import.meta.env.VITE_GIPHY_API_KEY
            // api_key: '1spci8QHaEX1KnZ5WnSm5iB5M7rpGryN'
        }
    })

    return response.data.data.map((gif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url,
        width: Number(gif.images.original.width),
        height: Number(gif.images.original.height)

    }))
}