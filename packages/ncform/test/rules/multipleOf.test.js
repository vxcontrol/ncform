import assert from "assert";
import MultipleOf from "../../src/rules/multipleOf.js";

describe("/src/rules/multipleOf.js", () => {
  it("If enter 10, 5 then return true", async () => {
    const validation = new MultipleOf().validateLogic(10, 5);
    assert(validation === true);
  });

  it("If enter 10, 3 then return false", async () => {
    const validation = new MultipleOf().validateLogic(10, 3);
    assert(validation === false);
  });

  it("If enter 10, 0 then return false", async () => {
    const validation = new MultipleOf().validateLogic(10, 0);
    assert(validation === false);
  });

  it("If enter 0, 10 then return true", async () => {
    const validation = new MultipleOf().validateLogic(0, 10);
    assert(validation === true);
  });
});
