import { defineStore } from 'pinia'
import { v4 as uuidv } from 'uuid'

export const useResultStore = defineStore('results', {
    state: () => {
        return {
            results: [],
        }
    },
    actions: {
        create (result) {
            this.results.push({
                id: uuidv(),
                ...result
            })
        },
        delete (id) {
            this.results = this.results.filter(result => result.id !== id)
        },
    },
    getters: {
        resultsByName(state) {
            const sortable = [...state.results]
            return sortable.sort((a, b) => 
                a.name.localeCompare(b.name))
        },
        plus: (result) => result.hasil1 + result.hasil2
    }
})