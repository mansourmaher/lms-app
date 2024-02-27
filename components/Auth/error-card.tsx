import { Header } from "./Header";
import { BackButton } from "./Backbutton";

import {
    Card,
    CardFooter,
    CardHeader
}from '@/components/ui/card'


export const ErrorCard=()=>{
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <Card className="w-full md:w-1/2 lg:w-1/3">
                <CardHeader>
                    
                    <Header label="Error"/>
                </CardHeader>
                <div className="p-4">
                    <p className="text-center text-gray-600">
                        Something went wrong. Please try again later
                    </p>
                </div>
                <CardFooter>
                    <BackButton
                    label="Back to login"
                    href='/sign-in'
                     />
                </CardFooter>
            </Card>
        </div>
    )
}
