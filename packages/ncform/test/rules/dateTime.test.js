import assert from "assert";
import DateTime from "../../src/rules/dateTime.js";

describe("/src/rules/dateTime.js", () => {
  it("If enter the timestamp value then return true", async () => {
    const validation = new DateTime().validateLogic(
      `${new Date().getTime()}`,
      true
    );
    assert(validation === true);
  });

  it("If enter non timestamp value ex. 'xxxxxx' then return false", async () => {
    const validation = new DateTime().validateLogic("xxxxxx", true);
    assert(validation === false);
  });

  it("If the validation rule is false then return true", async () => {
    const validation = new DateTime().validateLogic("asdasdsadsd", false);
    assert(validation === true);
  });
});
