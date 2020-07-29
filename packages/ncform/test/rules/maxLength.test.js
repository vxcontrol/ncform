import assert from "assert";
import MaxLength from "../../src/rules/maxLength.js";

describe("/src/rules/maxLength.js", () => {
  it("If enter 123456789,8 then return false", async () => {
    const validation = new MaxLength().validateLogic("123456789", 8);
    assert(validation === false);
  });

  it("If enter 12345678,8 then return true", async () => {
    const validation = new MaxLength().validateLogic("12345678", 8);
    assert(validation === true);
  });

  it("If enterrule is empty then return true", async () => {
    const validation = new MaxLength().validateLogic("12345678");
    assert(validation === true);
  });
});
