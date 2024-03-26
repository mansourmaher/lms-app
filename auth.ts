import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { Prisma } from '@prisma/client';
import { db } from './lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getUserByEmail, getUserById } from './data/user';
export const {
    handlers:{GET,POST},
    auth,
    signIn,
    signOut,
   

}=NextAuth({
    pages:{
        signIn:'/sign-in',
        error:'/error',
    },
    events:{
        async linkAccount({user})
        {
            await db.user.update({
                where:{
                    id:user.id
                },
                data:{
                    emailVerified:new Date()
                }
            

            })
        }
    },

    callbacks:{
       async signIn({user,account})
       {
        
        
        if(account?.provider !=="credentials")return true;
       
        const existingUser=await getUserById(user.id as string);
        if(!existingUser) return false;
        if(!existingUser.emailVerified) return false;

        return true
       },
      // @ts-ignore
        async session({token,session})
        {
            
           
            if(token.sub && session.user)
            {
                session.user.id=token.sub
            }
            if(token.role && session.user)
            {
                session.user.role=token.role
            }
            
                session.user.teacherAccess = token.teacherAccess;  
                session.user.DateOfBirth = token.DateOfBirth;
                session.user.filier = token.filier;
                session.user.origin = token.origin;
                session.user.image = token.image;
                session.user.createdAt = token.createdAt;
                session.user.about = token.about;
                session.user.patients = token.patients;
                session.user.subtitle = token.subtitle;
                session.user.password = token.password;
                session.user.points = token.points;
                session.user.linkedin = token.linkedin;
                session.user.github = token.github;
                session.user.twitter = token.twitter;
              
                

                  
             
            return session
        },
        async jwt({token})
        {
            
            if(!token.sub) 
            return token
        const existingUser=await getUserById(token.sub)
        if(!existingUser) return token
        token.role=existingUser.role
        token.teacherAccess=existingUser.teacherAccess
        token.DateOfBirth=existingUser.DateOfBirth
        token.filier=existingUser.filier
        
        token.image=existingUser.image
        token.createdAt=existingUser.createdAt
        token.about=existingUser.about
        token.origin=existingUser.origin
        token.patients=existingUser.patiants
        token.subtitle=existingUser.subtitle
        token.password=existingUser.password
        token.points=existingUser.points
        token.linkedin=existingUser.linkedin
        token.github=existingUser.github
        token.twitter=existingUser.twitter
        
        
        
        return token

        
        
        }
    },
    // @ts-ignore
    adapter:PrismaAdapter(db),
    
    session:{strategy:'jwt'},

    ...authConfig,

    
})