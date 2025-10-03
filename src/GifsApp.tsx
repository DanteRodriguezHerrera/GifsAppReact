
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
// import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"

import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {

    const { actualGifs, handleSearch, previousTerms, handleTermClicked } = useGifs();

    if (actualGifs.length === 0) {
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
