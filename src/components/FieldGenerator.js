import React from 'react';

const FieldGenerator = ({ addField }) => {
  const handleAddField = (event) => {
    addField(event.target.value);
  };

  return (
    <div>
      <select onChange={handleAddField}>
        <option value="">Select Field Type</option>
        <option value="text">Text Field</option>
        <option value="radio">Radio Button</option>
        <option value="checkbox">Checkbox</option>
      </select>
    </div>
  );
};

export default FieldGenerator;
