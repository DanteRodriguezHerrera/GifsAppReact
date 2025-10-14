import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe('useGifs', () => {

    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs())

        expect(result.current.actualGifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    })

    test('should return a list of gifs', async () => {
        // handleSearch
        const { result } = renderHook(() => useGifs())

        await act(async () => {
            await result.current.handleSearch('nobara')
        })

        expect(result.current.actualGifs.length).toBe(10)
    })

    test('should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs())

        await act(async () => {
            await result.current.handleTermClicked('nobara')
        })

        expect(result.current.actualGifs.length).toBe(10)
    })

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs())

        await act(async () => {
            await result.current.handleTermClicked('nobara')
        })

        expect(result.current.actualGifs.length).toBe(10)

        vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(new Error('This is my custom error'))

        await act(async () => {
            await result.current.handleTermClicked('nobara')
        })

        expect(result.current.actualGifs.length).toBe(10)
    })

    test('should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs())

        vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('nobara')
        })
        await act(async () => {
            await result.current.handleSearch('nobara2')
        })
        await act(async () => {
            await result.current.handleSearch('nobara3')
        })
        await act(async () => {
            await result.current.handleSearch('nobara4')
        })
        await act(async () => {
            await result.current.handleSearch('nobara5')
        })
        await act(async () => {
            await result.current.handleSearch('nobara6')
        })
        await act(async () => {
            await result.current.handleSearch('nobara7')
        })
        await act(async () => {
            await result.current.handleSearch('nobara8')
        })
        await act(async () => {
            await result.current.handleSearch('nobara9')
        })

        console.log(result.current.previousTerms)
        expect(result.current.previousTerms.length).toBe(8)
        expect(result.current.previousTerms).toStrictEqual([
            'nobara9',
            'nobara8',
            'nobara7',
            'nobara6',
            'nobara5',
            'nobara4',
            'nobara3',
            'nobara2'
        ])
    })
})