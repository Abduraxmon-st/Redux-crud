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
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export const DelAllModal = ({ open, toggleOpen, fn }) => {
   const dispatch = useDispatch()
   const del = () => {
      dispatch(fn());
      toast.success('All Products Deleted');
      toggleOpen()
   }
   return (
      <Dialog open={open} onOpenChange={toggleOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Are you sure deleting All Products ?</DialogTitle>
               <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
               </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
               <DialogClose asChild>
                  <Button type="button" variant="ghost">
                     Close
                  </Button>
               </DialogClose>
               <Button variant={'destructive'} className='hover:bg-red-700' onClick={del}>Delete</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
