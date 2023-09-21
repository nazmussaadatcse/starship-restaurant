import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {

    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    // const { data: users = [], refetch } = useQuery(['users'], async () => {
    //     const res = await fetch('https://starship-restaurant-server.vercel.app/users')
    //     return res.json();
    // })

    const handleMakeAdmin = user => {
        fetch(`https://starship-restaurant-server.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: `${user.name} switched to "admin"`,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                }
            })
    }
    const handleDelete = user => {

    }
    return (
        <div className="w-full p-4">
            <Helmet>
                <title>Starship | All Users</title>
            </Helmet>

            <h3 className="m-4">All users: {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{
                                        user.role === 'admin' ? 'admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-lg text-orange-600 hover:bg-transparent hover:text-red-600"><FaUserShield></FaUserShield></button>
                                    }</td>
                                    <td><button onClick={() => handleDelete(user)} className="btn btn-ghost btn-lg text-red-800 hover:bg-transparent hover:text-red-600"><FaTrashAlt></FaTrashAlt></button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;