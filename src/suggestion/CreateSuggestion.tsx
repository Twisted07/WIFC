import MyButton from "@/ui/MyButton";
import { useState } from "react";

function CreateSuggestion() {
  
  const [image, setImage] = useState<any[]>([]);
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");


  async function handleFileChange(e : any) {
    console.log(e.target.files, "file event");
    console.log(e.target.files.length);

    const files = await e.target.files;
    console.log(files, "awaited files");
    
    for (let i = 0; i < files.length; i++) {
      setImage(img => [...img, files[i]]);
      console.log(i);
    }
  }

  function handleDishName(e : any) {
    setDishName(e.target.value);
  }

  function handleDescription(e : any) {
    setDescription(e.target.value);
  }

  function handleRecipe(e : any) {
    setRecipe(e.target.value);
  }

  function reset() {
    setImage([]);
    setDishName("");
    setDescription("");
    setRecipe("");
  }

  function handleCancel() {
    reset();
  }

  function handleSubmit(e : any) {
    e.preventDefault();
    
    const newSuggestionObj = {
      image,
      name: dishName,
      description,
      recipe,
    };

    console.log(newSuggestionObj);
  }



  return (
    <form>
      <div>
        <label htmlFor="suggestion-image">
          <input type="file" accept="image/*" id="suggestion-image" name="suggestion-image" multiple onChange={handleFileChange} required />
        </label>
      </div>

      <div>
        <label htmlFor="suggestion-name">Dish Name</label>
        <input type="text" name="suggestion-name" id="suggestion-name" value={dishName} onChange={handleDishName} placeholder="e.g Rice and Beans" required />
      </div>

      <div>
        <label htmlFor="suggestion-description">Description</label>
        <textarea name="suggestion-description" id="suggestion-description" value={description} onChange={handleDescription} cols={30} rows={10} placeholder="Say something about the dish..." required ></textarea>
      </div>
      
      <div>
        <label htmlFor="suggestion-recipe">Recipe</label>
        <textarea name="suggestion-recipe" id="suggestion-recipe" value={recipe} onChange={handleRecipe} cols={30} rows={10} placeholder="Do you know how to prepare the dish? Kindly share your recipe."></textarea>
      </div>

      <MyButton type="button" onclick={handleCancel}>Cancel</MyButton>
      <MyButton type="submit" onclick={handleSubmit}>Submit Suggestion</MyButton>
    </form>
  )
}

export default CreateSuggestion;