export interface Blog {
  id?: string
  name?: string
  content?: string
  image?: string
  icon?: string
  tags?: Array<string>
  created_at?: string
  updated_at?: string
  is_deleted?: boolean
}
