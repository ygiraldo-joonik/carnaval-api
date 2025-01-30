import { Commet } from "react-loading-indicators";
import useUpdateElementPositionForm from "../../hooks/elements/useUpdateElementPositionForm";

const UpdateElementPositionForm = () => {
    const {
        handleSubmit,
        element,
        block,
        blockOptions,
        orderOptions,
        blockId,
        setBlockId,
        setOrder,
        order,
        loading,
        positionChanged,
    } = useUpdateElementPositionForm();

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="font-semibold text-gray-500 ">{block.name}</h3>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Mover elemento {element.name}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="blockId"
                    >
                        Bloque
                    </label>
                    <select
                        id="blockId"
                        name="blockId"
                        value={blockId}
                        onChange={(e) => setBlockId(parseInt(e.target.value))}
                        required
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Seleccione un bloque
                        </option>
                        {blockOptions.map((block) => (
                            <option key={block.value} value={block.value}>
                                {block.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="order"
                    >
                        Posición
                    </label>
                    <select
                        id="order"
                        name="order"
                        value={order}
                        onChange={(e) => setOrder(parseInt(e.target.value))}
                        required
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Seleccione la posición
                        </option>
                        {orderOptions.map((order) => (
                            <option key={order.value} value={order.value}>
                                {order.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    disabled={loading || !positionChanged}
                    type="submit"
                    className={`inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        !loading && positionChanged
                            ? "btn-primary"
                            : "bg-gray-300"
                    }`}
                >
                    Mover
                    {loading && (
                        <>
                            &nbsp;
                            <Commet color="#fff" style={{ fontSize: "3px" }} />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default UpdateElementPositionForm;
