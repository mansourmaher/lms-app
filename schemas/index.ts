import * as z from 'zod';


export const LoginSchema = z.object({
    email: z.string().email({message: "Please enter a valid email"}),
    
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"

    })
})
export const RegisterSchema = z.object({
    email: z.string().email({message: "Please enter a valid email"}),
    
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"

    }),
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long"

}),
    role: z.string().min(0, {
        message: "Please select a role"
    })


})

export const ResetSchema=z.object({
    email:z.string().email({message:"Please enter a valid email"})
})

export const NewPasswordSchema=z.object({
    password:z.string().min(6,{message:"Password must be at least 6 characters long"})
})

export const ProfileSchema=z.object({
    date:z.date().refine((date)=>date!==undefined,{message:"Please select a date"}),
    optionSelected:z.string().min(0,{message:"Please select you filiers "}).optional(),
    about:z.string().min(0,{message:"Please enter a valid about"}),
    imageUrl:z.string().min(1,{message:"Please enter a valid image url"}),
    country: z.object({
        value: z.string().min(0, { message: "Please select a country" }),
        label: z.string().min(0, { message: "Please select a country" }),
        flag: z.string().min(0, { message: "Please select a country" }),
        region: z.string().min(0, { message: "Please select a country" }),
        lalng: z.array(z.number()).min(0, { message: "Please select a country" })
    
    }).optional(),
    subtitle:z.string().min(0,{message:"Please enter a valid subtitle"}).optional(),
    patients:z.array(z.string()).min(0,{message:"Please select a patient"}).optional(),
    linkedin:z.string().min(0,{message:"Please enter a valid linkedin"}).optional(),
    github:z.string().min(0,{message:"Please enter a valid github"}).optional(),
    twitter:z.string().min(0,{message:"Please enter a valid twitter"}).optional()
    
})

export const QuizSchema=z.object({
    question:z.string().min(1,{message:"Please enter a question"}),
    option1:z.string().min(1,{message:"Please enter option 1"}),
    option2:z.string().min(1,{message:"Please enter option 2"}),
    option3:z.string().min(1,{message:"Please enter option 3"}),
    option4:z.string().min(1,{message:"Please enter option 4"}),
    
})

export const ChangePasswordSchema=z.object({
    oldPassword:z.string().min(6,{message:"Password must be at least 6 characters long"}),
    newPassword:z.string().min(6,{message:"Password must be at least 6 characters long"}),
    confirmNewPassword:z.string().min(6,{message:"Password must be at least 6 characters long"})
})

export const RejectCourseSchema=z.object({
    reason:z.string().min(1,{message:" Without a reason, you can't reject the course. Please enter a reason"})
    

})



