import React from 'react'
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const AuthModal = ({ open, toggleOpen }) => {

   return (
      <Dialog open={open} onOpenChange={toggleOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>You must be Logined to use this option</DialogTitle>
               <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
               </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end items-center">
               <DialogClose asChild>
                  <Button type="button" variant="ghost">
                     Close
                  </Button>
               </DialogClose>
               <Link to={'/auth/signin'}><Button variant={'outline'}>Sign In</Button></Link>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
