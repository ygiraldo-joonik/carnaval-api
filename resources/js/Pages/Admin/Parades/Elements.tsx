import { ManageElementsProvider } from "@/modules/elements/context/ManageElementsContext";
import ManageElementsView, {
    ManageElementsPageProps,
} from "@/modules/elements/views/ManageElementsView";

const ManageElementsPage = (props: ManageElementsPageProps) => (
    <ManageElementsProvider {...props}>
        <ManageElementsView {...props} />
    </ManageElementsProvider>
);

export default ManageElementsPage;
