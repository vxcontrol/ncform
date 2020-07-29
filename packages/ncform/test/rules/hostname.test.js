import assert from "assert";
import Hostname from "../../src/rules/hostname.js";

describe("/src/rules/hostname.js", () => {
  it("If value https://dx.com/ is hostname then return true", async () => {
    const validation = new Hostname().validateLogic("https://dx.com/", true);
    assert(validation === true);
  });

  it("If value http://www.dx.com/ is hostname then return true", async () => {
    const validation = new Hostname().validateLogic("http://dx.com/", true);
    assert(validation === true);
  });

  it("If value httpxxx://dx.com/ is not hostname then return false", async () => {
    const validation = new Hostname().validateLogic("httpxxx://dx.com/", true);
    assert(validation === false);
  });
});
