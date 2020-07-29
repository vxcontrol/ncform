import assert from "assert";
import MinItems from "../../src/rules/minItems.js";

describe("/src/rules/minItems.js", () => {
  it("If enter [1, 2, 3, 4, 5], 5 then return true", async () => {
    const validation = new MinItems().validateLogic([1, 2, 3, 4, 5], 5);
    assert(validation === true);
  });

  it("If enter [1, 2, 3, 4, 5], 6 then return false", async () => {
    const validation = new MinItems().validateLogic([1, 2, 3, 4, 5], 6);
    assert(validation === false);
  });

  it("If enter [1, 2, 3, 4, 5], 4 then return true", async () => {
    const validation = new MinItems().validateLogic([1, 2, 3, 4, 5], 4);
    assert(validation === true);
  });
});
