import React from 'react';

const FieldInput = ({ field }) => {
  switch (field.type) {
    case 'text':
      return <input type="text" {...field} />;
    case 'radio':
      return (
        <div>
          <label>
            <input type="radio" value="Option 1" {...field} />
            Option 1
          </label>
          <label>
            <input type="radio" value="Option 2" {...field} />
            Option 2
          </label>
        </div>
      );
    case 'checkbox':
      return <input type="checkbox" {...field} />;
    default:
      return null;
  }
};

export default FieldInput;
