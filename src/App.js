import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DndProvider } from "react-dnd";
import { DraggableField } from "./components/draggableField";
import { inputFields } from "./data/formList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { z } from "zod";
import { DroppableArea } from "./components/droppableArea";
function App() {
    const [schema, setSchema] = useState({
        title: "Generated Form",
        type: "object",
        properties: {},
    });
    const [validationSchema, setValidationSchema] = useState(z.object({}));
    const [errors, setErrors] = useState({});
    const updateValidationSchema = (field) => {
        console.log(field, 'filed');
        setValidationSchema((prevSchema) => prevSchema.merge(z.object({ [field.id]: field.validation })));
    };
    const validateFormData = (data) => {
        try {
            validationSchema.parse(data.formData); // Validate form data using Zod schema
            return null; // Return null if validation passes
        }
        catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors = {};
                e.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                return fieldErrors; // Return validation errors if any
            }
            return null;
        }
    };
    const onSubmit = ({ data }) => {
        const validationErrors = validateFormData(data);
        if (validationErrors) {
            setErrors(validationErrors);
        }
        else {
            alert("Form submitted successfully!"); // Success message
            setErrors({}); // Clear errors on success
        }
    };
    return (_jsxs("div", { className: "mx-20", children: [_jsx("p", { className: "font-bold text-4xl text-center", children: "FORM BUILDER" }), _jsxs(DndProvider, { backend: HTML5Backend, children: [_jsxs("div", { className: "flex gap-8 w-full ", children: [_jsx("div", { className: "w-52 bg-slate-300", children: inputFields.map((field) => (_jsx(DraggableField, { field: field }, field.id))) }), _jsx("div", { className: "w-full", children: _jsx(DroppableArea, { schema: schema, setSchema: (newSchema) => {
                                        setSchema(newSchema);
                                        inputFields.forEach(updateValidationSchema); // Add validation for each field
                                    }, onSubmit: onSubmit, updateValidationSchema: updateValidationSchema }) })] }), _jsxs("div", { className: "flex justify-center w-full mt-20", children: [_jsxs("div", { className: "bg-slate-200", children: [_jsx("h3", { children: "Generated JSON Schema" }), _jsx("pre", { children: JSON.stringify(schema, null, 2) })] }), _jsx("div", { className: "bg-red-200 min-w-40", children: Object.keys(errors).length && (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Generated JSON Schema" }), _jsx("pre", { children: JSON.stringify(schema, null, 2) })] })) })] })] })] }));
}
export default App;
