<template>
  <div v-show="!hidden" class="ncform-slider" style="float: left;">
    <el-slider
      v-model="modelVal"
      :disabled="disabled || readonly"
      :placeholder="placeholder"
      v-bind="mergeConfig"
    ></el-slider>
  </div>
</template>

<script>

  import ncformCommon from '@vxcontrol/ncform-common';

  const controlMixin = ncformCommon.mixins.vue.controlMixin;

  export default {

    mixins: [controlMixin],

    props: {
      value: {
        type: [String, Number]
      }
    },

    data() {
      return {
        // 组件特有的配置属性
        defaultConfig: {
          min: 0,
          max: 100,
          step: 1
        }
        // modelVal：请使用该值来绑定实际的组件的model
      }
    },

    computed: {
      // disabled / readonly / hidden / placeholder 你可以直接使用这些变量来控制组件的行为
    },

    methods: {
      // 你可以通过该方法在modelVal传出去之前进行加工处理，即在this.$emit('input')之前
    }

  }
</script>
