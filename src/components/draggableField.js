import { jsx as _jsx } from "react/jsx-runtime";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../data/constant";
export const DraggableField = ({ field }) => {
    const [, ref] = useDrag({
        type: ItemTypes.FIELD,
        item: { ...field },
    });
    return (_jsx("div", { ref: ref, className: "draggable-field", style: {
            padding: "8px",
            border: "1px solid gray",
            marginBottom: "5px",
            cursor: "move",
        }, children: field.label }));
};
