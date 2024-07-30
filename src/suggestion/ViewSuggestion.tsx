import { GlobalContext } from "@/context";
import { getReviews, IReview } from "@/services/apiReview";
import { getSuggestion, ISuggestion, updateSuggestionReviews } from "@/services/apiSuggestion";
import { getUserByID, IUser } from "@/services/apiUser";
import MyButton from "@/ui/MyButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

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
  // const [suggester, setSuggester] = useState({});
  const navigate = useNavigate();
  
  const {id} = useParams();
  const {user} = useContext(GlobalContext);

  // * Queries
  const {isLoading, data:suggestion, error} = useQuery({
    queryKey: ['suggestion'],
    queryFn: () => getSuggestion(Number(id)),
  });
  
  const {status, mutate} = useMutation({
    mutationFn: (updatedReviews : IReview[]) => updateSuggestionReviews(updatedReviews, Number(id))
  });
  
  const {data: suggester, refetch, isRefetching} = useQuery({
    queryKey: ['suggester'],
    queryFn: () => getUserByID(suggestion.userID),
  });

  if (suggester?.id !== suggestion?.userID) {
    refetch();
  }


// * Functions
  function toggleVisible() {
    setVisible((v) => v = !v);
  }
  function handleReview(e : any) {
    setReview(e.target.value);
  }
  function createReview(obj: IReview) {
    const newSuggestion = {...suggestion};
    newSuggestion.reviews.push(obj);
    mutate(newSuggestion.reviews);
    
    // console.log(status);
  }

  async function handleSubmit(e : any) {
    e.preventDefault();
    if (!review) return;

    const newReviewObj = {
      reviewerID : user?.id,
      message : review,
    };
    
    createReview(newReviewObj)
    setReview("");
    toggleVisible();
  }
  function handleCancel(e : any) {
    e.preventDefault();
    setReview("");
    toggleVisible();
  }



  if (isLoading || suggestion.id != id || isRefetching) return (<h1>Loading...</h1>);
  if (error) return (<h2>An error occurred while loading this page.</h2>);
  if (!user) navigate('/signin');

  
  return (
    <div className="flex flex-col items-center justify-center text-center h-[80dvh] overflow-y-scroll">
      {!suggestion ? (<h1>An error occurred while fetching data</h1>) :
        <>
          <figure className="mt-10 mb-16">
            <div className="flex items-center justify-start h-[40dvh] gap-3 mb-5">
              <div className="w-[30dvw] bg-cover bg-center h-full rounded-xl" style={{backgroundImage: `url(${suggestion.image[0]})`}}></div>
              {/* Multiple images to be handled */}
              {/* <div className="flex-1 ">
              {
                suggestion.image.map((img : string, i : number) => (
                i > 0 ? (<div key={img} className="bg-center bg-cover w-[20vw] h-[20vw]" style={{backgroundImage: `url(${img})`}}></div>) : null
                ))
              }
              </div> */}
            </div>
            <figcaption className="text-2xl font-bold">{suggestion?.name}</figcaption>
          </figure>

          <div className="w-[50dvw] space-y-10">
            <Section title="Description">
              <article>
                {suggestion?.description}
                <h6>Suggested by: <i>{suggester?.name}</i></h6>
              </article>
            </Section>

            <Section title="Recipe">
              <article>
                {suggestion?.recipe || <i className="text-gray-300">Not available</i>}
              </article>
            </Section>

            <Section title="Reviews">
              <div>
                {suggestion.reviews?.length === 0 ? (<h3>No Reviews Yet.</h3>) : (
                  <ul>
                    {suggestion.reviews?.map((review : any) => (<li key={Math.floor(Math.random() * 1000000)}>{review.message}</li>))}
                  </ul>
                )}

                <form action="#" hidden={visible}>
                  <textarea name="review-input" value={review} onChange={handleReview} id="review-input" className="block p-3 border border-blue-200 rounded-2xl focus:outline-blue-300" cols={70} rows={7}></textarea>
                  <MyButton type="button" onclick={handleCancel} className="mr-2" >Cancel</MyButton>
                  <MyButton type="submit" onclick={handleSubmit}>Submit Review</MyButton>
                </form>
                <div hidden={!visible}>
                  <MyButton type="button" className="mt-16" onclick={user?.name ? toggleVisible : ()=>navigate('/signin')}>Add Review</MyButton>
                </div>
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