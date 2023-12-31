import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

// tanstack query 
const useCart = () => {
    const { user , loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    // const token = localStorage.getItem('access-token')

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            if (!user) {
                return [];
            }
            const response = await axiosSecure(`/carts?email=${user?.email}`)
            return response.data;
        },
    
    })
    return [cart, refetch, useAxiosSecure]

};

export default useCart;

 // queryFn: async () => {
        //     const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`,{
        //         headers:{
        //             authorization: `bearer ${token}`
        //         }
        //     })
        //     return response.json();
        // },