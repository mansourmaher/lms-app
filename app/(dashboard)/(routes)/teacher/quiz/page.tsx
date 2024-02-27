// 'use client'
// import React, { use, useEffect, useState } from 'react'
// import {OpenAI} from "@langchain/openai"
// import {BufferMemory} from "langchain/memory"
// import {ConversationChain} from "langchain/chains"

// const page = () => {
//     const model =new OpenAI({
//         openAIApiKey:"sk-PVvWcU3MVzXfsvOhKbJXi6gszvsXmcpSkV5vKCg82rr8dYRs",
//         temperature:0.9,
//     })
//     const memory=new BufferMemory();
//     const chain=new ConversationChain({
//        llm: model,
//        memory: memory,
//     })
    
//     const categories=[
//         {label:"Math",value:"math"},
//         {label:"Science",value:"science"},
//         {label:"History",value:"history"},
//         {label:"English",value:"english"},
//         {label:"Computer Science",value:"cs"},
//     ]
//     const [input,setInput]=React.useState("");
//     const [response,setResponse]=useState("");
//     const [category,setCategory]=React.useState(categories[0].value);

//     const run=async(input:string)=>{
//         const response=await chain.call({
//             input:input,
            
//         })
//         return response.response;
//     }

//     const askFirstQuestion=async()=>{
//         const firstquestion=await run(
//             `ask a trivia question in the  ${category} category?`
//         )
//         setResponse(firstquestion);
//     }

//     useEffect(()=>{
//         if(category){
//             askFirstQuestion();
//         }
//     },[category])
//     const handlerSubmit=async(e:React.FormEvent)=>{
        
//         const result=await run(
//             `AI: ${response}\nYou: ${input}nAI:Evaluate the answer and ask another trivia question`

//         )
//         setResponse(result);
//         setInput("");

//         }
    
//   return (
//     <div>
//         <form onSubmit={handlerSubmit}>
//             <select
//             className='border p-2 m-3 flex'
//                 value={category}
//                 onChange={(e)=>setCategory(e.target.value)}
//             >
//                 {categories.map((category)=>(
//                     <option value={category.value}>{category.label}</option>
//                 ))}
//             </select>
//             <input
//                 type="text"
//                 value={input}
//                 onChange={(e)=>setInput(e.target.value)}
//             />
//             <button type="submit">Ask</button>

//                         </form>
//         </div>
    

//   )
//     }


// export default page

