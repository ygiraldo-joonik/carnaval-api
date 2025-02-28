import { Menu } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import clsx from "clsx";
import { IconType } from "react-icons";

interface MenuItem {
    icon: IconType;
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

interface MenuButtonProps {
    items: MenuItem[];
}

const MenuButton: React.FC<MenuButtonProps> = ({ items }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                <BsThreeDotsVertical className="w-6 h-6 text-gray-600" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded bg-white shadow-lg focus:outline-none z-10">
                {items.map((item, index) => (
                    <Menu.Item key={index} disabled={item?.disabled ?? false}>
                        {({ active, disabled }) => (
                            <button
                                onClick={item.onClick}
                                disabled={disabled}
                                className={clsx(
                                    "flex items-center w-full px-6 py-4 text-sm text-gray-700",
                                    active && "bg-gray-100",
                                    disabled && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <item.icon className="w-5 h-5 mr-2 text-gray-500" />
                                {item.label}
                            </button>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default MenuButton;
