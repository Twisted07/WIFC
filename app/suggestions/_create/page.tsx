import MyButton from '@/_mycomponents/button';
import MyInput, { errorBorder, greenBorder } from '@/_mycomponents/input';
import MyLabel from '@/_mycomponents/label';
import { MainContext, useMainContext } from '@/context';
import { ConfigProvider, Radio } from 'antd';
import React, { useContext, useState } from 'react'

const CreateSuggestion = () => {
  const [mealName, setMealName] = useState("");
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");
  const [duration, setDuration] = useState("1");
  const [images, setImages] = useState([]);
  const [mealPeriod, setMealPeriod] = useState("breakfast");

  const {handleCloseModal} = useMainContext();

  function __reset() {
    setMealName("");
    setDescription("");
    setRecipe("");
    setDuration("1");
    setImages([]);
    setMealPeriod("breakfast");
  }

  function handleCreateSuggestion(e: any) {
    e.preventDefault();

    const suggestionData = {
      name: mealName,
      description,
      recipe,
      duration,
      images,
      bestEnjoyed: mealPeriod,
      reviews: []
    }
    console.log("submitting");
    console.log(suggestionData, "suggestion data");

    handleCloseModal();
    __reset();
  }

  return (
    <form onSubmit={handleCreateSuggestion}>
      <div className='space-y-5 mb-10'>
        <div>
          <MyLabel htmlFor="name">Meal name</MyLabel>
          <MyInput type="text" name="meal_name" id="name" value={mealName} onChange={(e) => setMealName(e.target.value)} required={true} placeholder='Rice and beans' validity={false} className='focus:outline-yellow-700' />
        </div>

        <div>
          <MyLabel className='mb-1' htmlFor="description">Describe the meal</MyLabel>
          <textarea name="meal_description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className='w-full border border-yellow-700 rounded-md' ></textarea>
        </div>

        <div>
          <MyLabel htmlFor="recipe">Recipe</MyLabel>
          <textarea name="meal_recipe" id="recipe" value={recipe} onChange={(e) => setRecipe(e.target.value)} className='w-full border border-yellow-700 rounded-md' autoCorrect='on' autoComplete='on'></textarea>
        </div>

        <div>
          <MyLabel htmlFor="duration">How long does it take to prepare? (in minutes)</MyLabel>
          <MyInput type="number" min={"1"} minLength={1} name="duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className={`${Number.parseInt(duration) > 0 ? greenBorder : errorBorder} `} required={true} validity={false} />
        </div>

        <div>
          <MyLabel htmlFor="meal_period" className='block mb-1'>When is this meal best enjoyed?</MyLabel>
          <ConfigProvider
            theme={
              {
                components: {
                  Radio: {
                    colorPrimary: "#FFC107",
                  }
                }
              }
            }
          >
            <Radio.Group onChange={(e) => setMealPeriod(e.target.value)} value={mealPeriod} id='meal_period' name='meal_period'>
              <Radio value={"breakfast"}>Breakfast</Radio>
              <Radio value={"lunch"}>Lunch</Radio>
              <Radio value={"dinner"}>Dinner</Radio>
              <Radio value={"all"}>Any time</Radio>
            </Radio.Group>
          </ConfigProvider>
        </div>

        <div>
          <label htmlFor="images">Upload images of the meal
            <input type="file" name="meal_images" id="images" value={images} onChange={(e) => console.log(e, "image")} className='w-full' />
          </label>
        </div>
      </div>


      <MyButton type="submit" text='Suggest meal' className='font-semibold' />
    </form>
  )
}

export default CreateSuggestion