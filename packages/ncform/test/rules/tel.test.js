import assert from "assert";
import Tel from "../../src/rules/tel.js";

describe("/src/rules/tel.js", () => {
  it("If enter value 15912341234 as a phone number then return true", async () => {
    const validation = new Tel().validateLogic("15912341234", true);
    assert(validation === true);
  });

  it("If enter value 17812341234 as a phone number then return true", async () => {
    const validation = new Tel().validateLogic("17812341234", true);
    assert(validation === true);
  });

  it("If enter value 159123 as a phone number then return false", async () => {
    const validation = new Tel().validateLogic("159123", true);
    assert(validation === false);
  });
});
