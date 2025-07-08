import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modal/ConfirmModal";
import { DelAllModal } from "@/components/modal/DelAllModal";
import { addWishlist, decremented, DelAllInCart, incremented } from "@/redux/slices/authSlice";
import { formatPrice } from "@/utils";
import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const CartPage = () => {
  const dispatch = useDispatch()
  const cart = useSelector((s) => s.all.cart)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenDel, setModalOpenDel] = useState(false)
  const [selected, setSelected] = useState(null)

  const toggleOpen = () => {
    setModalOpen(prev => !prev)
  }
  const toggleOpenAll = () => {
    setModalOpenDel(prev => !prev)
  }
  const handleDeleteProduct = (product) => {
    setSelected(product)
    toggleOpen()
  };

  const wishlist = useSelector((s) => s.all.wishList);
  console.log(wishlist);

  const handleToWishlist = (product) => {
    dispatch(addWishlist(product));
    const exist = wishlist.find((i) => i.id === product.id);
    if (exist) {
      toast.info(`${product.name} removed from wishlist`);
    } else {
      toast.success(`${product.name} added to wishlist`);
    }
  };
  const value = useSelector((s) => s.all.value)
  return (
    <div className="container">
      <div className="relative">
        <p className="text-3xl font-semibold text-center my-4">Products in Cart:</p>
        {cart.length !== 0 &&
          <Button onClick={toggleOpenAll} className='absolute top-0 right-0' variant={'destructive'}>Delete All</Button>}
      </div>
      {cart.length !== 0 ?
        <div className="grid grid-rows-4 gap-4">
          {cart?.map((item) => {
            const isWished = wishlist?.find((i) => i.id === item.id);

            return (
              <div
                key={item.id}
                className="flex items-center  bg-white shadow-md rounded-md border border-gray-200 group"
              >
                <div className="h-[300px] w-[35%] overflow-hidden">
                  <img
                    src={item?.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 duration-300 transition-transform"
                  />
                </div>
                <div className="flex flex-col justify-between h-full w-[63%] p-4 my-1">
                  <h3 className="mb-3">{item.name}</h3>
                  <p className="line-clamp-2 ">{item.description}</p>
                  <div className="flex items-center justify-between mt-5">
                    <strong>{formatPrice(item.price)}</strong>
                    <span>{item.inStock} шт</span>
                  </div>
                  <div className="flex justify-end items-center gap-5 mt-15 container mx-auto">
                    <Button
                    variant={'outline'}
                      disabled={item.quantity === 50}
                      className="cursor-pointer px-4 py-2 bg-black rounded-md font-bold"
                      onClick={() => dispatch(incremented(item.id))}
                    >
                      <Plus/>
                    </Button>
                    <p className='text-xl font-bold w-5 text-center'>{item.quantity}</p>
                    <Button
                    variant={'outline'}
                      disabled={item.quantity === 1}
                      className="cursor-pointer px-4 py-2 bg-black rounded-md font-bold"
                      onClick={() => dispatch(decremented(item.id))}
                    >
                      <Minus />
                    </Button>
                  </div>
                  <div className="mt-10 flex justify-between">
                    <Button variant={'destructive'} onClick={() => handleDeleteProduct(item)}>
                      Delete
                    </Button >
                    <Button variant={'custom'} size={'icon'} onClick={() => handleToWishlist(item)}>{
                      isWished ?
                        <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z" /></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825" /></svg>
                    }</Button>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div> :
        <div className='flex justify-center items-center py-50'>
          <p className='text-center text-2xl font-semibold'>No products in Cart. <br /> Back to <Link className='' to={'/'}><Button variant={'outline'}>Home</Button></Link> </p>
        </div>}
      {modalOpen && (
        <ConfirmModal open={modalOpen} toggleOpen={toggleOpen} item={selected} />
      )}
      {modalOpenDel && (
        <DelAllModal open={modalOpenDel} toggleOpen={toggleOpenAll} fn={DelAllInCart} />
      )}
    </div>
  )
}

export default CartPage