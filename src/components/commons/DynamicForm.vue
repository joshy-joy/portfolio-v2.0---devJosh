<script lang="ts">
import { defineComponent } from 'vue'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import { type DynamicFormProp } from '../consumable/constants/common'

interface DynamicForm {
  formData: Record<string, string>
  errors: Record<string, string>
  editorOptions: Object
}

export default defineComponent({
  components: {
    QuillEditor
  },
  data(): DynamicForm {
    return {
      formData: {},
      errors: {},
      editorOptions: {
        theme: 'snow',
        modules: {
          syntax: {
            highlight: (text: string) => hljs.highlightAuto(text).value
          },
          toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            [{ color: [] }, { background: [] }],
            ['code-block']
          ]
        }
      }
    }
  },
  props: {
    fields: {
      type: Array<DynamicFormProp>,
      required: true
    },
    initialValues: {
      type: Object,
      default: () => ({})
    },
    onSubmit: {
      type: Function,
      required: true
    },
    onCancel: {
      type: Function,
      required: false
    },
    onChange: {
      type: Function,
      required: false
    }
  },
  beforeMount() {
    this.formData = this.initialValues
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit(formData)">
    <div class="mb-3" v-for="field in fields" :key="field.name">
      <label class="form-label" :for="field.name">{{ field.label }}</label>
      <select
        class="form-select"
        aria-label="Default select example"
        :id="field.name"
        v-model="formData[field.name]"
        v-if="field.type == 'select'"
      >
        <option v-for="value in field.values" :key="value" :value="value">{{ value }}</option>
      </select>
      <textarea
        class="form-control"
        rows="3"
        :id="field.name"
        v-model="formData[field.name]"
        v-else-if="field.type == 'textarea'"
      ></textarea>
      <div class="editor-wrap" v-else-if="field.type == 'quill-editor'">
        <QuillEditor
          class="editor"
          :options="editorOptions"
          :id="field.name"
          :style="{ height: '700px' }"
          contentType="html"
          v-model:content="formData[field.name]"
        />
      </div>
      <input
        class="form-control"
        type="file"
        :id="field.name"
        :name="field.name"
        @change="onChange($event)"
        v-else-if="field.type == 'file' && onChange"
      />
      <input
        v-else
        class="form-control"
        :type="field.type"
        :id="field.name"
        :name="field.name"
        v-model="formData[field.name]"
      />
      <div v-if="errors[field.name]">{{ errors[field.name] }}</div>
    </div>
    <button class="btn" type="submit">Submit</button>
    <button class="btn" @click.prevent="onCancel()" v-if="onCancel">Cancel</button>
  </form>
</template>

<style scoped>
form {
  width: 800px;
}
.form-label {
  color: #bcbcbc;
}

.form-select {
  width: 400px;
  height: 38px;
  border-radius: 10px;
  margin: 0 0 0 30px;
}
.btn {
  margin: 0 10px 0 0;
}

.editor-wrap {
  background-color: #ffff !important;
  color: #bcbcbc;
}

.ql-container {
  height: 400px;
}

input[type='file'] {
  background: inherit;
  color: #ffff;
  padding: 0;
}

input::file-selector-button {
  height: 38px;
  background: #0279cb;
  color: #ffff;
  margin: 0 20px 0 0 !important;
  padding: 0 !important;
  box-shadow: none;
  border: none;
  width: 150px;
}
</style>
