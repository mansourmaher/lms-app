"use client"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation'
import React from 'react'

function StudetnBtn() {
    const router = useRouter();
  return (
    <DropdownMenuItem onClick={() => router.push("/")}>
      Switch to Student
    </DropdownMenuItem>
  );
}

export default StudetnBtn