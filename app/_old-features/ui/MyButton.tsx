import { Button } from "@/components/ui/button"

function MyButton({className, onclick, children, hidden} : any) {
  return (
    <Button className={className} onClick={onclick} hidden={hidden}>{children}</Button>
  )
}

export default MyButton