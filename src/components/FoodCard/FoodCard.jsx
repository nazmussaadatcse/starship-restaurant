import { useContext } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import Swal from "sweetalert2";
import { Link , useNavigate, useLocation } from 'react-router-dom';
import useCart from "../../hooks/useCart";



const FoodCard = ({ item }) => {

    const { image, price, recipe, name,_id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const HandleAddToCart = item => {
        const [refetch] = useCart()
        console.log(item);
        const cartItem = {menuItemId: _id, name, image, price, email:user.email}
        if (user && user.email) {
            fetch('http://localhost:5000/carts',{
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch(); //update cart data
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Added',
                            showConfirmButton: false,
                            timer: 2000
                        })

                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to order food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state:{from:location}});
                }
            })
        }
    }


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-800 absolute right-0 m-4 px-4 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => HandleAddToCart(item)} className="btn btn-outline border-0 bg-slate-100 border-orange-300 border-b-4 mt-4 text-black">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;