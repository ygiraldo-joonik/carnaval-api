import { generateRandomId } from "@/utils/transformers/generateRandomId";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Tooltip as TooltipComponent } from "react-tooltip";

type TooltipProps = {
    content: string | ReactNode;
};

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
    content,
    children,
}) => {
    const randomString = generateRandomId(5);
    const tooltipId = `tooltip-${randomString}`;

    return (
        <>
            <a data-tooltip-id={tooltipId}>{children}</a>
            <TooltipComponent className="z-10" id={tooltipId}>
                {content}
            </TooltipComponent>
        </>
    );
};

export default Tooltip;
