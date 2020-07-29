import assert from "assert";
import UniqueItems from "../../src/rules/uniqueItems.js";

describe("/src/rules/uniqueItems.js", () => {
  it("If enter [1,2,1] as an unique array then return false", async () => {
    const validation = new UniqueItems().validateLogic([1, 2, 1], true);
    assert(validation === false);
  });

  it("If enter [1,2,3] as an unique array then return true", async () => {
    const validation = new UniqueItems().validateLogic([1, 2, 3], true);
    assert(validation === true);
  });
});
