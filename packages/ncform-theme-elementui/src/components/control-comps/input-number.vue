<template>
  <div v-show="!hidden" class="ncform-input-number">
    <div v-if="globalStatus === 'preview'" class="ncform-input-number-preview">
      {{modelVal}}
    </div>
    <el-input-number
      v-else
      v-model="modelVal"
      :disabled="disabled || readonly"
      v-bind="mergeConfig"
    ></el-input-number>
  </div>
</template>

<style lang="scss">
  .h-layout {
    .ncform-input-number {
      &.__ncform-control {
        clear: none;
      }
    }
    .el-input-number {
      width: 100%;
    }
  }

  .v-layout {
    .ncform-input-number {
      &.__ncform-control {
        clear: both;
      }
    }
    .el-input-number {
      width: 100%;
    }
  }

  .ncform-input-number-preview {
    color: #606266;
    font-size: 14px;
    line-height: 40px;
  }
</style>

<script>

  import ncformCommon from '@vxcontrol/ncform-common';

  const controlMixin = ncformCommon.mixins.vue.controlMixin;

  export default {

    mixins: [controlMixin],

    props: {
      value: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        // 组件特有的配置属性
        defaultConfig: {
          min:0,
          max: Infinity,
          step: 1,
          size: ''
        }
        // modelVal：请使用该值来绑定实际的组件的model
      }
    },

    computed: {
      // disabled / readonly / hidden / placeholder 你可以直接使用这些变量来控制组件的行为
    },

    methods: {

    }

  }
</script>
