import { Helmet } from 'react-helmet-async';
import useCart from '../../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyCart = () => {
    const [cart, refetch] = useCart();
    console.log(cart);
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    const handleDelete = item =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                
                fetch(`http://localhost:5000/carts/${item._id}`,{
                    method: 'DELETE'
                })
                .then(res => res.json()
                .then(data=>{
                    if(data.deletedCount > 0){
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          );
                          refetch(); // update cart
                    }
                }))
            }
          })
    }
    return (
        <div className='w-full'>
            <div>
                <Helmet>
                    <title> My Cart | StarShip</title>
                </Helmet>
            </div>
            <div className='uppercase font-bold flex justify-evenly h-12 items-center my-4 bg-slate-100 rounded-md'>
                <h3>total items: {cart.length}</h3>
                <h3>total price: ${total}</h3>
                <button className='btn btn-warning btn-sm text-white font-bold my-4'>Pay Now</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Food</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr
                                key={item._id}
                            >
                                <td className='text-xl'>
                                    {index + 1}
                                    {/* <input type="checkbox" name="" id="" /> */}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td className='text-end'>${item.price}</td>
                                <td>
                                    <button onClick={()=>handleDelete(item)} className="btn btn-ghost btn-lg text-red-800 hover:bg-transparent hover:text-red-600"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCart;