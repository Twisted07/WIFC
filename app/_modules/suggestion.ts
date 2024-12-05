export interface ISuggestion {
  name: string
  id?: string
  images: any[]
  description: string
  duration: string
  recipe: string
  reviews: IReview[]
  suggesterID?: string | number
  suggesterName: string
  category: string[]
}

export interface IReview {
  name: string,
  review: string,
  rating: string,
  email: string,
}