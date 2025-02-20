import { FaClipboardList, FaSpinner, FaCheckCircle, FaTimes } from "react-icons/fa"

const Columns = () => {
    return (
        <div className="w-11/12 md:container xl:w-9/12 mx-auto my-14 lg:my-24 min-h-[75vh] md:flex gap-6 space-y-6 md:space-y-0">
            {/* To-Do Column */}
            <div className="flex flex-col md:w-1/3 min-h-[75vh]  bg-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-bold mb-4 flex items-center">
                    <FaClipboardList className="mr-2 text-blue-500" />
                    To-Do
                </h2>
                <div className="flex-grow bg-white rounded-md p-2">
                    <div className="bg-white p-4 mb-2 rounded-md shadow-sm relative">
                        <div>
                            <div className="flex items-center">
                                <h4 className="text-lg font-semibold w-8/12">Lorem, ipsum dolor sit amet consectetur adipisicing.</h4>
                                <FaTimes className="ms-auto cursor-pointer transition-transform duration-300 hover:scale-150 self-start mt-2" />
                            </div>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minima inventore maxime tempore aliquam fuga itaque labore iste ratione veniam!</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* In Progress Column */}
            <div className="flex flex-col md:w-1/3 min-h-[75vh] bg-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-bold mb-4 flex items-center">
                    <FaSpinner className="mr-2 text-yellow-500" />
                    In Progress
                </h2>
                <div className="flex-grow bg-white rounded-md p-2">
                    <div className="bg-white p-4 mb-2 rounded-md shadow-sm">Task 4</div>
                    <div className="bg-white p-4 rounded-md shadow-sm">Task 5</div>
                </div>
            </div>

            {/* Done Column */}
            <div className="flex flex-col md:w-1/3 min-h-[75vh] bg-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-bold mb-4 flex items-center">
                    <FaCheckCircle className="mr-2 text-green-500" />
                    Done
                </h2>
                <div className="flex-grow bg-white rounded-md p-2">
                    <div className="bg-white p-4 mb-2 rounded-md shadow-sm">Task 6</div>
                    <div className="bg-white p-4 rounded-md shadow-sm">Task 7</div>
                </div>
            </div>
        </div>
    )
}

export default Columns

