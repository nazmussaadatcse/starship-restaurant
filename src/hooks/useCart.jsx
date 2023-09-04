import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';
// tanstack query 
const useCart = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    // const token = localStorage.getItem('access-token')

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            if (!user) {
                return [];
            }
            const response = await axiosSecure(`/carts?email=${user?.email}`)
            return response.data;
        },
        // queryFn: async () => {
        //     const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`,{
        //         headers:{
        //             authorization: `bearer ${token}`
        //         }
        //     })
        //     return response.json();
        // },
    })
    return [cart, refetch, useAxiosSecure]

};

export default useCart;