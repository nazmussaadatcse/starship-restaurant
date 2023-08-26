import { Outlet } from 'react-router-dom';
import { FaCalendarAlt, FaHome, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import useCart from '../hooks/useCart';



const DashBoard = () => {
    const [cart] = useCart();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Dashboard</label>
            </div>

            <div className="drawer-side bg-orange-00">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-orange-900 ">
                    {/* Sidebar content here */}
                    <li><NavLink to={'/'}><FaHome></FaHome> User Home</NavLink></li>
                    <li><NavLink to={'/dashboard/reservation'}><FaCalendarAlt></FaCalendarAlt>Reservation</NavLink></li>
                    <li><NavLink to={'/dashboard/paymenthistory'}><FaWallet></FaWallet>Payment History</NavLink></li>
                    <li className=''>
                        <NavLink to={'/dashboard/mycart'}><FaShoppingCart></FaShoppingCart>My Cart
                            <span className="badge badge-secondary">+{cart?.length || 0}</span>
                        </NavLink>
                    </li>

                    <div className='divider'></div>

                    <li><NavLink to={'/'}><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to={'/menu'}><FaWallet></FaWallet>Our Menu</NavLink></li>
                    <li><NavLink to={'/orders/salad'}><FaShoppingCart></FaShoppingCart>Order Food</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;