import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const AdminHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats');
            return res.data;
        }
    })

    return (
        <div className="w-full p-4">
            
            <div className="stat">
    <div className="stat-figure text-secondary">
      <div className="avatar online">
        <div className="w-18 rounded-full shadow-xl border-purple-500 border-4">
          <img src={user.photoURL} alt="Image" />
        </div>
      </div>
    </div>
    <div className="stat-title text-xl">Welcome to Admin Panel</div>
    <div className="stat-value text-xl">Name: {user.displayName}</div>
    <div className="stat-value text-xl">Email: {user.email}</div>
    <div className="stat-title text-secondary">User role: admin</div>
  </div>


            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  
  <div className="stat shadow-md">
    <div className="stat-title font-bold">Total Sales <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-primary"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></div>
    <div className="stat-value text-md text-primary">${stats.revenue}</div>
    <div className="stat-desc text-green-900 font-bold">21% more than last month</div>
  </div>
  <div className="stat shadow-md">
    <div className="stat-title font-bold">Total Revenue <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-success"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></div>
    <div className="stat-value text-md text-success">${(stats.revenue*0.25).toFixed(2)}</div>
    <div className="stat-desc text-green-900 font-bold">25% Revenue of sales</div>
  </div>
  
  <div className="stat shadow-md">
    <div className="stat-title font-bold">Total Users <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-secondary"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
    <div className="stat-value text-secondary">{stats.users}</div>
    <div className="stat-desc text-green-900 font-bold">51% more than last month</div>
  </div>

  <div className="stat shadow-md">
    <div className="stat-title font-bold">Menu Items <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-secondary"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
    <div className="stat-value text-secondary">{stats.products}</div>
    <div className="stat-desc text-green-900 font-bold">12% more than last month</div>
  </div>

  <div className="stat shadow-md">
    <div className="stat-title font-bold">Order Placed <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-secondary"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
    <div className="stat-value text-secondary">{stats.orders}</div>
    <div className="stat-desc text-green-900 font-bold">
    {((stats.orders / stats.products) * 100).toFixed(2)}% Order Placed
    </div>

  </div>

</div>



        </div>
    );
};

export default AdminHome;