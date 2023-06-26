import {test,it,expect,} from 'vitest'
import experimentConfig from '../../public/experimentConfig.json'
import {shuffleConfig} from "../utils/shuffleConfig";
test('shuffleConfig', () => {
    it('should return object with the same properties',()=>{
        const originalConfig = experimentConfig
        const shuffledConfig = shuffleConfig(originalConfig)
        expect(shuffledConfig).toMatchObject(originalConfig)
        expect(shuffledConfig).not.toStrictEqual(originalConfig)
    })
})