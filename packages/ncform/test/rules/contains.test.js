import assert from "assert";
import Contains from "../../src/rules/contains.js";

describe("/src/rules/contains.js", () => {
  it('Validator is ["some","thing"] if value is "some" then return true', async () => {
    const validation = new Contains().validateLogic(["some", "thing"], "some");
    assert(validation === true);
  });

  it('Validator is ["some","thing"] if value is "some2" then return false', async () => {
    const validation = new Contains().validateLogic(["some", "thing"], "some2");
    assert(validation === false);
  });
});
