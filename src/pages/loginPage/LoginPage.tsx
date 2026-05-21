import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { EyeOffIcon, EyeIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from "firebase/auth"
import { auth } from "@/lib/fireBase"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/authSlice"

const registerScheme = z.object({
  email: z.string().email({ message: "Iltimos, to'g'ri email manzilini kiriting" }),
  password: z.string().min(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" }),
})
type RegisterValues = z.infer<typeof registerScheme>


const LoginPage = ({className, ...props}: React.ComponentProps<"div">) => {
    const [showPassword, setShowPassword] = useState(false) 
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterValues>({
        resolver: zodResolver(registerScheme),
        defaultValues: { email: "", password: "" }
      })

    const onSubmit = async (data: RegisterValues) => {

      try{
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
        const user = userCredential.user

        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }))

        navigate("/dashboard")
        
      }catch(error: unknown){

      let errorMessage = "Email yoki parol noto'g'ri!";
      
      switch (error) {
        case "auth/user-not-found":
          errorMessage = "Bunday foydalanuvchi topilmadi!";
          break;
        case "auth/wrong-password":
          errorMessage = "Parol noto'g'ri!";
          break;
        case "auth/invalid-credential":
          errorMessage = "Email yoki parol xato!";
          break;
        case "auth/too-many-requests":
          errorMessage = "Urinishlar ko'payib ketdi. Birozdan so'ng harakat qiling!";
          break;
        case "auth/network-request-failed":
          errorMessage = "Internet aloqasini tekshiring!";
          break;
      }
      alert(errorMessage);
      }
    }  


    const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider()

      try{
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }))

        navigate("/dashboard")
      }catch (error) {
      console.error("Google login xatosi:", error);}
    }


  return (
    <div className="flex min-h-screen w-full items-center justify-center ">
        <div className={cn("flex flex-col gap-6 w-full max-w-xl", className)} {...props}>
      <Card className="flex w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">Login to your account</CardTitle>
          <CardDescription className="flex items-center justify-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <InputGroup>
                <InputGroupInput
                id="inline-end-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-[10px]">{errors.password.message}</p>}
                <InputGroupAddon align="inline-end">
                <Button size={"icon-xs"} type="button" variant={'ghost'} onClick={() => setShowPassword(!showPassword)} >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon/>}
                </Button>
                </InputGroupAddon>
            </InputGroup>
              </Field>
              <Field className="mt-3 mb-3">
                <Button type="submit" disabled={isSubmitting}>Login</Button>
                <Button variant="outline" type="button" onClick={handleGoogleLogin}>
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

export default LoginPage