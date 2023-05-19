import experimentConfig from "../../public/experimentConfig.json"
import {expect, test} from "vitest";
import {validateVariant} from "../../libs/utils/validateVariants";
/* check variants */
test("Validate variants from json", async () => {
    expect.assertions(experimentConfig.variants.length)
    const variants = experimentConfig.variants
    const promises = variants.map(async (variant) => {
        try {
            await validateVariant(variant)
            expect(true).toBe(true)
        } catch (e) {
            expect(e).toBeUndefined()
        }
    })
    await Promise.all(promises)
})