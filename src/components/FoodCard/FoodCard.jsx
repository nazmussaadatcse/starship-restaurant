
const FoodCard = ({ item }) => {

    const { image, price, recipe, name } = item;


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-800 absolute right-0 m-4 px-4 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline border-0 bg-slate-100 border-orange-300 border-b-4 mt-4 text-black">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;