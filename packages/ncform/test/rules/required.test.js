import assert from "assert";
import Required from "../../src/rules/required.js";

describe("/src/rules/required.js", () => {
  it("If enter 0 then return true", async () => {
    const validation = new Required().validateLogic(0, true);
    assert(validation === true);
  });

  it("If enter a regular string then return true", async () => {
    const validation = new Required().validateLogic("aa", true);
    assert(validation === true);
  });

  it("If enter empty array then return false", async () => {
    const validation = new Required().validateLogic([], true);
    assert(validation === false);
  });

  it("If enter undefined then return false", async () => {
    const validation = new Required().validateLogic(undefined, true);
    assert(validation === false);
  });

  it("If enter empty string then return false", async () => {
    const validation = new Required().validateLogic("", true);
    assert(validation === false);
  });

  it("If enter NaN then return false", async () => {
    const validation = new Required().validateLogic(NaN, true);
    assert(validation === false);
  });
});
