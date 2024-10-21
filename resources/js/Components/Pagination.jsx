// Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1
                            ? 'bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
                        }`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
