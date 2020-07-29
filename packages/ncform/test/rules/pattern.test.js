import assert from "assert";
import Pattern from "../../src/rules/pattern.js";

describe("/src/rules/pattern.js", () => {
  it("If enter hello, /\\d/ (regexp type) then return false", async () => {
    const validation = new Pattern().validateLogic("hello", /\d/);
    assert(validation === false);
  });

  it("If enter 1hexxllo2, /^1\\S*2$/ (regexp type) then return true", async () => {
    const validation = new Pattern().validateLogic("1hello2", /^1\S*2$/);
    assert(validation === true);
  });

  it("If enter hello, '\\d' (string type) then return false", async () => {
    const validation = new Pattern().validateLogic("hello", "\d");
    assert(validation === false);
  });

  it("If enter 1hexxllo2, '^1\\\\S*2$' (string type) then return true", async () => {
    const validation = new Pattern().validateLogic("1hello2", "^1\\S*2$");
    assert(validation === true);
  });
});
