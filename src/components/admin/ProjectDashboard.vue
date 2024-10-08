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
import { projectConstants, projectTableColumns } from '../consumable/constants/projects'
import { type Project } from '../consumable/models/projects'
import { type DynamicFormProp } from '../consumable/constants/common'

interface DashboardProject {
  projects: Array<Project>
  form: Array<DynamicFormProp>
  editingProject: Record<string, string>
  formInitialField: Object
  isCreateProjectFormVisible: boolean
  formMode: string
  file: any
  projectImageFolderBasePath: string
  projectImageBaseURL: string
}

const getNewFormConfiguration = (): Object => {
  return {
    name: '',
    type: '',
    status: '',
    tag: '',
    redirect: '',
    image: '',
    description: ''
  }
}

const getEditFormConfiguration = (data: Project): Object => {
  return {
    name: data.name,
    type: data.type,
    status: data.status,
    tag: data.tag,
    redirect: data.redirect,
    image: data.image,
    description: data.description
  }
}
export default defineComponent({
  data(): DashboardProject {
    return {
      projects: [],
      form: [],
      formInitialField: {},
      editingProject: {},
      isCreateProjectFormVisible: false,
      formMode: '',
      file: {},
      projectImageFolderBasePath: 'project_images',
      projectImageBaseURL:
        'https://ebjhvskzfrqrgegxbsnz.supabase.co/storage/v1/object/public/portfolio_images/project_images'
    }
  },
  methods: {
    dbQueryExecutionHandler(query: Query) {
      supabase
        .executeQuery(query)
        .then((response: Response) => {
          console.log(response)
          this.fetchProjects()
        })
        .catch((err: Error) => {
          this.notify(err)
        })
    },
    // Mehod to fetch personal projects
    fetchProjects() {
      const filter: Array<QueryFilter> = [
        {
          type: FilterTypes.EQ,
          column: projectTableColumns.IS_DELETED,
          value: false
        }
      ]
      let query: Query = {
        operation: DBOperations.FETCH,
        table: projectConstants.SUPABASE_TABLE_PROJECTS,
        filters: filter
      }
      supabase
        .executeQuery(query)
        .then((response: Response) => {
          this.projects = response.data as Array<Project>
        })
        .catch((err: Error) => {
          this.notify(err)
        })
    },
    // Method to trigger dynamic form
    handleOpenForm(op: string, data: Project) {
      this.formMode = op
      this.form = [
        { name: projectTableColumns.NAME, label: 'Name', type: 'text', required: true },
        {
          name: projectTableColumns.TYPE,
          label: 'Type',
          type: 'select',
          required: true,
          values: ['company', 'personal']
        },
        {
          name: projectTableColumns.STATUS,
          label: 'Status',
          type: 'select',
          required: true,
          values: ['in-progress', 'on-going', 'completed']
        },
        { name: projectTableColumns.TAG, label: 'Tags', type: 'text', required: true },
        { name: projectTableColumns.REDIRECT, label: 'Redirect URL', type: 'text', required: true },
        { name: 'image', label: 'Image', type: 'file', required: true },
        {
          name: projectTableColumns.DESCRIPTION,
          label: 'Description',
          type: 'textarea',
          required: true
        }
      ]
      if (op === 'edit') {
        this.editingProject = data as Record<string, any>
        this.formInitialField = getEditFormConfiguration(data)
      } else {
        this.formInitialField = getNewFormConfiguration()
      }
      this.isCreateProjectFormVisible = true
    },
    // Method to close dynamic form
    handleCloseForm() {
      this.isCreateProjectFormVisible = false
    },
    // Method to handle the dynamic form submit event
    formSubmitHandler(formData: Record<string, any>) {
      // Creating new filename
      const dt = new Date()
      const newFileName = `project_${dt.toISOString()}`
      // uploading new file
      if (this.formMode == 'new') {
        if (!this.file?.size) {
          this.notify(new Error('uploaded file missing'))
          return
        }
        this.uploadImage(newFileName)
        formData['image'] = `${this.projectImageBaseURL}/${newFileName}`
        this.createProject(formData)
      } else {
        if (this.file?.size) {
          const filename = this.editingProject.image.split('/').pop() as string
          formData['image'] = `${this.projectImageBaseURL}/${newFileName}`
          this.uploadImage(newFileName)
          this.deleteImage(filename)
        }
        this.updateProject(formData)
      }
      this.handleCloseForm()
    },
    // Method for creting push notification
    notify(msg: Error | string) {
      eventBus.emit('notify', msg)
    },
    // Method to create new project record
    createProject(formData: Record<string, any>) {
      // validate form values for empty keys
      Object.keys(formData).forEach((key: string) => {
        if (formData[key] == '' || formData[key] == undefined) {
          this.notify(new Error('mandatory form filed is empty'))
          return
        }
      })

      formData[projectTableColumns.TAG] = formData[projectTableColumns.TAG].split(',')
      // prepare supabase query
      const date = new Date()
      formData[projectTableColumns.CREATED_AT] = date.toISOString()
      formData[projectTableColumns.UPDATED_AT] = date.toISOString()
      let query: Query = {
        operation: DBOperations.INSERT,
        table: projectConstants.SUPABASE_TABLE_PROJECTS,
        values: formData
      }

      // call supabase client and run the query
      this.dbQueryExecutionHandler(query)
    },
    // method to edit existing project
    updateProject(formData: Record<string, any>) {
      let updatedColumns: Record<string, string> = {}
      // validate form values for empty keys
      Object.keys(formData).forEach((key: string) => {
        if (this.editingProject[key] != formData[key]) {
          if (key == projectTableColumns.TAG) {
            updatedColumns[key] = formData[key].split(',')
          } else {
            updatedColumns[key] = formData[key]
          }
        }
      })
      if (Object.keys(updatedColumns).length > 0) {
        // prepare supabase query
        const date = new Date()
        updatedColumns[projectTableColumns.UPDATED_AT] = date.toISOString()
        const filter: Array<QueryFilter> = [
          {
            type: FilterTypes.EQ,
            column: projectTableColumns.ID,
            value: this.editingProject[projectTableColumns.ID]
          }
        ]
        let query: Query = {
          operation: DBOperations.UPDATE,
          table: projectConstants.SUPABASE_TABLE_PROJECTS,
          values: updatedColumns,
          filters: filter
        }
        // call supabase client and run the query
        this.dbQueryExecutionHandler(query)
      }
    },
    // Method to delete project
    deleteProject(project: Project) {
      if (!project.id) {
        this.notify(new Error('id not found'))
        return
      }
      const filter: Array<QueryFilter> = [
        {
          type: FilterTypes.EQ,
          column: projectTableColumns.ID,
          value: project.id
        }
      ]
      let query: Query = {
        operation: DBOperations.UPDATE,
        table: projectConstants.SUPABASE_TABLE_PROJECTS,
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
          `${this.projectImageFolderBasePath}/${filename}`,
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
        .deleteFile('portfolio_images', [`${this.projectImageFolderBasePath}/${filename}`])
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
          `${this.projectImageFolderBasePath}/${filename}`,
          `${this.projectImageFolderBasePath}/archived/${filename}`
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
    this.fetchProjects()
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="project-form-wrap" v-if="isCreateProjectFormVisible">
      <dynamic-form
        :fields="form"
        :initialValues="formInitialField"
        :onSubmit="formSubmitHandler"
        :onChange="fileUploadHandler"
        :onCancel="handleCloseForm"
      ></dynamic-form>
    </div>
    <div class="project-content-wrap" v-else>
      <div class="new-project-btn-wrap">
        <button class="btn" @click="handleOpenForm('new', {})">New Project</button>
      </div>
      <div class="project-list-wrap">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Tags</th>
              <th scope="col">Last Updated</th>
              <th scope="col">Redirect</th>
              <th scope="col">Image</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr :key="project.id" v-for="project in projects">
              <td scope="row">{{ project.name }}</td>
              <td scope="row">{{ project.description }}</td>
              <td>{{ project.type }}</td>
              <td>{{ project.status }}</td>
              <td>{{ project.tag ? project.tag.join(', ') : project.tag }}</td>
              <td>{{ project.updated_at }}</td>
              <td>
                <a :href="project.redirect" target="blank">url</a>
              </td>
              <td>
                <a :href="project.image" target="blank">url</a>
              </td>
              <td>
                <button class="btn" @click="handleOpenForm('edit', project)">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button class="btn" @click="deleteProject(project)">
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
.project-form-wrap {
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-content-wrap {
  margin: 20px;
}

.new-project-btn-wrap {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: flex-end;
  align-content: center;
}

.project-list-wrap {
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
