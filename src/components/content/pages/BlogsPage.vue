<script lang="ts">
import { defineComponent } from 'vue'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import supabase, {
  DBOperations,
  FilterTypes,
  type Query,
  type Response,
  type QueryFilter
} from '../../consumable/externals/supabase'
import { blogsConstants, blogsTableColumns } from '../../consumable/constants/blogs'
import { type Blog } from '../../consumable/models/blogs'
import eventBus from '../../consumable/eventBus'

interface BlogPageType {
  blog: Blog
}

export default defineComponent({
  data(): BlogPageType {
    return {
      blog: {}
    }
  },
  computed: {
    highlightedCode() {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = this.blog.content as string

      wrapper.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block)
      })

      return wrapper.innerHTML
    }
  },
  methods: {
    getBlog() {
      const filter: Array<QueryFilter> = [
        {
          type: FilterTypes.EQ,
          column: blogsTableColumns.ID,
          value: this.$route.params.id
        }
      ]
      let query: Query = {
        operation: DBOperations.FETCH,
        table: blogsConstants.SUPABASE_TABLE_BLOGS,
        columns: [
          blogsTableColumns.ID,
          blogsTableColumns.IMAGE,
          blogsTableColumns.NAME,
          blogsTableColumns.UPDATED_AT,
          blogsTableColumns.CONTENT,
          blogsTableColumns.TAG
        ],
        filters: filter
      }
      supabase
        .executeQuery(query)
        .then((response: Response) => {
          if (response.data) {
            let item = response.data[0] as Blog
            this.blog = {
              id: item.id,
              name: item.name,
              image: item.image,
              updated_at: item.updated_at?.slice(0, 10),
              content: item.content,
              tags: item.tags
            }
          }
        })
        .catch((err: Error) => {
          eventBus.emit('notify', err.message)
        })
    }
  },
  beforeMount() {
    this.getBlog()
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="title-wrap">
      <h1>{{ blog.name }}</h1>
    </div>
    <div class="image-wrap">
      <img :src="blog.image" alt="imgage" />
    </div>
    <div class="blog-wrap" v-html="highlightedCode"></div>
  </div>
</template>

<style scoped>
.container-fluid {
  font-family: monospace, monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title-wrap {
  border-bottom: 1px solid #bcbcbc;
  margin: 0 0 50px 0;
  width: 80%;
  text-align: center;
}

.title-wrap h1 {
  color: #bcbcbc;
  padding: 30px 0;
}
.image-wrap img {
  width: 100%;
  margin: 0 0 30px 0;
}
.blog-wrap,
.image-wrap {
  max-width: 70%;
  color: #bcbcbc;
}
.blog-wrap::v-deep(.ql-syntax) {
  background-color: #282c34;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
