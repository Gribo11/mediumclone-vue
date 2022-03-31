<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
         <mcv-tag-list :tags="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes as articleActionType} from "@/store/modules/article";
import { gettersType as authGetterType } from "@/store/modules/auth";
import { mapGetters, mapState } from "vuex";

import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage";
import McvTagList from '@/components/TagList'


export default {
  name: "McvArticle",
  components: {
    McvLoading,
    McvErrorMessage,
    McvTagList
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      article: (state) => state.article.data,
      error: (state) => state.article.error,
    }),
    ...mapGetters({
        currentUser: authGetterType.currentUser
    }),

    isAuthor(){
        if(!this.currentUser || !this.article){
            return false
        }
        return this.currentUser.username === this.article.author.username
    }
  },

  methods:{
      deleteArticle(){
          this.$store.dispatch(articleActionType.deleteArticle,{
             slug: this.$route.params.slug, 
          })
          .then(()=>{
              this.$route.push({name:'globalFeed'})
          })
      }
  },

  mounted() {
    this.$store.dispatch(articleActionType.getArticle, {
      slug: this.$route.params.slug,
    });
  },
};
</script>
