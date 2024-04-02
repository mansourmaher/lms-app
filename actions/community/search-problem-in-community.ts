"use server"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function searchProblemInCommunity(search: string) {
    const allWords = search.toLowerCase().split(' '); // Convert to lowercase and split into words

    // console.log("Searching for posts containing any of the following words: ", allWords);
    const allwordUpercase= allWords.map(word => word.toUpperCase());
    const allwordLowercase= allWords.map(word => word.toLowerCase());
    const wordUpercaseAndLowercase= allwordUpercase.concat(allwordLowercase);

    
    const postsContainingWords = await db.post.findMany({
        where: {
            OR: wordUpercaseAndLowercase.map(word => ({
                content: {
                    contains: word
                }
            }))
        },
        select: {
            id: true,
            content: true,
            communityId: true,
        }
    });

    if (!postsContainingWords || postsContainingWords.length === 0) {
        console.log("No posts found containing any of the specified words");
        return null;
    }

    
    const postsWithMatchCount = postsContainingWords.map(post => ({
        ...post,
        matchCount: allWords.filter(word => post.content.toLowerCase().includes(word)).length
    }));

    
    const maxMatchCountPost = postsWithMatchCount.reduce((maxPost, currentPost) => {
        return currentPost.matchCount > maxPost.matchCount ? currentPost : maxPost;
    });

    

    const url = `/community/${maxMatchCountPost.communityId}post${maxMatchCountPost.id}`;

    return redirect(url);
}
