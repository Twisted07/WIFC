interface ISuggestion {
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

interface IReview {
  name: string,
  review: string,
  rating: number,
  email: string,
  suggestionID: string | number,
}

interface IReviewData extends IReview {
  Suggestion: ISuggestion
}