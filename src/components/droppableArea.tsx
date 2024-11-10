import Form from "@rjsf/core";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../data/constant";

export const DroppableArea = ({ schema, setSchema, onSubmit, updateValidationSchema }) => {
  
  const [, ref] = useDrop({
    accept: ItemTypes.FIELD,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drop: (item: any) => {
      // Add the dropped field to the schema
      setSchema((prevSchema) => {
        const newProperties = {
          ...prevSchema.properties,
          [item?.id + "_" + Object.keys(prevSchema.properties)?.length]: {
            type: item?.type,
            title: item?.label,
            ...(item?.enum ? { enum: item?.enum } : {}),
            ...(item?.format ? { format: item?.format } : {}),
          },
        };        
        updateValidationSchema(item);
        return {
          ...prevSchema,
          properties: newProperties,
        };
      });
    },
  });


  return (
    <div
      ref={ref}
      style={{
        padding: "20px",
        border: "2px dashed #ccc",
        minHeight: "200px",
        marginBottom: "20px",
      }}
      className="bg-slate-200"
    >

      <Form schema={schema} onSubmit={onSubmit} validator={updateValidationSchema} />
    </div>
  );
};
