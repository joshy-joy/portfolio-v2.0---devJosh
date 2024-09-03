// Dynamic form interface
export interface DynamicFormProp {
  name: string
  label: string
  type: string
  values?: Array<string>
  required: boolean
  validation?: Array<string>
}
