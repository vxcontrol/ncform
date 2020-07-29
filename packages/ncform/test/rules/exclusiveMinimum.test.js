import assert from "assert";
import ExclusiveMinimum from "../../src/rules/exclusiveMinimum.js";

describe("/src/rules/exclusiveMinimum.js", () => {
  it("If enter 6,5 then return true", async () => {
    const validation = new ExclusiveMinimum().validateLogic(6, 5);
    assert(validation === true);
  });

  it("If enter 5,5 then return false", async () => {
    const validation = new ExclusiveMinimum().validateLogic(5, 5);
    assert(validation === false);
  });

  it("If enter 5,6 then return false", async () => {
    const validation = new ExclusiveMinimum().validateLogic(5, 6);
    assert(validation === false);
  });

  it("If validation rule is empty then return true", async () => {
    const validation = new ExclusiveMinimum().validateLogic(5);
    assert(validation === true);
  });
});
