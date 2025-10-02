import { useState } from "react"

import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
// import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"

import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/interfaces/gif.interface"

export const GifsApp = () => {

    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = (term: string) => {
        console.log({ term })
    }

    const initialState: Gif[] = [
        {
            id: '',
            title: '',
            url: '',
            width: 0,
            height: 0,
        }
    ]

    const [actualGifs, setActualGifs] = useState(initialState)

    const handleSearch = async (query: string = '') => {
        query = query.toLowerCase().trim();
        if (query.length === 0) {
            setActualGifs(initialState)
            return [];
        }
        if (previousTerms.includes(query)) return [];

        // const currentTerms = previousTerms.slice(0,6);

        // currentTerms.unshift(query)
        // setPreviousTerms(currentTerms)

        setPreviousTerms([query, ...previousTerms].splice(0, 8));

        const gifs = await getGifsByQuery(query)

        console.log(gifs)

        setActualGifs(gifs)
    }

    if (actualGifs[0].id === '') {
        return (
            <>
                {/* Header */}
                <CustomHeader title="Buscador de gifs" description="Descubre y comparte el gif perfecto" />

                {/* Search */}
                <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

                {/* Búsquedas previas */}
                <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked} />

                {/* Gifs */}

                Ta vacío
            </>
        )
    }

    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de gifs" description="Descubre y comparte el gif perfecto" />

            {/* Search */}
            <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

            {/* Búsquedas previas */}
            <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked} />

            {/* Gifs */}

            <GifList gifs={actualGifs} />
        </>
    )
}
