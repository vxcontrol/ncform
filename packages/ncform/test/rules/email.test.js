import assert from "assert";
import Email from "../../src/rules/email.js";

describe("/src/rules/email.js", () => {
  it("If enter kyle.lo@dx.com value then return true", async () => {
    const validation = new Email().validateLogic("kyle.lo@dx.com", true);
    assert(validation === true);
  });

  it("If enter Hello@dx.com value then return true", async () => {
    const validation = new Email().validateLogic("hello@dx.com", true);
    assert(validation === true);
  });

  it("If enter helloworld value then return false", async () => {
    const validation = new Email().validateLogic("helloworld", true);
    assert(validation === false);
  });
});
