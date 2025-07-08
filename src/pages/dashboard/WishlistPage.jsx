import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, DelAllInWishlist, removeWishProduct } from "@/redux/slices/authSlice";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { DelAllModal } from '@/components/modal/DelAllModal';


export const WishlistPage = () => {
  const wishlist = useSelector((s) => s.all.wishList);
  const dispatch = useDispatch()
  const handleDeletePr = (id, name) => {
    dispatch(removeWishProduct(id))
    toast.success(`deleted product ${name} from Wishlist`)
  }
  const [modalOpenDel, setModalOpenDel] = useState(false)

  const toggleOpenAll = () => {
    setModalOpenDel(prev => !prev)
    console.log('l');
  }

  const handleToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };
  return (
    <div className="container">
      <div className="relative">
        <p className="text-3xl font-semibold text-center my-4">Products in Wishlist:</p>
        {wishlist.length !== 0 &&
          <Button onClick={toggleOpenAll} className='absolute top-0 right-0' variant={'destructive'}>Delete All</Button>}
      </div>

      {wishlist.length !== 0 ?
        <div className="grid grid-rows-4 gap-4">
          {wishlist?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md rounded-md border border-gray-200 group"
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

                <div className="mt-10 flex justify-between">
                  <Button variant={'destructive'} onClick={() => handleDeletePr(item.id, item.name)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleToCart(item)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div> :
        <div className='flex justify-center items-center py-50'>
          <p className='text-center text-2xl font-semibold'>No products in Wishlist. <br /> Back to <Link className='' to={'/'}><Button variant={'outline'}>Home</Button></Link> </p>
        </div>}
      {modalOpenDel && (
        <DelAllModal open={modalOpenDel} toggleOpen={toggleOpenAll} fn={DelAllInWishlist} />
      )}
    </div>
  )
}
