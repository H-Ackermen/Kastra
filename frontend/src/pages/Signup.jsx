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
import { Link, useNavigate } from "react-router";
import { Alert, AlertDescription } from "@/components/ui/alert.jsx";
import { AlertCircle } from "lucide-react";
import { authContext } from "../context/AuthContext";
import { errorContext } from "../context/ErrorContext";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useContext(authContext);
  const { error, validationErrors, setValidationErrors } =  useContext(errorContext);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const renderFieldError = (field) => {
    if (validationErrors[field]) {
      console.log(validationErrors[field]);
      return (
        <p className="text-sm text-red-500 mt-1">{validationErrors[field]}</p>
      );
    }
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors?.confirmPassword) {
    setValidationErrors({ ...validationErrors, confirmPassword: null });
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        setValidationErrors({
          ...validationErrors,
          confirmPassword: "Passwords do not match",
        });
        return; // stop submission
      }
      const user = await register(formData);
      if (user) navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

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
              {error && (
                <Alert variant="destructive" className="mb-4 border-0">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={formData.username}
                  required
                  name="username"
                  onChange={handleChange}
                />
                {renderFieldError('username')}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullname">full name</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  required
                  name="name"
                  onChange={handleChange}
                />
                {renderFieldError('name')}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
                {renderFieldError('email')}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  className="placeholder:text-red-500"
                  id="password"
                  type="password"
                  required
                  name="password"
                  onChange={handleChange}
                    autoComplete="new-password"
                  value={formData.password}
                />
                {renderFieldError('password')}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">confirm Password</Label>
                </div>
                <Input
                  className="placeholder:text-red-500"
                  id="confirmPassword"
                  type="password"
                  required
                  name="confirmPassword"
                  onChange={handleChange}
                    autoComplete="new-password"
                  value={formData.confirmPassword}
                />
                {renderFieldError('confirmPassword')}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
