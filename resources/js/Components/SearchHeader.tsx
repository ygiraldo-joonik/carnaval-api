import React from "react";

type SearchHeaderProps = {
    onSearch: (search: string) => void;
    placeholder?: string;
    rightContent?: React.ReactNode;
};

const SearchHeader: React.FC<SearchHeaderProps> = ({
    onSearch,
    placeholder = "Buscar...",
    rightContent,
}) => {
    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-4 bg-white border-b border-gray-200 flex justify-between">
                    <input
                        type="text"
                        placeholder={placeholder}
                        onChange={(e) => onSearch(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    />
                    {rightContent}
                </div>
            </div>
        </div>
    );
};

export default SearchHeader;
