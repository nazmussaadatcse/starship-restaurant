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
    const desserts = menu.filter( item=> item.category === 'dessert');
    const soup = menu.filter( item=> item.category === 'soup');
    const salad = menu.filter( item=> item.category === 'salad');
    const pizza = menu.filter( item=> item.category === 'pizza');
    const offered = menu.filter( item=> item.category === 'offered');
    const drinks = menu.filter( item=> item.category === 'drinks');

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
            title={"dessert"}
            img={dessertImg}
            ></MenuCategory>

            {/* pizza menu   */}

            <MenuCategory
            items={pizza}
            title={"pizza"}
            img={pizzaImg}
            ></MenuCategory>

            {/* pizza menu   */}

            <MenuCategory
            items={salad}
            title={"salad"}
            img={saladImg}
            ></MenuCategory>

            {/* soup menu   */}

             <MenuCategory
            items={soup}
            title={"soup"}
            img={soupImg}
            ></MenuCategory>

            {/* drinks menu   */}

             <MenuCategory
            items={drinks}
            title={"drinks"}
            img={soupImg}
            ></MenuCategory>
            
        </div>
    );
};

export default Menu;