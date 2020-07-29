import assert from "assert";
import MinLength from "../../src/rules/minLength.js";

describe("/src/rules/minLength.js", () => {
  it("If enter 123456789,8 then return true", async () => {
    const validation = new MinLength().validateLogic("123456789", 8);
    assert(validation === true);
  });

  it("If enter 1234567,8 then return false", async () => {
    const validation = new MinLength().validateLogic("1234567", 8);
    assert(validation === false);
  });

  it("If enter rule is empty then return true", async () => {
    const validation = new MinLength().validateLogic("12345678");
    assert(validation === true);
  });
});
