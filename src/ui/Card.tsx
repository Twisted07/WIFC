import { ISuggestion } from "@/services/apiSuggestion";
import React from "react";

// function Card({children, className = 'w-[15rem] h-[15rem]'} : any) {
//   return (
//     <div className="p-[2rem] border border-slate-500 bg-slate-200 rounded-lg">
//       <img src="#" alt="#" className={className} />
//       {children}
//     </div>
//   )
// }

function Card({image, name} : ISuggestion) {
  function handleClick() {
    location.href = 'suggestions/view';
  }

  return (
    <button onClick={handleClick} className="w-[15rem] flex flex-col justify-center items-center">
      <div className="w-full h-[15rem] bg-stone-300">{image}</div>
      <div className="w-full h-[2rem] text-white bg-stone-500">{name}</div>
    </button>
  );
}

export function InfoCard() {
  return (
    <div className="w-[24rem]">
      {/* <Card>
        <div className="bg-slate-500 h-[5rem]"></div>
      </Card> */}
    </div>
  );
}

export default Card