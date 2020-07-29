import assert from "assert";
import MinProperties from "../../src/rules/minProperties.js";

describe("/src/rules/minProperties.js", () => {
  it("If enter {a:1,b:2}, 1 then return true", async () => {
    const validation = new MinProperties().validateLogic({ a: 1, b: 2 }, 1);
    assert(validation === true);
  });

  it("If enter {a:1,b:2}, 2 then return true", async () => {
    const validation = new MinProperties().validateLogic({ a: 1, b: 2 }, 2);
    assert(validation === true);
  });

  it("If enter {a:1,b:2}, 3 then return false", async () => {
    const validation = new MinProperties().validateLogic({ a: 1, b: 2 }, 3);
    assert(validation === false);
  });
});
