import _cloneDeep from "lodash-es/cloneDeep";
import _template from "lodash-es/template";
import _get from "lodash-es/get";
import extend from "extend";
import ncformUtils from "../../ncform-utils";

export default {
  i18nData: {
    en: {},
    ru: {},
    zh_cn: {}
  },

  created() {
    this.$options.lang = window.__$ncform.lang;
    this.$data.i18n =
      this.$options.i18nData[this.$options.lang] || this.$options.i18nData.en;

    this.schema.value = this.schema.value || [];
    if (this.schema.value.length === 0) {
      this._addEmptyItem();
    } else {
      this.schema.value.forEach((item, idx) => {
        this.addItem(idx);
      });
    }

    this.$data.collapsed = this.mergeConfig.collapsed;
  },

  props: {
    config: {
      type: Object
    },

    schema: {
      type: Object,
      default() {
        return {
          type: "array"
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

    paths: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      collapsed: false,
      defaultConfig: {
        collapsed: false,
        disabled: false,
        disableCollapse: false,
        disableReorder: false,
        disableAdd: false,
        disableDel: false,
        addTxt: "",
        delAllTxt: "",
        requiredDelConfirm: false,
        delConfirmText: {
          item: "",
          all: ""
        },
        delExceptionRows: ""
      },
      i18n: {}
    };
  },

  computed: {
    disabled() {
      if (
        !this.schema ||
        !this.schema.ui ||
        this.schema.ui.process === true ||
        this.schema.ui.process === undefined
      ) {
        return this._analyzeVal(this.config.disabled);
      }
      if (
        this.schema &&
        this.schema.ui &&
        this.schema.ui.process === this.globalConst.nodeUId
      ) {
        return this._analyzeVal(this.config.disabled);
      }
      return true;
    },
    mergeConfig() {
      const newConfig = extend(true, {}, this.$data.defaultConfig, this.config);
      return ncformUtils.traverseJSON(newConfig, (...params) => {
        const val = params[1];
        if (val !== null && typeof val !== "object")
          return this._analyzeVal(val);
        return val;
      });
    },
    showActionColumn() {
      return (
        !this.mergeConfig.disableDel ||
        !this.mergeConfig.disableReorder ||
        this.mergeConfig.delExceptionRows
      );
    }
  },

  watch: {
    "schema.value": {
      handler(newVal) {
        if (newVal && newVal.length > 0 && !_get(newVal, "[0].__dataSchema")) {
          // rebuild the array
          this.schema.value = newVal;
          this.schema.value.forEach((item, idx) => {
            this.addItem(idx);
          });
        }
      },
      immediate: true
    }
  },

  methods: {
    _analyzeVal(val, idx = this.idxChain) {
      return ncformUtils.smartAnalyzeVal(val, {
        idxChain: idx,
        data: {
          rootData: this.formData,
          constData: this.globalConst,
          tempData: this.tempData,
          selfPath: this.paths + `[${(idx || "").split(",").slice(-1)[0]}]`
        }
      });
    },

    _setTempData(key, value) {
      this.$set(this.tempData, key, value);
    },

    _addEmptyItem() {
      if (this.schema.value.length === 0 && this.mergeConfig.showOneIfEmpty) {
        this.$nextTick(() => this.addItem());
      }
    },

    isNormalObjSchema: ncformUtils.isNormalObjSchema,

    isNormalArrSchema: ncformUtils.isNormalArrSchema,

    addItem(idxParam) {
      let idx = idxParam;
      let isNew = false;

      if (idx === undefined) {
        this.schema.value.push(ncformUtils.getDefVal(this.schema.items.type));
        idx = this.schema.value.length - 1;
        isNew = true;
      }

      if (!this.schema.value[idx].__dataSchema) {
        const __dataSchema = _cloneDeep(this.schema.items);
        if (isNew) {
          this.$set(__dataSchema, '_expand', true);
        }
        ncformUtils.setValueToSchema(
          this.schema.value[idx],
          __dataSchema,
          true
        );
        this.$set(this.schema.value, idx, { __dataSchema });
      }

      if (!this.schema.value[idx].__dataSchema.__id) {
        this.schema.value[idx].__dataSchema.__id = Math.random();
      }
    },

    delItem(idx, requiredConfirm, confirmText) {
      if (this.$confirm) {
        // use element-ui
        if (requiredConfirm) {
          this.$confirm(confirmText, "", {
            type: "warning"
          }).then(() => {
            this.schema.value.splice(idx, 1);
            this._addEmptyItem();
          });
        } else {
          this.schema.value.splice(idx, 1);
          this._addEmptyItem();
        }
      } else if (requiredConfirm) {
        window.confirm(confirmText) &&
          this.schema.value.splice(idx, 1) &&
          this._addEmptyItem();
      } else {
        this.schema.value.splice(idx, 1);
        this._addEmptyItem();
      }
    },

    delAllItems(requiredConfirm, confirmText) {
      if (this.$confirm) {
        // use element-ui
        if (requiredConfirm) {
          this.$confirm(confirmText, "", {
            type: "warning"
          }).then(() => {
            this.schema.value = [].concat(
              this.schema.value.filter(item =>
                this.isDelExceptionRow(item.__dataSchema)
              )
            );
            this._addEmptyItem();
          });
        } else {
          this.schema.value = [].concat(
            this.schema.value.filter(item =>
              this.isDelExceptionRow(item.__dataSchema)
            )
          );
          this._addEmptyItem();
        }
      } else if (requiredConfirm) {
        if (window.confirm(confirmText)) {
          this.schema.value = [].concat(
            this.schema.value.filter(item =>
              this.isDelExceptionRow(item.__dataSchema)
            )
          );
          this._addEmptyItem();
        }
      } else {
        this.schema.value = [].concat(
          this.schema.value.filter(item =>
            this.isDelExceptionRow(item.__dataSchema)
          )
        );
        this._addEmptyItem();
      }
    },

    isDelExceptionRow(schema) {
      return this.mergeConfig.delExceptionRows
        ? this.mergeConfig.delExceptionRows(
            ncformUtils.getModelFromSchema(schema)
          )
        : false;
    },

    itemUp(idx) {
      if (idx !== 0) {
        this.schema.value.splice(
          idx - 1,
          0,
          this.schema.value.splice(idx, 1)[0]
        );
      }
    },

    itemDown(idx) {
      if (idx !== this.schema.value.length - 1) {
        this.schema.value.splice(
          idx + 1,
          0,
          this.schema.value.splice(idx, 1)[0]
        );
      }
    },

    collapse() {
      if (!this.mergeConfig.disableCollapse)
        this.$data.collapsed = !this.$data.collapsed;
    },

    $nclang(key, data) {
      return Object.prototype.toString.call(data) !== "[object Object]"
        ? this.$data.i18n[key]
        : _template(this.$data.i18n[key])(data);
    }
  }
};
