import React from "react";

function Card({children, className = 'w-[15rem] h-[15rem]'} : any) {
  return (
    <div className="p-[2rem] border border-slate-500 bg-slate-200 rounded-lg">
      <img src="#" alt="#" className={className} />
      {children}
    </div>
  )
}


export function InfoCard() {
  return (
    <div className="w-[24rem]">
      <Card>
        <div className="bg-slate-500 h-[5rem]"></div>
      </Card>
    </div>
  );
}

export default Card