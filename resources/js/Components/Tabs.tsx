import { Tab } from "@headlessui/react";
import { ReactNode } from "react";

export type TabType = {
    [key: string]: ReactNode;
};

export type TabsProps = {
    tabs: TabType;
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs }: TabsProps) {
    return (
        <div className="w-full  px-2  sm:px-0">
            <Tab.Group>
                {/* Lista de Tabs */}
                <Tab.List className="flex space-x-1  bg-blue-900/20 ">
                    {Object.keys(tabs).map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    "w-full rounded-tl rounded-tr  py-2 px-4 text-sm font-medium leading-5 focus:outline-none",
                                    selected
                                        ? "bg-primary text-white shadow"
                                        : "bg-primary-disabled text-blue-100  hover:text-white"
                                )
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>

                {/* Contenido de cada Tab */}
                <Tab.Panels className="mt-2">
                    {Object.values(tabs).map((content, idx) => (
                        <Tab.Panel
                            key={idx}
                            className="rounded-xl bg-white p-3  focus:outline-none"
                        >
                            {content}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
