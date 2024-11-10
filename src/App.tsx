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
    console.log(field,'filed')
    setValidationSchema((prevSchema) =>
      prevSchema.merge(z.object({ [field.id]: field.validation }))
    );
  };

  const validateFormData = (data) => {
    try {
      validationSchema.parse(data.formData); // Validate form data using Zod schema
      return null; // Return null if validation passes
    } catch (e) {
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
    } else {
      alert("Form submitted successfully!"); // Success message
      setErrors({}); // Clear errors on success
    }
  };

  return (
    <div className="mx-20">
      <p className="font-bold text-4xl text-center">FORM BUILDER</p>
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-8 w-full ">
          <div className="w-52 bg-slate-300">
            {inputFields.map((field) => (
              <DraggableField key={field.id} field={field} />
            ))}
          </div>
          <div className="w-full">
            <DroppableArea
              schema={schema}
              setSchema={(newSchema) => {
                setSchema(newSchema);
                inputFields.forEach(updateValidationSchema); // Add validation for each field
              }}
              onSubmit={onSubmit}
              updateValidationSchema={updateValidationSchema}
            />
          </div>
        </div>
        
        <div className="flex justify-center w-full mt-20">
          <div className="bg-slate-200">
            <h3>Generated JSON Schema</h3>
            <pre>{JSON.stringify(schema, null, 2)}</pre>
          </div>
          <div className="bg-red-200 min-w-40">
            {Object.keys(errors).length && (
              <>
                <h3>Generated JSON Schema</h3>
                <pre>{JSON.stringify(schema, null, 2)}</pre>
              </>
            )}
          </div>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
