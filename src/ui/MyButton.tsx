import { Button } from "@/components/ui/button"

function MyButton({className, onclick, children} : any) {
  return (
    <Button className={className} onClick={onclick}>{children}</Button>
  )
}

export default MyButton