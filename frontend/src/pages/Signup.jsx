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
import  {Link}  from "react-router";


export default function Signup() {
  return (
    <div className="min-h-screen flex w-full justify-center items-center bg-slate-900">
      <Card className="w-full max-w-sm bg-[#3b82f6] text-[#1a293b]">
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription className="text-[#1a293b]">
            Enter your email below to create a new account
          </CardDescription>
          <CardAction>
            <Link to="/login">Login</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
               <div className="grid gap-2">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="wander123"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullname">full name</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Wanderer"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                 
                </div>
                <Input className="placeholder:text-red-500" id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">confirm Password</Label>
                 
                </div>
                <Input className="placeholder:text-red-500" id="confirm-password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile">profile picture</Label>
                <Input
                  id="profile"
                  type="file"
                  placeholder="wander123"
                  required
                />
              </div>
              
            </div>
            
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Register
          </Button>
     
        </CardFooter>
      </Card>
    </div>
  );
}
