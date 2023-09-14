interface FieldType {
  field: string
}

export interface Filter extends FieldType {
  value: string
}

export interface SortBy extends FieldType {
  direction: string
}
