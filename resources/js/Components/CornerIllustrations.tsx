import corner1 from "../../assets/corner-1.png";
import corner2 from "../../assets/corner-2.png";

export default function CornerIllustrations() {
    return (
        <>
            <img
                src={corner1}
                alt="Illustration Corner 1"
                className="corner-illustration left z-index-n1 fixed bottom-0 left-0"
            />
            <img
                src={corner2}
                alt="Illustration Corner 2"
                className="corner-illustration right z-index-n1 fixed bottom-0 right-0"
            />
        </>
    );
}
