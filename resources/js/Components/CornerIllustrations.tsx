import corner1 from "../../assets/corner-1.png";
import corner2 from "../../assets/corner-2.png";

export default function CornerIllustrations() {
    return (
        <>
            <div className="corner-illustration left z-index-n1 absolute bottom-0 left-0 w-1/2 h-1/2 -mt-16 -ml-16 scale-50">
                <img src={corner1} alt="Illustration Corner 1" />
            </div>
            <div className="corner-illustration right z-index-n1 absolute bottom-0 right-0 w-1/2 h-1/2 -mb-16 -mr-16 scale-50">
                <img src={corner2} alt="Illustration Corner 2" />
            </div>
        </>
    );
}
