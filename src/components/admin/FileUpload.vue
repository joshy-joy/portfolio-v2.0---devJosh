<script lang="ts">
import { defineComponent } from 'vue'
import { type DynamicFormProp } from '../consumable/constants/common'
import supabase from '../consumable/externals/supabase'

interface FileUpload {
  form: Array<DynamicFormProp>
  commonFolderBasePath: string
  file: any
}

export default defineComponent({
  data(): FileUpload {
    return {
      form: [
        {
          name: 'file',
          label: 'File',
          type: 'file',
          required: true
        }
      ],
      commonFolderBasePath: 'common',
      file: []
    }
  },
  methods: {
    fileUploadHandler(event: any) {
      this.file = event.target.files[0]
      console.log(this.file)
    },
    formSubmitHandler() {
      if (!this.file || this.file?.type != 'application/pdf') return
      let path = `${this.commonFolderBasePath}/joshy_joy-resume.pdf`
      supabase.deleteFile('portfolio_images', [path]).then(() => {
        supabase.uploadFileToBucket('portfolio_images', path, this.file)
      })
    }
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="upload-form-wrap">
      <dynamic-form
        :fields="form"
        :onSubmit="formSubmitHandler"
        :onChange="fileUploadHandler"
      ></dynamic-form>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  font-family: monospace, monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.project-form-wrap {
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
