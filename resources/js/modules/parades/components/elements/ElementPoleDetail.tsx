import { ParadeElementPole } from "@/types/parade";

import "dayjs/locale/es";
import { formatTimeHMS } from "@/utils/transformers/fromMinutesToHours";
import dayjs from "../../../../utils/dayjs";

type ElementPoleDetailProps = { pole: ParadeElementPole };
const ElementPoleDetail = ({ pole }: ElementPoleDetailProps) => {
    return (
        <div className="flex flex-col space-y-2 w-full px-4">
            <div className="flex justify-between items-center rounded-md mt-3 gap-4">
                <div
                    className={`flex items-center justify-center space-x-2 bg-gray-100 p-1  max-w-[176px] w-[100%] rounded-t-lg ${
                        pole.distance_from_first != null
                            ? pole.distance_from_first?.on_time
                                ? "border-b-2 border-green-500"
                                : "border-b-2 border-red-500"
                            : "border-b-2 border-gray-500"
                    }`}
                >
                    <DistancefromFirst />
                    <span className="text-gray-700 text-sm">
                        {pole.distance_from_first != null ? (
                            <>
                                {formatTimeHMS(
                                    pole.distance_from_first.duration
                                )}{" "}
                                ({pole.distance_from_first?.on_time ? "+" : "-"}{" "}
                                {formatTimeHMS(
                                    Math.abs(pole.distance_from_first.delay)
                                )}
                                )
                            </>
                        ) : (
                            "---"
                        )}
                    </span>
                </div>
                <div
                    className={`flex items-center justify-center space-x-2 bg-gray-100 p-1 max-w-[176px] w-[100%] rounded-t-lg ${
                        pole.distance_from_previous != null
                            ? pole.distance_from_previous?.on_time
                                ? "border-b-2 border-green-500"
                                : "border-b-2 border-red-500"
                            : "border-b-2 border-gray-500"
                    }`}
                >
                    <DistancefromPrevious />
                    <span className="text-gray-700 text-sm">
                        {pole.distance_from_previous != null ? (
                            <>
                                {formatTimeHMS(
                                    pole.distance_from_previous.duration
                                )}{" "}
                                (
                                {pole.distance_from_previous?.on_time
                                    ? "+"
                                    : "-"}{" "}
                                {formatTimeHMS(
                                    Math.abs(pole.distance_from_previous.delay)
                                )}
                                )
                            </>
                        ) : (
                            "---"
                        )}
                    </span>
                </div>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
                <span>{pole.user}</span>
                <span className="capitalize">
                    {dayjs(pole.passed_at).format("ddd/DD hh:mm A")}
                </span>
            </div>
        </div>
    );
};

function DistancefromFirst() {
    return (
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            //   className="text-gray-700"
        >
            <path
                d="M28.7707 14.2145C27.8043 14.2145 26.977 14.5585 26.2888 15.2465C25.6006 15.9345 25.2565 16.7616 25.2565 17.7277C25.2565 18.6939 25.6006 19.5209 26.2888 20.2089C26.977 20.8969 27.8043 21.2409 28.7707 21.2409C29.7371 21.2409 30.5644 20.8969 31.2526 20.2089C31.9408 19.5209 32.2849 18.6939 32.2849 17.7277C32.2849 16.7616 31.9408 15.9345 31.2526 15.2465C30.5644 14.5585 29.7371 14.2145 28.7707 14.2145ZM28.7707 12.4579C30.2349 12.4579 31.4796 12.9703 32.5045 13.9949C33.5295 15.0196 34.042 16.2639 34.042 17.7277C34.042 19.1916 33.5295 20.4358 32.5045 21.4605C31.4796 22.4852 30.2349 22.9976 28.7707 22.9976C27.4529 22.9976 26.3071 22.5804 25.3334 21.746C24.3596 20.9116 23.7703 19.8649 23.5653 18.606L16.471 18.606L16.471 16.8494L23.5653 16.8494C23.7703 15.5905 24.3596 14.5439 25.3334 13.7095C26.3071 12.8751 27.4529 12.4579 28.7707 12.4579Z"
                fill="#37474F"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.49553 21.4606C4.52022 22.4853 5.76448 22.9977 7.22832 22.9977C8.54578 22.9977 9.69123 22.5805 10.6647 21.7461C11.6381 20.9117 12.2273 19.865 12.4323 18.6061L19.5246 18.6061L19.5246 16.8495L12.4323 16.8495C12.2273 15.5906 11.6381 14.544 10.6647 13.7096C9.69124 12.8752 8.54578 12.458 7.22832 12.458C5.76448 12.458 4.52022 12.9704 3.49553 13.995C2.47084 15.0197 1.9585 16.264 1.9585 17.7278C1.95849 19.1917 2.47084 20.4359 3.49553 21.4606Z"
                fill="#37474F"
            />
        </svg>
    );
}
function DistancefromPrevious() {
    return (
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.6259 15.5448C20.3877 14.7832 21.3035 14.4024 22.3732 14.4024C23.4429 14.4024 24.3588 14.7832 25.1204 15.5448C25.8823 16.3064 26.2632 17.2219 26.2632 18.2913C26.2632 19.3608 25.8823 20.2763 25.1204 21.0379C24.3588 21.7994 23.4429 22.1802 22.3732 22.1802C21.3035 22.1802 20.3877 21.7994 19.6259 21.0379C18.8641 20.2763 18.4832 19.3608 18.4832 18.2913C18.4832 17.2219 18.8641 16.3064 19.6259 15.5448ZM26.5063 14.1594C25.3717 13.0251 23.994 12.458 22.3732 12.458C20.9145 12.458 19.6462 12.9198 18.5683 13.8434C17.4905 14.767 16.8381 15.9256 16.6112 17.3191H9.45818V12.458L7.7915 12.458L7.7915 24.1247H9.45818L9.45818 19.2636H16.6112C16.8381 20.6571 17.4905 21.8156 18.5683 22.7393C19.6462 23.6629 20.9145 24.1247 22.3732 24.1247C23.994 24.1247 25.3717 23.5575 26.5063 22.4233C27.6409 21.289 28.2082 19.9117 28.2082 18.2913C28.2082 16.671 27.6409 15.2937 26.5063 14.1594Z"
                fill="#37474F"
            />
        </svg>
    );
}

export default ElementPoleDetail;
