import {variants} from "../../public/experimentConfig.json"
import {describe, expect, test} from "vitest";
import {validateVariant} from "../../libs/utils/validateVariants";
/* check variants */
describe("Validate variants from json", () => {
    variants.forEach((variant, index) => {
        test(`Variant ${index} is valid`, () => {
            expect(() => validateVariant(variant)).not.toThrow()
        });
    })
})