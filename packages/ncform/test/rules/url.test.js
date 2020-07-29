import assert from "assert";
import Url from "../../src/rules/url.js";

describe("/src/rules/url.js", () => {
  it("If enter http://dx.com/ then return true", async () => {
    const validation = new Url().validateLogic("http://dx.com/");
    assert(validation === true);
  });

  it("If enter https://www.dx.com/index.php then return true", async () => {
    const validation = new Url().validateLogic("https://www.dx.com/index.php");
    assert(validation === true);
  });
});
