import extend from "extend";
import axios from "axios";
import _template from "lodash-es/template";
import ncformUtils from "../../ncform-utils";

export default {
  autoDX: true, // 当不需要config自动支持dx表达式，可将该值设为false

  i18nData: {
    en: {},
    ru: {},
    zh_cn: {}
  },

  created() {
    this.$options.lang = window.__$ncform.lang;
    this.$data.i18n =
      this.$options.i18nData[this.$options.lang] || this.$options.i18nData.en;

    if (!this.$http) {
      this.$http = this.$axios || this.axios || axios;
    }
  },

  props: {
    config: {
      type: Object,
      default() {
        return {
          disabled: false,
          readonly: false,
          hidden: false,
          placeholder: ""
        };
      }
    },

    formData: {
      type: Object
    },

    tempData: {
      type: Object
    },

    globalConst: {
      type: Object
    },

    globalStatus: {
      type: String
    },

    idxChain: {
      type: String,
      default: ""
    },

    value: {
      type: [String, Number, Boolean, Object, Array]
    },

    schema: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      defaultConfig: {},
      modelVal: this.value,
      i18n: {}
    };
  },

  computed: {
    disabled() {
      return (
        this.globalStatus === "preview" ||
        this._analyzeVal(this.config.disabled)
      );
    },
    readonly() {
      if (
        !this.schema ||
        !this.schema.ui ||
        this.schema.ui.process === true ||
        this.schema.ui.process === undefined
      ) {
        return this._analyzeVal(this.config.readonly);
      }
      if (
        this.schema &&
        this.schema.ui &&
        this.schema.ui.process === this.globalConst.nodeUId
      ) {
        return this._analyzeVal(this.config.readonly);
      }
      return true;
    },
    placeholder() {
      return this._analyzeVal(this.config.placeholder);
    },
    hidden() {
      if (
        !this.schema ||
        !this.schema.ui ||
        this.schema.ui.process === true ||
        this.schema.ui.process === undefined
      ) {
        return this._analyzeVal(this.config.hidden);
      }
      const nodeCodeArr = this.globalConst.nodeCodeArr || [];
      if (
        nodeCodeArr.includes(this.schema.ui.process) ||
        this.schema.ui.process === this.globalConst.nodeUId
      ) {
        return this._analyzeVal(this.config.hidden);
      }
      return true;
    },
    mergeConfig() {
      const newConfig = extend(true, {}, this.$data.defaultConfig, this.config);
      return this.$options.autoDX
        ? ncformUtils.traverseJSON(newConfig, (...params) => {
            const val = params[1];
            if (val !== null && typeof val !== "object")
              return this._analyzeVal(val);
            return val;
          })
        : newConfig;
    }
  },

  watch: {
    modelVal(newVal) {
      const val = this._processModelVal(newVal);
      this.$options.tempProcessedVal = val; // 用这个变量来记录处理过后的值，然后下面进行比较，避免循环
      this.$emit("input", val);
    },
    value(newVal) {
      if (
        JSON.stringify(this.$data.modelVal) !== JSON.stringify(newVal) &&
        JSON.stringify(this.$options.tempProcessedVal) !==
          JSON.stringify(newVal)
      ) {
        this.$data.modelVal = newVal;
      }
      this.$options.tempProcessedVal = null;
    }
  },

  methods: {
    _analyzeVal(val) {
      return ncformUtils.smartAnalyzeVal(val, {
        idxChain: this.idxChain,
        data: {
          rootData: this.formData,
          constData: this.globalConst,
          tempData: this.tempData
        }
      });
    },

    _processModelVal(modelVal) {
      return modelVal;
    },

    _setTempData(key, value) {
      this.$set(this.tempData, key, value);
    },

    $nclang(key, data) {
      return Object.prototype.toString.call(data) !== "[object Object]"
        ? this.$data.i18n[key]
        : _template(this.$data.i18n[key])(data);
    }
  }
};
