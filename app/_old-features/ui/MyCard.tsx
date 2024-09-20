import { ISuggestion } from "@/services/apiSuggestion";


function MyCard({image, name, id} : ISuggestion) {  
  
  // function handleClick() {
  //   console.log(id, "id...");
  //   console.log(name, "name...");
  //   navigate(`/${id}`)
  // }

  return (
    <div id={id?.toString()} className="w-[15rem] flex flex-col justify-center items-center">
      <div className={`w-[15rem] h-[15rem] bg-center bg-cover`} style={{backgroundImage: `url(${image})`}} >
        {/* <img src={image} alt={name} className="w-full bg-center bg-cover" /> */}

      </div>
      <div className="w-full text-white h-7 bg-stone-500">{name}</div>
    </div>
  );
}


export default MyCard