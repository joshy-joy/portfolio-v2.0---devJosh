<script lang="ts">
import { defineComponent } from 'vue'

import eventBus from '../consumable/eventBus'
import supabase, {
  DBOperations,
  FilterTypes,
  type Query,
  type Response,
  type QueryFilter
} from '../consumable/externals/supabase'
import { blogsConstants, blogsTableColumns } from '../consumable/constants/blogs'
import { type Blog } from '../consumable/models/blogs'
import { type DynamicFormProp } from '../consumable/constants/common'
import DynamicForm from '../commons/DynamicForm.vue'
import type { Project } from '../consumable/models/projects'

interface DashboardProject {
  blogs: Array<Blog>
  form: Array<DynamicFormProp>
  editingBlog: Record<string, string>
  formInitialField: Object
  isFormVisible: boolean
  formMode: string
  file: any
  blogImageFolderBasePath: string
  blogImageBaseURL: string
}

const getNewFormConfiguration = (): Object => {
  return {
    name: '',
    content: '',
    image: '',
    tags: ''
  }
}

const getEditFormConfiguration = (data: Blog): Object => {
  return {
    name: data.name,
    content: data.content,
    image: data.image,
    tags: data.tags
  }
}
export default defineComponent({
  components: {
    'dynamic-form': DynamicForm
  },
  data(): DashboardProject {
    return {
      blogs: [],
      form: [],
      formInitialField: {},
      editingBlog: {},
      isFormVisible: false,
      formMode: '',
      file: {},
      blogImageFolderBasePath: 'blogs_images',
      blogImageBaseURL:
        'https://ebjhvskzfrqrgegxbsnz.supabase.co/storage/v1/object/public/portfolio_images/blogs_images'
    }
  },
  methods: {
    dbQueryExecutionHandler(query: Query) {
      supabase
        .executeQuery(query)
        .then((response: Response) => {
          console.log(response)
          this.fetchBlogs()
        })
        .catch((err: Error) => {
          this.notify(err)
        })
    },
    // Mehod to fetch blogs
    fetchBlogs() {
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
        filters: filter
      }
      supabase
        .executeQuery(query)
        .then((response: Response) => {
          this.blogs = response.data as Array<Blog>
        })
        .catch((err: Error) => {
          this.notify(err)
        })
    },
    // Method to trigger dynamic form
    handleOpenForm(op: string, data: Blog) {
      this.formMode = op
      this.form = [
        { name: blogsTableColumns.NAME, label: 'Name', type: 'text', required: true },
        { name: blogsTableColumns.TAG, label: 'Tags', type: 'text', required: true },
        { name: blogsTableColumns.IMAGE, label: 'Image', type: 'file', required: true },
        {
          name: blogsTableColumns.CONTENT,
          label: 'Content',
          type: 'quill-editor',
          required: true
        }
      ]
      if (op === 'edit') {
        this.editingBlog = data as Record<string, any>
        this.formInitialField = getEditFormConfiguration(data)
      } else {
        this.formInitialField = getNewFormConfiguration()
      }
      this.isFormVisible = true
    },
    // Method to close dynamic form
    handleCloseForm() {
      this.isFormVisible = false
    },
    // Method to handle the dynamic form submit event
    formSubmitHandler(formData: Record<string, any>) {
      // Creating new filename
      const dt = new Date()
      const newFileName = `blog_${dt.toISOString()}`
      // uploading new file
      if (this.formMode == 'new') {
        if (!this.file?.size) {
          this.notify(new Error('uploaded file missing'))
          return
        }
        this.uploadImage(newFileName)
        formData['image'] = `${this.blogImageBaseURL}/${newFileName}`
        this.createBlog(formData)
      } else {
        if (this.file?.size) {
          const filename = this.editingBlog.image.split('/').pop() as string
          formData['image'] = `${this.blogImageBaseURL}/${newFileName}`
          this.uploadImage(newFileName)
          this.deleteImage(filename)
        }
        this.updateBlog(formData)
      }
      this.handleCloseForm()
    },
    notify(err: Error | string) {
      eventBus.emit('notify', err as string)
    },
    // Method to create new blog record
    createBlog(formData: Record<string, any>) {
      // validate form values for empty keys
      Object.keys(formData).forEach((key: string) => {
        if (formData[key] == '' || formData[key] == undefined) {
          this.notify(new Error('mandatory form filed is empty'))
          return
        }
      })

      formData[blogsTableColumns.TAG] = formData[blogsTableColumns.TAG].split(',')
      // prepare supabase query
      const date = new Date()
      formData[blogsTableColumns.CREATED_AT] = date.toISOString()
      formData[blogsTableColumns.UPDATED_AT] = date.toISOString()
      let query: Query = {
        operation: DBOperations.INSERT,
        table: blogsConstants.SUPABASE_TABLE_BLOGS,
        values: formData
      }

      // call supabase client and run the query
      this.dbQueryExecutionHandler(query)
    },
    // method to edit existing blog
    updateBlog(formData: Record<string, any>) {
      let updatedColumns: Record<string, string> = {}
      // validate form values for empty keys
      Object.keys(formData).forEach((key: string) => {
        if (this.editingBlog[key] != formData[key]) {
          if (key == blogsTableColumns.TAG) {
            updatedColumns[key] = formData[key].split(',')
          } else {
            updatedColumns[key] = formData[key]
          }
        }
      })
      if (Object.keys(updatedColumns).length > 0) {
        // prepare supabase query
        const date = new Date()
        updatedColumns[blogsTableColumns.UPDATED_AT] = date.toISOString()
        const filter: Array<QueryFilter> = [
          {
            type: FilterTypes.EQ,
            column: blogsTableColumns.ID,
            value: this.editingBlog[blogsTableColumns.ID]
          }
        ]
        let query: Query = {
          operation: DBOperations.UPDATE,
          table: blogsConstants.SUPABASE_TABLE_BLOGS,
          values: updatedColumns,
          filters: filter
        }
        // call supabase client and run the query
        this.dbQueryExecutionHandler(query)
      }
    },
    // Method to delete blog
    deleteBlog(project: Project) {
      if (project.id == undefined) {
        this.notify(new Error('id is undefined'))
        return
      }
      const filter: Array<QueryFilter> = [
        {
          type: FilterTypes.EQ,
          column: blogsTableColumns.ID,
          value: project.id
        }
      ]
      let query: Query = {
        operation: DBOperations.UPDATE,
        table: blogsConstants.SUPABASE_TABLE_BLOGS,
        values: { is_deleted: true },
        filters: filter
      }
      this.archiveImage(project.image?.split('/').pop() as string)
      // call supabase client and run the query
      this.dbQueryExecutionHandler(query)
    },
    fileUploadHandler(event: any) {
      this.file = event.target.files[0]
    },
    uploadImage(filename: string) {
      supabase
        .uploadFileToBucket(
          'portfolio_images',
          `${this.blogImageFolderBasePath}/${filename}`,
          this.file
        )
        .then(() => {
          this.notify('image uploaded successfully')
        })
        .catch(() => {
          this.notify(new Error('error uploading image'))
        })
    },
    deleteImage(filename: string) {
      supabase
        .deleteFile('portfolio_images', [`${this.blogImageFolderBasePath}/${filename}`])
        .then(() => {
          this.notify('image deleted successfully')
        })
        .catch(() => {
          this.notify(new Error('error deleting image'))
        })
    },
    archiveImage(filename: string) {
      supabase
        .moveFile(
          'portfolio_images',
          `${this.blogImageFolderBasePath}/${filename}`,
          `${this.blogImageFolderBasePath}/archived/${filename}`
        )
        .then(() => {
          this.notify('image archived successfully')
        })
        .catch(() => {
          this.notify(new Error('error archived image'))
        })
    }
  },
  mounted() {
    this.fetchBlogs()
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="blog-form-wrap" v-if="isFormVisible">
      <dynamic-form
        :fields="form"
        :initialValues="formInitialField"
        :onSubmit="formSubmitHandler"
        :onChange="fileUploadHandler"
        :onCancel="handleCloseForm"
      ></dynamic-form>
    </div>
    <div class="blog-content-wrap" v-else>
      <div class="new-blog-btn-wrap">
        <button class="btn" @click="handleOpenForm('new', {})">New Blog</button>
      </div>
      <div class="blog-list-wrap">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Tags</th>
              <th scope="col">Last Updated</th>
              <th scope="col">Image</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr :key="blog.id" v-for="blog in blogs">
              <td scope="row">{{ blog.name }}</td>
              <td>{{ blog.tags ? blog.tags.join(', ') : blog.tags }}</td>
              <td>{{ blog.updated_at }}</td>
              <td>
                <a :href="blog.image" target="blank">url</a>
              </td>
              <td>
                <button class="btn" @click="handleOpenForm('edit', blog)">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button class="btn" @click="deleteBlog(blog)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-form-wrap {
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blog-content-wrap {
  margin: 20px;
}

.new-blog-btn-wrap {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: flex-end;
  align-content: center;
}

.blog-list-wrap {
  margin: 20px 0 0 0;
}

table th,
table td {
  color: #bcbcbc;
}

.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  background-color: #bcbcbc;
  color: #1f1f1f;
}
</style>
