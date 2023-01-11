import {useRef} from 'react';


declare type CoordXY = {
    x: number,
    y: number
}

declare type PlanePointerProps = {
    flagPosition: CoordXY,
    pointerCoord: CoordXY
}

export const Pointer = (props: PlanePointerProps) => {
    
    const {flagPosition, pointerFlagTextWidth, pointerFlag} = props;
    
    const pointerFlagRef = useRef(null);
    const [pointerFlagTextWidth, setPointerFlagTextWidth] = useState(0);

    return (
        <motion.g
        transform={`translate(${flagPosition.x}, ${flagPosition.y})`}
    >
        <rect
        rx={13}
        width={pointerFlagTextWidth + 20}
        height={26}
        fill={"white"}
        />
        <text
        x={10}
        y={19}
        fill={"hotpink"}
        fontWeight={600}
        ref={pointerFlagRef}
        >
        {pointerCoord.x.toFixed(2)}, {pointerCoord.y.toFixed(2)}
        </text>
    </motion.g>
    )
}