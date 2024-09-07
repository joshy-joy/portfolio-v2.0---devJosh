export interface Project {
  id?: string
  created_at?: string
  name?: string
  description?: string
  redirect?: string
  status?: string
  image?: string
  tag?: Array<string>
  updated_at?: string
  type?: string
  is_deleted?: boolean
}

export interface ProjectList {
  personal?: Array<Project>
  company?: Array<Project>
}

export interface ProjectPage {
  projects?: ProjectList
  isPersonalProjectEmpty: boolean
  IsCompanyProjectEmpty: boolean
  lineCount: number
  contentWrapElement: Element | null
  resizeObserver: ResizeObserver
}
