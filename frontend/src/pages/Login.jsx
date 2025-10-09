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
import { motion } from "framer-motion";
import { authContext } from "../context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert.jsx"
import { AlertCircle, Sparkles, Eye, EyeOff } from "lucide-react"
import { errorContext } from "../context/ErrorContext";

export default function Login() {
  const navigate = useNavigate()
  const {login} = useContext(authContext)
  const {error,validationErrors} = useContext(errorContext)
  const [formData,setFormData] = useState({credential:'',password:''})
  const [showPassword, setShowPassword] = useState(false)

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
    <div className="min-h-screen flex w-full justify-center items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 modern-pattern">
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
              <CardTitle className="text-2xl modern-title text-gray-900">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600 modern-subtitle mt-2">
                Sign in to your account to continue
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
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
                  <Label htmlFor="credential" className="modern-subtitle text-gray-700">Username / Email</Label>
                  <Input
                    id='credential'
                    type='text'
                    placeholder="Enter your username or email"
                    required
                    name='credential'
                    value={formData.credential}
                    onChange={handleChange}
                    className="modern-input"
                  />
                  {renderFieldError('credential')}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid gap-2"
                >
                  <div className="flex items-center">
                    <Label htmlFor="password" className="modern-subtitle text-gray-700">Password</Label>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href="#"
                      className="ml-auto inline-block text-sm text-indigo-600 hover:text-indigo-700 modern-subtitle underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </motion.a>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      name='password' 
                      value={formData.password} 
                      required 
                      onChange={handleChange}
                      placeholder="Enter your password"
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
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="w-full"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full modern-button text-white modern-subtitle" 
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full modern-card border border-gray-200 text-gray-700 hover:text-indigo-600 modern-subtitle">
                  Continue with Google
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mt-4"
            >
              <p className="text-gray-600 modern-subtitle">
                Don't have an account?{' '}
                <motion.span whileHover={{ scale: 1.05 }}>
                  <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium modern-subtitle">
                    Sign up
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
