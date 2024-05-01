import React from 'react'
import { ConversationHeader } from '../_components/conversation-header';
import { ConversationBody } from '../_components/conversation-body';
import { ConversationForm } from '../_components/conversation-form';
import { auth } from '@/auth';
import { isuserpurchasedthecourseconversationId } from '@/actions/conversation/isuserpurchasedthecourseconversations';
import { getMessages } from '@/actions/conversation/getmessages';
import { getTheTeacherFromConversationId } from '@/actions/conversation/gettheteacherfromconversationid';

interface PageProps {
    params: {
        conversationId: string;
    };
  }
  
const  Page=async({ params }: PageProps)=> {
    const user=await auth();
    const ispurchasedthecourse=await isuserpurchasedthecourseconversationId(params.conversationId)
    const messages = await getMessages(params.conversationId);
    const teacher=await getTheTeacherFromConversationId(params.conversationId)
    return (
        <div className="h-screen bg-secondary">
          <div className="flex h-full flex-col">
            
            <ConversationHeader conversationId={params.conversationId} currentUser={user} />
            <ConversationBody conversationId={params.conversationId} currentUser={user} ispurchased={ispurchasedthecourse} messages={messages} teacher={teacher} />
            <ConversationForm conversationId={params.conversationId} />
          </div>
        </div>
      );
}
export default Page;

