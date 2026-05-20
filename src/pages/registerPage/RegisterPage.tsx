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
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { EyeOffIcon, EyeIcon } from "lucide-react"
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import { auth } from "@/lib/fireBase"
import {Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/authSlice"

// import { doc, setDoc } from "firebase/firestore"
// import {  db } from "@/lib/fireBase"

const registerScheme = z.object({
  name: z.string().min(2, { message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak" }),
  email: z.string().email({ message: "Iltimos, to'g'ri email manzilini kiriting" }),
  password: z.string().min(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Parollar bir-biriga mos kelmadi",
  path: ["confirmPassword"],
}); 
type RegisterValues = z.infer<typeof registerScheme>



const RegisterPage = ({ ...props }: React.ComponentProps<typeof Card>) => {
    const [showPassword, setShowPassword] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterValues>({
      resolver: zodResolver(registerScheme),
      defaultValues: { name: "", email: "", password: "", confirmPassword: "" }
    })

    const onSubmit = async (data: RegisterValues) => {
      try{
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
        const user = userCredential.user

        await updateProfile(user, {displayName: data.name})

        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: data.name,
        }))

        // await setDoc(doc(db, "users", user.uid), {
        //   uid: user.uid,
        //   name: data.name,
        //   email: data.email,
        //   createdAt: new Date().toISOString()
        // })

        navigate("/dashboard")

      }catch (error: unknown){
        console.error("Xatolik:", error)
      if (error === "auth/email-already-in-use") {
        alert("Bu email allaqachon ro'yxatdan o'tgan!")
      } else {
        alert("Xatolik yuz berdi: " + error)
      }
      }
    }

    const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider()

      try{
        const result = await signInWithPopup(auth, provider)
        const user = result.user;

        dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
        }));

        navigate("/dashboard");
      }catch (error) {
      console.error("Google login xatosi:", error);}
    }


  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        <Card {...props} className="flex w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden min-h-[560px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-center">Create an account</CardTitle>
        <CardDescription className="flex items-center justify-center">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" {...register("name")} />
              {errors.name && <p className="text-red-500 text-[10px]">{errors.name.message}</p>}
            </Field>
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
            <Field >
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup>
                <InputGroupInput
                id="inline-end-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-[10px]">{errors.password.message}</p>}
                <InputGroupAddon align="inline-end">
                <Button
                    type="button"
                    variant={'ghost'}
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                    >
                    {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
                </Button>
                </InputGroupAddon>
            </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                id="inline-end-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("confirmPassword")}
                />
                {errors.confirmPassword && <p className="text-red-500 text-[10px]">{errors.confirmPassword.message}</p>}
                <InputGroupAddon align="inline-end">
                <Button
                    type="button"
                    variant={'ghost'}
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                    >
                    {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
                </Button>
                </InputGroupAddon>
            </InputGroup>
            </Field>
            <FieldGroup className="mt-5">
              <Field> 
                <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>Create Account</Button>
                <Button variant="outline" type="button" className="cursor-pointer" onClick={handleGoogleLogin}>
                  Sign up with Google
                </Button>
                <FieldDescription className="pt-4 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}

export default RegisterPage
