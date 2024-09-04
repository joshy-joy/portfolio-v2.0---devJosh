<script lang="ts">
import { defineComponent } from 'vue'

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

interface BlogExplorer {
  blogList: Array<Blog>
  blogSearchTerm: string
}

export default defineComponent({
  data(): BlogExplorer {
    return {
      blogSearchTerm: '',
      blogList: []
    }
  },
  methods: {
    getBlogTitles() {
      const filter: Array<QueryFilter> = [
        {
          type: FilterTypes.EQ,
          column: blogsTableColumns.IS_DELETED,
          value: false
        }
      ]
      let query: Query = {
        operation: DBOperations.FETCH,
        table: blogsConstants.SUPABASE_TABLE_BLOGS,
        columns: [
          blogsTableColumns.ID,
          blogsTableColumns.IMAGE,
          blogsTableColumns.NAME,
          blogsTableColumns.UPDATED_AT
        ],
        filters: filter
      }
      supabase
        .executeQuery(query)
        .then((response: Response) => {
          if (response.data) {
            this.blogList = response.data.map((item: Blog) => {
              const blog: Blog = {
                id: item.id,
                name: item.name,
                image: item.image,
                updated_at: item.updated_at?.slice(0, 10)
              }
              return blog
            })
          }
        })
        .catch((err: Error) => {
          eventBus.emit('notify', err.message)
        })
    }
  },
  mounted() {
    this.getBlogTitles()
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="secondary-menu-wrap">
      <i class="bi"> </i>
      <h6 class="secondary-menu-headings">BLOG POST</h6>
    </div>
    <div class="secondary-menu-list-wrap">
      <div class="blog-search">
        <input
          class="form-control"
          type="text"
          placeholder="Search Blogs"
          v-model="blogSearchTerm"
        />
      </div>
      <div class="secondary-menu-list">
        <div class="secondary-menu-list_item" :key="blog.id" v-for="blog in blogList">
          <router-link :to="'/blog/' + blog.id">
            <div class="blog-item-img">
              <img :src="blog.image" alt="cover" />
            </div>
            <div class="blog-item-description">
              <p class="blog-description">{{ blog.name }}</p>
              <p class="blog-date">{{ blog.updated_at }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.secondary-menu-wrap {
  padding: 10px 0 0 35px;
  font-family: 'Roboto', sans-serif !important;
}

.secondary-menu-wrap h6 {
  font-size: 14px;
}

.secondary-menu-list-wrap {
  width: 100%;
}

.blog-search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px 0;
}

.form-control {
  background-color: #313131;
  color: #ffff !important;
  width: 90%;
  height: 25px;
  border: 1px solid #3c3c3c;
  border-radius: 0;
}

.form-control::placeholder {
  color: #979797 !important;
  font-size: 12px;
}

input[type='text']:focus {
  border: 1px solid #0279cb;
  font-size: 12px;
  box-shadow: none;
}

.secondary-menu-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.secondary-menu-list_item {
  width: 100%;
}
.secondary-menu-list_item a {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  text-decoration: none;
  color: inherit;
}

.secondary-menu-list_item:hover {
  background: #37373e;
  cursor: pointer;
}

.blog-item-img img {
  width: 50px;
  padding: 0 0 0 10px;
}

.blog-item-description p {
  margin: 0;
  padding: 0 15px;
  font-family: 'Roboto', sans-serif !important;
}

.blog-description {
  font-size: 12px;
}

.blog-date {
  font-size: 8px;
}
</style>
