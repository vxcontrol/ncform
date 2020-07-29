import assert from "assert";
import Number from "../../src/rules/number.js";

describe("/src/rules/number.js", () => {
  it("If no enter value then return false", async () => {
    const validation = new Number().validateLogic(undefined, true);
    assert(validation === false);
  });

  it("If enter value as non-numeric string then return false", async () => {
    const validation = new Number().validateLogic("something", true);
    assert(validation === false);
  });

  it("If enter positive number then return true", async () => {
    const validation = new Number().validateLogic(123, true);
    assert(validation === true);
  });

  it("If enter negative number then return true", async () => {
    const validation = new Number().validateLogic(-123, true);
    assert(validation === true);
  });

  it("If enter decimal number then return true", async () => {
    const validation = new Number().validateLogic(123.45, true);
    assert(validation === true);
  });

  it("If enter integer number as a string then return true", async () => {
    const validation = new Number().validateLogic("123", true);
    assert(validation === true);
  });

  it("If enter decimal number as a string then return true", async () => {
    const validation = new Number().validateLogic("0.123", true);
    assert(validation === true);
  });

  it("If enter negative number as a string then return true", async () => {
    const validation = new Number().validateLogic("-123", true);
    assert(validation === true);
  });
});
