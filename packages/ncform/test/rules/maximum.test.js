import assert from "assert";
import Maximum from "../../src/rules/maximum.js";

describe("/src/rules/maximum.js", () => {
  it("If enter 6,5 then return false", async () => {
    const validation = new Maximum().validateLogic(6, 5);
    assert(validation === false);
  });

  it("If enter 5,5 then return true", async () => {
    const validation = new Maximum().validateLogic(5, 5);
    assert(validation === true);
  });

  it("If enter 5,6 then return true", async () => {
    const validation = new Maximum().validateLogic(5, 6);
    assert(validation === true);
  });

  it("If validation rule is empty then return true", async () => {
    const validation = new Maximum().validateLogic(5);
    assert(validation === true);
  });
});
