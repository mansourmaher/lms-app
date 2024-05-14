import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handelAuth=()=>{
    const userId="mpasas"
    if(!userId) throw new Error("You must be signed in to access this route")
    return {userId};
}
 

export const ourFileRouter = {
    courseImage:f({image:{maxFileSize:"4MB",maxFileCount:1}})
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    courseAttachment:f(["text","image","video","audio","pdf"])
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    chapterVideo:f({video:{maxFileSize:"512GB",maxFileCount:1}})
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    teacherAccess:f({
        image:{maxFileSize:"4MB",maxFileCount:1},
        "pdf":{maxFileSize:"512GB",maxFileCount:1},
    }).middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    postImage:f({
        image:{maxFileSize:"4MB",maxFileCount:1},
       
    }).middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    chapterTodo:f({
        image:{maxFileSize:"4MB",maxFileCount:1},
        "pdf":{maxFileSize:"512GB",maxFileCount:1},
        
       
    }).middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    compteRendu:f({
        "pdf":{maxFileSize:"512GB",maxFileCount:1},
    }).middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;