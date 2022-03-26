<template>
  <div>Feed</div>
</template>

<script>
import { actionTypes } from "@/store/modules/feed";

export default {
  name: "McvFeed",
  props: {
    apiUrl: {
      type: String,
      require: true,
    },
  },

  mounted() {
    console.log('start feed')
    this.$store.dispatch(actionTypes.getFeed, {apiUrl:this.apiUrl});
  },
};
</script>

<style>
</style>