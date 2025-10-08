import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import  {Link, useNavigate}  from "react-router";
import { authContext } from "../context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert.jsx"
import { AlertCircle } from "lucide-react"
import { errorContext } from "../context/ErrorContext";

export default function Login() {
  const navigate = useNavigate()
  const {login} = useContext(authContext)
  const {error,validationErrors} = useContext(errorContext)
  const [formData,setFormData] = useState({credential:'',password:''})

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const user = await login(formData)
      if(user) navigate('/explore')
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const renderFieldError = (field) => {
    if(validationErrors[field]){
          console.log(validationErrors[field]);
      return (<p className="text-sm text-red-500 mt-1">
          {validationErrors[field]}
        </p>)
        
    }
    return null;
  }

  return (
    <div className="min-h-screen flex w-full justify-center items-center bg-slate-900">
      <Card className="w-full max-w-sm bg-[#a855f7] text-[#1a293b]">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription className="text-[#1a293b]">
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/signup">Sign-up</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
               {error && (
            <Alert variant="destructive" className="mb-4 border-0" >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
              <div className="grid gap-2">
                <Label htmlFor="email">Username / Email</Label>
                <Input
                  id='credential'
                  type='text'
                  placeholder="username / email"
                  required
                  name='credential'
                  value = {formData.credential}
                  onChange={handleChange}
                />
                {renderFieldError('credential')}

              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input className="placeholder:text-red-500" id="password" type="password" name='password' value={formData.password} required onChange={handleChange}/>
                {renderFieldError('password')}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
