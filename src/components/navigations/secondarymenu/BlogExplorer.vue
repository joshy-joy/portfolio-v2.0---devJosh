<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      blogSearchTerm: '',
      blogList: [
        {
          id: '1',
          title: 'This blog is all about golang worker pool',
          createdAt: '07 Jul 2025',
          icon: 'https://cdn.pixabay.com/photo/2024/02/21/11/34/ai-generated-8587505_1280.png'
        }
      ]
    }
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
          @keyup="searchBlogs()"
        />
      </div>
      <div class="secondary-menu-list">
        <div class="secondary-menu-list_item" :key="blog.id" v-for="blog in blogList">
          <div class="blog-item-img">
            <img :src="blog.icon" alt="cover" />
          </div>
          <div class="blog-item-description">
            <p class="blog-description">{{ blog.title }}</p>
            <p class="blog-date">{{ blog.createdAt }}</p>
          </div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
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
