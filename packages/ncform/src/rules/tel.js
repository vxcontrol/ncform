import ncformCommon from "@vxcontrol/ncform-common";

const { ValidationRule } = ncformCommon;

class TelRule extends ValidationRule {
  constructor(props) {
    super(props);
    this.name = "tel";
    this.defaultErrMsg = "tel validate error";
  }

  validateLogic(val, ruleVal) {
    if (!ruleVal) return true;
    if (typeof val !== "string") return true;
    return /\+?[1-9]?([\ \.\-]?)\(?([0-9]{3})\)?([\ \.\-]?)([0-9]{3})([\ \.\-]?)([0-9]{4})/i.test(val);
  }
}

module.exports = TelRule;
