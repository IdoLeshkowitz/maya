import {describe, expect, test} from "vitest";
import experimentConfig from '../../public/experimentConfig.json'
import {shuffleConfig} from "../../libs/utils/shuffleConfig";
test("shuffleConfig", () => {
    /*
    test that the config is shuffled correctly
    check that the config object still has the same keys but the values are shuffled
     */
    const originalConfig = experimentConfig
    const shuffledConfig = shuffleConfig(originalConfig)
    expect(shuffledConfig).not.toEqual(originalConfig)
})
