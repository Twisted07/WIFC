
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


  return (
    <div>
      <figure>
        <img src="#" alt="Image" />
        <figcaption>Suggestion Image</figcaption>
      </figure>
      <div>
        <section>
          <h2>Description</h2>
          <article>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, maiores nobis distinctio, esse autem iste voluptate ipsam nulla ex officia voluptatibus minima ducimus alias explicabo blanditiis, ullam assumenda illo unde!
          </article>
        </section>

        <section>
          <h2>Recipe</h2>
          <article>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos omnis enim reprehenderit sed, ex totam temporibus iusto dicta expedita cum tempora incidunt placeat pariatur? Quod voluptatum velit harum asperiores exercitationem.
          </article>
        </section>

        <section>
          <h2>Reviews</h2>
          <ul>
            <li>Suggestion review</li>
            <li>Suggestion review</li>
            <li>Suggestion review</li>
            <li>Suggestion review</li>
            <li>Suggestion review</li>
            <li>Suggestion review</li>
          </ul>

          <button>Add Review</button>
        </section>
      </div>
    </div>
  )
}

export default ViewSuggestion