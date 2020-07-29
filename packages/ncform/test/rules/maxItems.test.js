import assert from "assert";
import MaxItems from "../../src/rules/maxItems.js";

describe("/src/rules/maxItems.js", () => {
  it("If enter [1, 2, 3, 4, 5], 5 then return true", async () => {
    const validation = new MaxItems().validateLogic([1, 2, 3, 4, 5], 5);
    assert(validation === true);
  });

  it("If enter [1, 2, 3, 4, 5], 6 then return true", async () => {
    const validation = new MaxItems().validateLogic([1, 2, 3, 4, 5], 6);
    assert(validation === true);
  });

  it("If enter [1, 2, 3, 4, 5], 4 then return false", async () => {
    const validation = new MaxItems().validateLogic([1, 2, 3, 4, 5], 4);
    assert(validation === false);
  });
});
