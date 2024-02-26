import { useSession } from 'next-auth/react';

export const getCurrentUser=()=>{
    const user=useSession();
    return user.data?.user;
}