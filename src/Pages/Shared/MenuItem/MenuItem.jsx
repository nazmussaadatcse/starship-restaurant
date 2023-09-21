
const MenuItem = ({item}) => {
    const {image, price, recipe, name} = item;
    return (
        <div className="flex space-x-4 p-2">
            <img style={{borderRadius:' 10px 100px 100px 200px'}} className="w-[120px]" src={image} alt="" />
            <div>
                <h3 className="uppercase font-medium">{name}------</h3>
                <p className="pr-0 md:pr-2 lg:pr-12 text-sm text-purple-800">{recipe}</p>
            </div>
            <p className="text-orange-500">${price}</p>
        </div>
    );
};

export default MenuItem;