<template>
  <div>{{ Message }}</div>
</template>

<script>
export default {
  name: "McvErrorMessage",
  props: {
    message: {
      type: String,
      require: false,
      default: "Something bad happed",
    },
  },
};
</script>
