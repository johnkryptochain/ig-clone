import { MeiliSearch, Index } from 'meilisearch'

const searchClient = new MeiliSearch({
    host: 'https://ms-cb4689884309-3570.sfo.meilisearch.io',
    apiKey: 'b0cc5c308cb3e2915ce8635cf0105ea1fb07bacb0e619b3e8b4d2e8f820fb75b',
})

searchClient.getIndex('users')
    .then((index: Index) => {
        index.updateSettings({
            searchableAttributes: [
                'name'
            ],
            sortableAttributes: [
                'name'
            ],
        })
    })
    .catch((error: any) => {
        if (error.errorCode === 'index_not_found') {
            searchClient.createIndex('users').then((index: Index) => {
                index.updateSettings({
                    searchableAttributes: [
                        'name'
                    ],
                    sortableAttributes: [
                        'name'
                    ],
                })
            })
        } else {
            console.error(error)
        }
    })

export default searchClient