import assert from "assert";
import Ipv4 from "../../src/rules/ipv4.js";

describe("/src/rules/ipv4.js", () => {
  it("If value 192.168.1.2 is an ipv4 address then return true", async () => {
    const validation = new Ipv4().validateLogic("192.168.1.2", true);
    assert(validation === true);
  });

  it("If value 192.168.1 is not an ipv4 address then return false", async () => {
    const validation = new Ipv4().validateLogic("192.168.1", true);
    assert(validation === false);
  });
});
