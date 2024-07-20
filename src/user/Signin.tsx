import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlobalContext } from "@/context";
import { IUser, createUser, getUser, getUsers } from "@/services/apiUser";
import MyButton from "@/ui/MyButton";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

function Signin() {
  const [existingUser, setExistingUser] = useState<Boolean | undefined>(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<Boolean>(false);
  const [reveal, setReveal] = useState<Boolean>(false);
  const [signedIn, setSignedIn] = useState<Boolean>(false);
  const navigate = useNavigate();

  const { setUser } = useContext(GlobalContext);


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

  function handleSignInSubmit(e : any) {
    e.preventDefault();

    // Check if the email entered exists in the users table
    const check = Users?.some((user: IUser) => user.email === userEmail);

    if (!check) {
      setExistingUser(false);
      setPassword("");

      return;
    }

    const userData = Users?.find((user: IUser) => user.email === userEmail);
    // Validate password
    if (password !== userData.password) {
      setError(true);
      return;
    }
    
    setError(false);
    setSignedIn(true);
  }


  function handleSignUpSubmit(e : any) {
    e.preventDefault();

    const newObj : IUser = {
      name,
      email: userEmail,
      password,
    };

    createUser(newObj);
    setSignedIn(true);
  }

  if (signedIn) {
    const {isLoading: userLoading, data: currentUser, error: userError} = useQuery({
      queryKey: ['user'],
      queryFn: () => getUser(userEmail),
    });

    if (userLoading) return <h1>Signing In...</h1>

    if (currentUser) {
      setUser(currentUser);
      navigate('/');
    }
  }


  const {isLoading, data: Users, error: fetchUserError} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });



  return (
    <div className="flex justify-center flex-col items-center my-16 gap-24">
      <h1 className="text-4xl">Welcome!</h1>
      {existingUser ? (
        <form action="#" className="w-[40vw]">
          <div className="space-y-3">
            <div>
              <Label htmlFor="email">Email</Label>
              <FormInput type="email" name="user-email" id="email" value={userEmail} onChange={handleEmailInput} />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <FormInput type={reveal ? ("text") : ("password")} name="user-password" id="password" value={password} onChange={handlePasswordInput} />
                <button className="absolute top-[25%] right-3 text-sm" type="button" onClick={toggleReveal}>{reveal ? ("Hide") : ("Reveal")}</button>
              </div>
              {error ? (<span>This password is incorrect</span>) : null}
            </div>
          </div>

          <MyButton type="submit" className="w-full mt-10" onclick={handleSignInSubmit}>Sign in</MyButton>
        </form>
      ) : (
        
        <form action="#" className="w-[40vw]">
          <div className="space-y-3">

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
              <div className="relative">
                <FormInput type={reveal ? ("text") : ("password")} name="user-password" id="password" value={password} onChange={handlePasswordInput} />
                <button className="absolute top-[25%] right-3 text-sm" type="button" onClick={toggleReveal}>{reveal ? ("Hide") : ("Reveal")}</button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <FormInput type={reveal ? ("text") : ("password")} name="user-confirm-password" id="confirm-password" onChange={confirmPassword}/>
                <button className="absolute top-[25%] right-3 text-sm" type="button" onClick={toggleReveal}>{reveal ? ("Hide") : ("Reveal")}</button>
              </div> 
            </div>

          </div>

          <MyButton type="submit" className="w-full mt-10" onclick={handleSignUpSubmit}>Create Account</MyButton>
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