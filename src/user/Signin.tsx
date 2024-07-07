import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "@/services/apiUser";
import MyButton from "@/ui/MyButton";
import { useState } from "react"

function Signin() {
  const [existingUser, setExistingUser] = useState<Boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<Boolean>(false);
  const [reveal, setReveal] = useState<Boolean>(false);

  function handleEmailInput(e : any) {
    setUserEmail(e.target.value);
  }

  function handlePasswordInput(e : any) {
    setPassword(e.target.value);
  }

  function handleNameInput(e : any) {
    setName(e.target.value);
  }

  function confirmPassword(e : any) {
    if (e.target.value !== password) setError(true); return;
    setError(false);
  }

  function toggleReveal() {
    setReveal((r) : any => r = !r);
  }

  function handleSubmit(e : any) {
    e.preventDefault();
    
    if (existingUser) {
      const newObj : IUser = {
        email: userEmail,
        password,
      };
      console.log(newObj, "user already exists");
    
    } else {
      const newObj : IUser = {
        name,
        email: userEmail,
        password,
      };

      console.log(newObj, "This is a new user");
    }
  }

  return (
    <div>
      <h1>Welcome!</h1>
      {existingUser ? (
        <form action="#">
          <div>
            <Label htmlFor="email">Email</Label>
            <FormInput type="email" name="user-email" id="email" value={userEmail} onChange={handleEmailInput} />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <FormInput type={reveal ? ("text") : ("password")} name="user-password" id="password" value={password} onChange={handlePasswordInput} />
            <button type="button" onClick={toggleReveal}>{reveal ? ("Hide") : ("Reveal")}</button>
          </div>

          <MyButton type="submit" onclick={handleSubmit}>Sign in</MyButton>
        </form>
      ) : (
        <form action="#">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <FormInput type="text" name="user-name" id="name" value={name} onChange={handleNameInput} />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <FormInput type="email" name="user-email" id="email" value={userEmail} onChange={handleEmailInput}/>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <FormInput type={reveal ? ("text") : ("password")} name="user-password" id="password" value={password} onChange={handlePasswordInput} />
            <button type="button" onClick={toggleReveal}>{reveal ? ("Hide") : ("Reveal")}</button>
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <FormInput type={reveal ? ("text") : ("password")} name="user-confirm-password" id="confirm-password" onChange={confirmPassword}/>
            
          </div>

          <MyButton type="submit" onclick={handleSubmit}>Create Account</MyButton>
        </form>
      )}

    </div>
  )
}

type TFormInput = {
  type: string,
  name: string,
  id: string,
  value?: any,
  onChange?: any,
}

function FormInput({type, name, id, onChange, value, ...props} : TFormInput) {
  return (
    <Input type={type} name={name} id={id} value={value} onChange={onChange} className="focus:ring-2 focus:ring-offset-2 focus:ring-sky-300" {...props} />
  );
}

export default Signin