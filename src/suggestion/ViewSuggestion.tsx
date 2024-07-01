import { getReviews } from "@/services/apiReview";
import { getSuggestion } from "@/services/apiSuggestion";
import { IUser } from "@/services/apiUser";
import MyButton from "@/ui/MyButton";
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

  function handleCancel(e : any) {
    e.preventDefault();
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

  // const {data: suggestions} = useQuery({
  //   queryKey: ['suggestions'],
  // })

  console.log(suggestion, 'suggestion');
  // console.log(suggestions, 'suggestions from previous query');
  console.log(reviews, "reviews");

  if (isLoading) return (<h1>Loading...</h1>);
  if (error) return (<h2>An error occurred while loading this page.</h2>);

  
  return (
    <div>
      {!suggestion ? (<h1>An error occurred while fetching data</h1>) :
        <>
          <figure>
            <img src={suggestion.image} alt="Image" />
            <figcaption className="text-2xl font-bold">{suggestion.name}</figcaption>
          </figure>

          <div className="w-[50dvw]">
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
                  <MyButton type="button" onclick={handleCancel} className="mr-2" >Cancel</MyButton>
                  <MyButton type="submit" onclick={handleSubmit}>Submit Review</MyButton>
                </form>
                <MyButton type="button" onclick={toggleVisible} hidden={!visible}>Add Review</MyButton>
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