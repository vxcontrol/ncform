import assert from "assert";
import Ipv6 from "../../src/rules/ipv6.js";

describe("/src/rules/ipv6.js", () => {
  it("If value 1050:0000:0000:0000:0005:0600:300c:326b is an ipv6 address then return true", async () => {
    const validation = new Ipv6().validateLogic(
      "1050:0000:0000:0000:0005:0600:300c:326b",
      true
    );
    assert(validation === true);
  });

  it("If value 1050:0000:0000:0000:0005:0600:300c is not an ipv6 address then return false", async () => {
    const validation = new Ipv6().validateLogic(
      "1050:0000:0000:0000:0005:0600:300c",
      true
    );
    assert(validation === false);
  });
});
