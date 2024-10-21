// Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    // Number of buttons to show on either side of the current page
    const siblingsCount = 1;

    // Calculate start and end pages
    const startPage = Math.max(2, currentPage - siblingsCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingsCount);

    // Create an array to hold page numbers
    const pageNumbers = [];

    // Always include the first page
    if (totalPages > 1) {
        pageNumbers.push(1);
    }

    // Add ellipsis if necessary
    if (startPage > 2) {
        pageNumbers.push('...'); // Ellipsis before the current range
    }

    // Add current range of pages
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    // Add ellipsis if necessary
    if (endPage < totalPages - 1) {
        pageNumbers.push('...'); // Ellipsis after the current range
    }

    // Always include the last page
    if (totalPages > 1) {
        pageNumbers.push(totalPages);
    }

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Previous
            </button>

            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === page
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
                        }`}
                    disabled={typeof page === 'string'} // Disable ellipsis
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
