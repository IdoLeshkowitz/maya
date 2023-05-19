/// <reference types="vitest" />
import {defineConfig, ResolverFunction} from 'vite'
const typesRegex = /@\/types\/.*/
const customResolver:ResolverFunction = (id, importer) => {

}
export default defineConfig({
    test: {
        alias: [
            {find:"@/types/option",replacement:'/libs/types/option.ts'},
            {find:"@/types/performance",replacement:'/libs/types/performance.ts'},
            {find:"@/types/taskMeta",replacement:'/libs/types/taskMeta.ts'},
            {find:"@/types/variant",replacement:'/libs/types/variant.ts'},
            {find:"@/types/variant",replacement:'/libs/types/variant.ts'},
        ]
    }
})