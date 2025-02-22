import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";


const UpdateModal = ({ isOpen, setIsModalOpen, refetch }) => {
    const axiosBase = useAxios()
    if (!isOpen?.state) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title');
        const description = formData.get('description');

        if (!title || !description) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Title or Description Can't be empty",
                showConfirmButton: false,
                timer: 1500
            });
            e.target.reset()
        }

        const res = await axiosBase.put(`/tasks/${isOpen?.task?._id}`, { title, description })
        if (res.data?.modifiedCount) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Update Successful",
                showConfirmButton: false,
                timer: 1500
            });
            e.target.reset()
            refetch()

        }
        setIsModalOpen(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        defaultValue={isOpen?.task?.title}
                        placeholder="Task Name"
                        className="outline-none border-b w-full h-11 mb-6"
                        required
                    />
                    <textarea
                        name="description"
                        defaultValue={isOpen?.task?.description}
                        placeholder="Description"
                        className="outline-none border-b w-full mb-6"
                        required
                    ></textarea>
                    <div className="space-x-4 mt-3">
                        <button type="submit" className="btn btn-primary btn-sm">Add</button>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="btn btn-neutral btn-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal


