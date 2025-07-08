import Loading from '@/components/loading/Loading';
import { AuthModal } from '@/components/modal/AuthModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORY } from '@/constants';
import { useDebounce } from '@/hooks/debounce';
import { useGetData } from '@/hooks/fetch-data';
import { addToCart, addWishlist } from '@/redux/slices/authSlice';
import { formatPrice } from '@/utils';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data: categoryData, isLoading, error } = useGetData(CATEGORY, page, 'name', debouncedSearch);
  const auth = useSelector((s) => s.all.auth);
  const dispatch = useDispatch();

  const handleToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  const wishlist = useSelector((s) => s.all.wishList);
  console.log("wishlist:", wishlist);

  const handleToWishlist = (product) => {
    dispatch(addWishlist(product));
    const exist = wishlist.find((i) => i.id === product.id);
    if (exist) {
      toast.info(`${product.name} removed from wishlist`);
    } else {
      toast.success(`${product.name} added to wishlist`);
    }
  };
  const [modalOpen, setModalOpen] = useState(false);

  const toggleOpen = () => {
    setModalOpen(prev => !prev)
  }
  console.log(categoryData);

  return (
    <div className="py-10">
      <div className='container relative flex justify-end mb-10'>
        <Input
          type="text"
          placeholder="Поиск товара..."
          className="w-max pr-7"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className='absolute right-2 top-2' size={20} />
      </div>
      {error?.response?.status === 404 && (
        <div className="text-center text-gray-400 font-semibold text-3xl">
          product not found
        </div>
      )}
      {isLoading ? (
        <div className='w-full h-screen flex justify-center items-center'>
          <Loading />
        </div>
      ) : (
        <div className="container">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {categoryData?.map((item) => {
              const isWished = wishlist?.find((i) => i.id === item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white pb-4 shadow-md rounded-md border border-gray-200 group"
                >
                  <div className="h-[180px] w-full overflow-hidden">
                    <img
                      src={item?.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 duration-300 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col px-4 my-1">
                    <h3 className="mb-3">{item.name}</h3>
                    <p className="line-clamp-2 ">{item.description}</p>
                    <div className="flex items-center justify-between mt-5">
                      <strong>{formatPrice(item.price)}</strong>
                      <span>{item.inStock} шт</span>
                    </div>

                    <div className="mt-10 flex justify-between">
                      <Button onClick={auth ? () => handleToCart(item) : () => setModalOpen(true)}>
                        Add To Cart
                      </Button>
                      <Button variant={'custom'} size={'icon'} onClick={auth ? () => handleToWishlist(item) : () => setModalOpen(true)}>{
                        auth &&
                          isWished ?
                          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z" /></svg>
                          : <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825" /></svg>
                      }</Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {modalOpen && <AuthModal open={modalOpen} toggleOpen={toggleOpen} />}
        </div>
      )}<div className="flex justify-end items-center gap-5 mt-15 container mx-auto">
        <Button
          disabled={page === 1}
          className="cursor-pointer px-4 py-2 bg-black text-white rounded-md font-bold"
          onClick={() => setPage(page > 1 ? page - 1 : page)}
        >
          Ortga
        </Button>
        <p className='text-xl font-bold'>{page}</p>
        <Button
          className="cursor-pointer px-4 py-2 bg-black text-white rounded-md font-bold"
          onClick={() => setPage(page + 1)}
        >
          Keyingi
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
