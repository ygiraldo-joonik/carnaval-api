import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DefaultPageProps } from "@/types/page";
import { Parade } from "@/types/parade";
import BlocksAccordion from "../components/BlocksAccordeon";

export type ManageElementsViewProps = {
    parade: Parade;
} & DefaultPageProps;

export default function ManageElementsView(props: ManageElementsViewProps) {
    const { parade } = props;
    return (
        <AuthenticatedLayout
            auth={props.auth}
            header={
                <div>
                    <h3 className="font-semibold text-l text-gray-500 leading-tight">
                        {parade.name}
                    </h3>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Administrar elementos
                    </h2>
                </div>
            }
        >
            <Head title={`Administrar elementos: ${parade.name}`} />

            {parade.blocks && <BlocksAccordion blocks={parade.blocks} />}
        </AuthenticatedLayout>
    );
}
