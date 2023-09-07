export default interface CabinType {
  id?: string | number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  image: string | File | FileList
  description: string
}
