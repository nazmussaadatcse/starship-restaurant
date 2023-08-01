import { Helmet } from 'react-helmet-async';
import menuImg from '../../assets/menu/banner3.jpg'
import CoverImg from '../Shared/CoverImg/CoverImg';
import PopularMenu from '../Home/PopularMenu/PopularMenu';

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title> Starship | Menu</title>
            </Helmet>
            
            <CoverImg img={menuImg} title={'Our Menu'}
            ></CoverImg>
            <PopularMenu></PopularMenu>

            <CoverImg img={menuImg} title={'Our Menu'}
            ></CoverImg>
            <PopularMenu></PopularMenu>

            <CoverImg img={menuImg} title={'Our Menu'}
            ></CoverImg>
            <PopularMenu></PopularMenu>
        </div>
    );
};

export default Menu;