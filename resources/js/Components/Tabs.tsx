import { Tab } from "@headlessui/react";
import { ReactNode } from "react";

export type TabType = {
    [key: string]: ReactNode;
    righ?: ReactNode;
};

export type TabsProps = {
    tabs: TabType;
    right?: ReactNode;
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, right }: TabsProps) {
    const tabsList = (
        <Tab.List className="bg-white p-4 rounded-lg overflow-hidden space-x-1 ">
            <div className="flex rounded-lg overflow-hidden space-x-1 ">
                {Object.keys(tabs).map((tab) => (
                    <Tab
                        key={tab}
                        className={({ selected }) =>
                            classNames(
                                "w-full py-1 px-4 text-sm font-medium leading-5 focus:outline-none",
                                selected
                                    ? "bg-primary text-white shadow"
                                    : "bg-primary-disabled text-blue-100  hover:text-white"
                            )
                        }
                    >
                        {tab}
                    </Tab>
                ))}
            </div>
        </Tab.List>
    );
    return (
        <div className="w-full  px-2  sm:px-0">
            <Tab.Group>
                {/* Lista de Tabs */}
                {right != undefined ? (
                    <div className="flex justify-between w-full mb-3">
                        {tabsList} {right}
                    </div>
                ) : (
                    <div className="flex justify-start w-full">{tabsList}</div>
                )}

                {/* Contenido de cada Tab */}
                <Tab.Panels className="mt-2">
                    {Object.values(tabs).map((content, idx) => (
                        <Tab.Panel
                            key={idx}
                            className="rounded-xl bg-gray  focus:outline-none"
                        >
                            {content}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
