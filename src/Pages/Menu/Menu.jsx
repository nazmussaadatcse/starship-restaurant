import { Helmet } from 'react-helmet-async';
import menuImg from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import CoverImg from '../Shared/CoverImg/CoverImg';
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';

const Menu = () => {

    const [menu] = useMenu();
    const offered = menu.filter( item=> item.category === 'offered');
    const desserts = menu.filter( item=> item.category === 'dessert');
    const soup = menu.filter( item=> item.category === 'soup');
    const salad = menu.filter( item=> item.category === 'salad');
    const pizza = menu.filter( item=> item.category === 'pizza');

    return (
        <div>
            <Helmet>
                <title> Starship | Menu</title>
            </Helmet>
            
            <CoverImg img={menuImg} title={'Our Menu'}
            ></CoverImg>

            {/* Main cover  */}

            <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"}
            ></SectionTitle>

            {/* offered menu  */}

            <MenuCategory
            items={offered}
            ></MenuCategory>

            {/* dessert menu   */}

            <MenuCategory
            items={desserts}
            title={"Desserts"}
            img={dessertImg}
            ></MenuCategory>

            {/* pizza menu   */}

            <MenuCategory
            items={pizza}
            title={"Pizza"}
            img={pizzaImg}
            ></MenuCategory>

             {/* soup menu   */}

             <MenuCategory
            items={soup}
            title={"Soup"}
            img={soupImg}
            ></MenuCategory>

            {/* pizza menu   */}

            <MenuCategory
            items={salad}
            title={"Salad"}
            img={saladImg}
            ></MenuCategory>

           
            
        </div>
    );
};

export default Menu;