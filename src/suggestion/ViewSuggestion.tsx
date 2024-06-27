import { getReviews } from "@/services/apiReview";
import { getSuggestion } from "@/services/apiSuggestion";
import { IUser } from "@/services/apiUser";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react"
import { useParams } from "react-router-dom";

function ViewSuggestion() {

  // * This is meant to take the suggestion id, then use it to find the individual suggestion and render the 
  /**
   * Images of the suggestion 
   * Name/title
   * The description - shoiuld render the complete iinfo if the field is not empty else render "No description available"
   * The Recipe - the field should be rendered completely if the detail is available else render "No recipe available"
   * By "name of the suggester gotten from the userID in the suggestion object"
   * Comments
   */

  const [visible, setVisible] = useState(true);
  const [review, setReview] = useState("");
  const {id} = useParams();


  function toggleVisible() {
    setVisible((v) => v = !v);
  }

  function handleReview(e : any) {
    setReview(e.target.value);
  }

  function handleSubmit(e : any) {
    e.preventDefault();
    if (!review) return;
    console.log(review);
    setReview("");
    toggleVisible();
  }

  function handleCancel() {
    setReview("");
    toggleVisible();
  }


  const {isLoading, data:suggestion, error} = useQuery({
    queryKey: ['suggestion'],
    queryFn: () => getSuggestion(Number(id)),
  })

  const {isLoading: reviewLoading, data: reviews, error: reviewError} = useQuery({
    queryKey: ['review'],
    queryFn: () => getReviews(Number(id)),
  })

  console.log(suggestion);
  console.log(reviews, "reviews");

  if (isLoading) return (<h1>Loading...</h1>);
  
  return (
    <div>
      {!suggestion ? (<h1>An error occurred while fetching data</h1>) :
        <>
          <figure>
            <img src="#" alt="Image" />
            <figcaption>Suggestion Image</figcaption>
          </figure>

          <div>
            <Section title="Description">
              <article>
                {suggestion.description}
              </article>
            </Section>

            <Section title="Recipe">
              <article>
                {suggestion.recipe}
              </article>
            </Section>

            <Section title="Reviews">
              <div>
                {reviews?.length === 0 ? (<h3>No Reviews Yet.</h3>) : (
                  <ul>
                    {reviews?.map(review => (<li key={review.id}>{review.message}</li>))}
                  </ul>
                )}

                <form action="#" hidden={visible}>
                  <textarea name="review-input" value={review} onChange={handleReview} id="review-input" className="block p-3 border border-blue-200 rounded-2xl focus:outline-blue-300" cols={70} rows={7}></textarea>
                  <button onClick={handleCancel}>Cancel</button>
                  <button type="submit" onClick={handleSubmit}>Submit Review</button>
                </form>
                <button type="button" onClick={toggleVisible} hidden={!visible}>Add Review</button>
              </div>
            </Section>
          </div>
        </>
      }
    </div>
  )
}



interface ISection {
  children: React.ReactElement<any>,
  title: string,
}

function Section({children, title} : ISection) {
  return (
    <section>
      <h2 className="mt-4 mb-1 text-lg font-bold text-black">{title}</h2>
      {children}
    </section>
  );
}



type TReviewCard = {
  review: string;
  name: IUser["name"];
}

function ReviewCard({review, name} : TReviewCard) {
  return (
    <li>
      <h4>{name}</h4>
      {review}
    </li>
  );
}

export default ViewSuggestion