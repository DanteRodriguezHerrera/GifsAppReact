import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// const gifsCache: Record<string, Gif[]> = {}

export const useGifs = () => {

    const [actualGifs, setActualGifs] = useState<Gif[]>([])
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {

        if (gifsCache.current[term]) {
            setActualGifs(gifsCache.current[term])
            return;
        }

        const gifs = await getGifsByQuery(term)
        setActualGifs(gifs)
        gifsCache.current[term] = gifs;
    }

    const handleSearch = async (query: string = '') => {
        query = query.toLowerCase().trim();
        if (query.length === 0) {
            setActualGifs([])
            return [];
        }
        if (previousTerms.includes(query)) return [];

        setPreviousTerms([query, ...previousTerms].splice(0, 8));

        const gifs = await getGifsByQuery(query)
        setActualGifs(gifs)

        gifsCache.current[query] = gifs;
    }

    return {
        // Properties
        actualGifs,
        previousTerms,

        // Actions
        handleSearch,
        handleTermClicked
    }
}
