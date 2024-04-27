import React from 'react'
import { ConversationHeader } from '../_components/conversation-header';
import { ConversationBody } from '../_components/conversation-body';
import { ConversationForm } from '../_components/conversation-form';
import { auth } from '@/auth';

interface PageProps {
    params: {
        conversationId: string;
    };
  }
  
const  Page=async({ params }: PageProps)=> {
    const user=await auth();
    return (
        <div className="h-screen bg-secondary">
          <div className="flex h-full flex-col">
            <ConversationHeader conversationId={params.conversationId} currentUser={user} />
            <ConversationBody conversationId={params.conversationId} currentUser={user} />
            <ConversationForm conversationId={params.conversationId} />
          </div>
        </div>
      );
}
export default Page;

