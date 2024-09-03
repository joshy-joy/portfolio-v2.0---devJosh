<script lang="ts">
import { defineComponent } from 'vue'

import { type DynamicFormProp } from '../consumable/constants/common'

interface DynamicForm {
  formData: Record<string, string>
  errors: Record<string, string>
}

export default defineComponent({
  data(): DynamicForm {
    return {
      formData: {},
      errors: {}
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
      required: true
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
    <button class="btn" @click.prevent="onCancel()">Cancel</button>
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
</style>
