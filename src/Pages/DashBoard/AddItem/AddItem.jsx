import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUpload } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_api = import.meta.env.VITE_image_upload_api;

const AddItem = () => {

    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_api}`
    // imgbb api to upload image 

    const onSubmit = data => {
        console.log(data);

        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
            //little different body for formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                console.log(imgResponse);

                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;

                    //take name, recipe, category from data
                    const { name, price, recipe, category } = data;
                    const newMenuItem = { name, price: parseFloat(price), recipe, category, image: imgURL }
                    // set newMenuItem with previous data and replace image url

                    console.log(newMenuItem);

                    axiosSecure.post('/menu', newMenuItem)
                        .then(data => {
                            console.log('added new item:', data.data);

                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'New Menu Item Added..!',
                                    showConfirmButton: false,
                                    timer: 3000,
                                })
                            }
                        })
                }
            })

    };
    console.log(errors);

    return (
        <div className="w-full p-8">
            <SectionTitle subHeading={"What's new"} heading={"Add an item"}></SectionTitle>


            <form onSubmit={handleSubmit(onSubmit)}>

                {/* name input  */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe name? *</span>
                    </label>
                    <input type="text" placeholder="Recipe name" className="input input-bordered w-full "

                        {...register("name", { required: true, maxLength: 80 })} />
                    {/* register for react hook form  */}
                </div>
                {/* category  */}
                <div className="flex gap-2">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category *</span>
                        </label>
                        <select defaultValue={"Pick One"} className="select select-bordered"

                            {...register("category", { required: true, maxLength: 80 })}>
                            <option disabled>Pick One</option>
                            <option>pizza</option>
                            <option>soup</option>
                            <option>salad</option>
                            <option>drinks</option>
                            <option>dessert</option>
                        </select>
                    </div>
                    {/* price  */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Price *</span>
                        </label>
                        <input type="number" placeholder="Type here" className="input input-bordered w-full "
                            {...register("price", { required: true, maxLength: 80 })} />
                    </div>
                </div>
                {/* recipe */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe Detail *</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Detail"
                        {...register("recipe", { required: true, maxLength: 80 })}></textarea>
                </div>
                {/* file upload */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Pick a file</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full "
                        {...register("image", { required: true, maxLength: 80 })} />
                </div>

                <button className="btn btn-sm mt-4 bg-success text-white font-semibold hover:text-success hover:border-success"
                    type="submit" value="Add Item"><FaUpload></FaUpload>Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;