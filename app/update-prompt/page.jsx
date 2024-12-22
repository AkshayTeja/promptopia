"use client";

import React, { useEffect,useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams=useSearchParams();
  const promptId=searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data= await response.json();

        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })
    }
    if(promptId)
        getPromptDetails()
  },[promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        }),
      });

      if (response.ok) {
        // Add these lines for debugging
        console.log('Response was successful');
        router.push('/');
        // Force a reload/refresh of the page
        router.refresh();
      } else {
        // Add error handling
        console.error('Submission failed:', await response.text());
      }
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};



export default UpdatePrompt;