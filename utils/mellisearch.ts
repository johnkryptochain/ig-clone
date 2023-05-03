import { MeiliSearch } from 'meilisearch'

const searchClient = new MeiliSearch({
    host: 'https://ms-170261f76648-3570.lon.meilisearch.io',
    apiKey: '54bc48fb95b47c1cb90f90d9bf175af28f0a026d1dadc68cec3b97c9156975dc',
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