import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-16">
            <SectionTitle
                subHeading="check it out"
                heading="Featured Item"
            ></SectionTitle>
            <div>
            <div className="md:flex justify-center items-center py-16 px-8 lg:px-32 md:px-4">
                <div className="">
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-12 text-sm lg:text-xl">
                    <p className="text-bold mt-2">Jul 31, 2023</p>
                    <p className="uppercase mt-2 mb-4">WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At adipisci, ad explicabo delectus incidunt, asperiores consequatur repellendus velit voluptatem quia dolor vero natus pariatur perferendis! Ad pariatur quibusdam adipisci illo.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4 text-white">Order Now</button>
                </div>
            </div>
            </div>

        </div>
    );
};

export default Featured;