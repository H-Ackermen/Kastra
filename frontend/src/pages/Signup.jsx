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
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert.jsx";
import { AlertCircle, Sparkles, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div className="min-h-screen flex w-full justify-center items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 modern-pattern py-8">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="modern-card border border-gray-200 shadow-xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <div className="w-10 h-10 modern-gradient rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold modern-text modern-title">Kastra</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-2xl modern-title text-gray-900">Create Account</CardTitle>
              <CardDescription className="text-gray-600 modern-subtitle mt-2">
                Join our creative community today
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Alert variant="destructive" className="modern-card border border-red-200">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="modern-subtitle">{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid gap-2"
                >
                  <Label htmlFor="username" className="modern-subtitle text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a unique username"
                    value={formData.username}
                    required
                    name="username"
                    onChange={handleChange}
                    className="modern-input"
                  />
                  {renderFieldError('username')}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid gap-2"
                >
                  <Label htmlFor="fullname" className="modern-subtitle text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    required
                    name="name"
                    onChange={handleChange}
                    className="modern-input"
                  />
                  {renderFieldError('name')}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid gap-2"
                >
                  <Label htmlFor="email" className="modern-subtitle text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    className="modern-input"
                  />
                  {renderFieldError('email')}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="grid gap-2"
                >
                  <Label htmlFor="password" className="modern-subtitle text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      name="password"
                      onChange={handleChange}
                      autoComplete="new-password"
                      value={formData.password}
                      placeholder="Create a strong password"
                      className="modern-input pr-10"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  {renderFieldError('password')}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid gap-2"
                >
                  <Label htmlFor="confirmPassword" className="modern-subtitle text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      name="confirmPassword"
                      onChange={handleChange}
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      placeholder="Confirm your password"
                      className="modern-input pr-10"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  {renderFieldError('confirmPassword')}
                </motion.div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="w-full"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full modern-button text-white modern-subtitle" 
                  onClick={handleSubmit}
                >
                  Create Account
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center mt-4"
            >
              <p className="text-gray-600 modern-subtitle">
                Already have an account?{' '}
                <motion.span whileHover={{ scale: 1.05 }}>
                  <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium modern-subtitle">
                    Sign in
                  </Link>
                </motion.span>
              </p>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
