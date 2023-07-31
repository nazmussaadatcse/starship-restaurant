
const MenuItem = ({item}) => {
    const {image, price, recipe, name} = item;
    return (
        <div className="flex space-x-4">
            <img style={{borderRadius:' 10px 100px 100px 200px'}} className="w-[120px]" src={image} alt="" />
            <div>
                <h3 className="uppercase">{name}------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-orange-500">${price}</p>
        </div>
    );
};

export default MenuItem;