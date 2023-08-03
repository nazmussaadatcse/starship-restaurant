import CoverImg from "../../Shared/CoverImg/CoverImg";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { Link } from 'react-router-dom'


const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            {title && <CoverImg img={img} title={title}
            ></CoverImg>}
            <div className="grid md:grid-cols-2 mt-16 gap-8">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/orders/${title}`}>
                <button className="btn btn-outline border-0 border-b-4 mt-4 text-black">Order Now</button>
            </Link>
        </div>
    );
};

export default MenuCategory;