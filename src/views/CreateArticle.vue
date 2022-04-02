<template>
  <mcv-article-form
    :initial-values="initialValues"
    :errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from '@/store/modules/createArticle';
import McvArticleForm from "@/components/ArticleForm.vue";

export default {
  name: "McvCreateArticle",

  components: {
    McvArticleForm,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationErrors: (state) => state.createArticle.validationErrors,
    }),
  },
  data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  methods: {
    onSubmit(articleInput) {
      this.$store.dispatch(actionTypes.createArticle,{articleInput})
      .then(article =>{
        this.$router.push({name: 'article', params: {slug: article.slug}})
      })
  
    },
  },
};
</script>

<style>
</style>