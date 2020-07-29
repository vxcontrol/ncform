import assert from "assert";
import MaxProperties from "../../src/rules/maxProperties.js";

describe("/src/rules/maxProperties.js", () => {
  it("If enter {a:1,b:2}, 1 then return false", async () => {
    const validation = new MaxProperties().validateLogic({ a: 1, b: 2 }, 1);
    assert(validation === false);
  });

  it("If enter {a:1,b:2}, 2 then return true", async () => {
    const validation = new MaxProperties().validateLogic({ a: 1, b: 2 }, 2);
    assert(validation === true);
  });

  it("If enter {a:1,b:2}, 3 then return true", async () => {
    const validation = new MaxProperties().validateLogic({ a: 1, b: 2 }, 3);
    assert(validation === true);
  });
});
