import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Ajv from "ajv";

const Home: React.FC = () => {
  const [jsonCode, setJsonCode] = useState("{}");
  const [validationResult, setValidationResult] = useState("");
  // JSON Schema
  const jsonSchema = {
    type: "object",
    required: ["name", "age"],
    patternProperties: {
      name: { type: "string" },
      age: { type: "number" },
    },
  };

  useEffect(() => {
    const ajv = new Ajv();
    const validate = ajv.compile(jsonSchema);

    try {
      // Parse JSON data
      const jsonData = JSON.parse(jsonCode);
      console.log("---");

      // Validate JSON data against the schema
      const isValid = validate(jsonData);
      console.log(validate.errors);
      if (isValid) {
        setValidationResult("JSON data is valid.");
      } else {
        const errors = validate.errors
          ?.map(
            (item: any, idx) =>
              `${idx + 1}: ${item.instancePath} ${item.message}\n`,
          )
          .join("");
        setValidationResult(errors ?? "");
      }
    } catch (error) {
      setValidationResult("Invalid JSON format.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonCode]);

  const handleJsonChange = (value: any) => {
    setJsonCode(value);
  };

  return (
    <div>
      {/* JSON schema */}
      <div>
        <h2>
          <pre>{JSON.stringify(jsonSchema, null, 2)}</pre>
        </h2>
      </div>
      <div>
        <Editor
          height="300px"
          language="json"
          theme="vs-dark"
          value={jsonCode}
          onChange={handleJsonChange}
        />
      </div>

      {/* 校验结果 */}
      <div>
        <p>校验结果:</p>
        <pre>{validationResult}</pre>
      </div>
    </div>
  );
};

export default Home;
