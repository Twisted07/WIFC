import { ISuggestion } from "@/services/apiSuggestion";


function Card({image, name, id} : ISuggestion) {  
  
  // function handleClick() {
  //   console.log(id, "id...");
  //   console.log(name, "name...");
  //   navigate(`/${id}`)
  // }

  return (
    <div id={id?.toString()} className="w-[15rem] flex flex-col justify-center items-center">
      <div className="w-full h-[15rem] bg-stone-300">{image}</div>
      <div className="w-full h-[2rem] text-white bg-stone-500">{name}</div>
    </div>
  );
}


export default Card