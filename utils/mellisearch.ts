import { MeiliSearch } from 'meilisearch'

const searchClient = new MeiliSearch({
    host: 'https://ms-8fe4e9255173-3570.sfo.meilisearch.io',
    apiKey: '810053f3bd7b19062a5c212e1bef28fc792e60f739439411cfc23bdebaef189e',
})

// update settings to search by name attribute
searchClient.getIndex('users').then(index => {
    if(index.uid !== 'users') {
        searchClient.index('users').updateSettings({
            searchableAttributes: [
                'name'
            ],
            sortableAttributes: [
                'name'
            ],
        })
    }
})

export default searchClient