import MyButton from '@/_mycomponents/button';
import MyInput, { errorBorder, greenBorder } from '@/_mycomponents/input';
import MyLabel from '@/_mycomponents/label';
import { MainContext, useMainContext } from '@/context';
import { Checkbox, CheckboxProps, ConfigProvider, Radio } from 'antd';
import React, { useContext, useState } from 'react'

const CreateSuggestion = () => {
  const { handleCloseModal } = useMainContext();
  const [mealName, setMealName] = useState("");
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");
  const [duration, setDuration] = useState("1");
  const [images, setImages] = useState([]);
  const [mealPeriod, setMealPeriod] = useState(["breakfast"]);

  const periodOptions = ['breakfast', 'lunch', 'dinner'];
  const checkAll = periodOptions.length === mealPeriod.length;
  const indeterminate = mealPeriod.length > 0 && mealPeriod.length < periodOptions.length;

  const onChange = (list: string[]) => {
    setMealPeriod(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setMealPeriod(e.target.checked ? periodOptions : []);
  };


  function __reset() {
    setMealName("");
    setDescription("");
    setRecipe("");
    setDuration("1");
    setImages([]);
    setMealPeriod(["breakfast"]);
  }

  function handleCreateSuggestion(e: any) {
    e.preventDefault();

    const suggestionData: ISuggestion = {
      name: mealName,
      description,
      recipe,
      duration,
      images,
      category: mealPeriod,
      reviews: [],
      suggesterName: "Twisted"
    }

    // TODO: Handle API call to create suggestion and image creation

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
                  Checkbox: {
                    colorPrimary: "#FFC107",
                  }
                }
              }
            }
          >
            {/* <Radio.Group onChange={(e) => setMealPeriod(e.target.value)} value={mealPeriod} id='meal_period' name='meal_period'>
              <Radio value={"breakfast"}>Breakfast</Radio>
              <Radio value={"lunch"}>Lunch</Radio>
              <Radio value={"dinner"}>Dinner</Radio>
              <Radio value={"all"}>Any time</Radio>
              <Checkbox value={"all"}>Any time</Checkbox>
            </Radio.Group> */}
            <>
              <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                Any time
              </Checkbox>
              <Checkbox.Group options={periodOptions} value={mealPeriod} onChange={onChange} />
            </>
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