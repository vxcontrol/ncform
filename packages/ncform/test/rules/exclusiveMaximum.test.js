import assert from "assert";
import ExclusiveMaximum from "../../src/rules/exclusiveMaximum.js";

describe("/src/rules/exclusiveMaximum.js", () => {
  it("If enter 6,5 value then return false", async () => {
    const validation = new ExclusiveMaximum().validateLogic(6, 5);
    assert(validation === false);
  });

  it("If enter 5,5 value then return false", async () => {
    const validation = new ExclusiveMaximum().validateLogic(5, 5);
    assert(validation === false);
  });

  it("If enter 5,6 value then return true", async () => {
    const validation = new ExclusiveMaximum().validateLogic(5, 6);
    assert(validation === true);
  });

  it("If validation rule is empty then return true", async () => {
    const validation = new ExclusiveMaximum().validateLogic(5);
    assert(validation === true);
  });
});
