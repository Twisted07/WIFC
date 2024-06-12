import Button from "../ui/Button";
import Suggestion from "./Suggestion";

function SuggestionList() {
  return (
    <div className="w-[80%]  overflow-y-scroll flex flex-col items-center text-white">
      <div className="  flex gap-[20px] p-[40px] flex-wrap ">
        {Array.from({ length: 6 }).map((_, i) => (
          <Suggestion key={i} />
        ))}
      </div>

      <div className="grow">
        <Button>Suggest</Button>
      </div>
    </div>
  );
}

export default SuggestionList;
