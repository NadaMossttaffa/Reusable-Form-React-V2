import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  exampleText: yup.string().required('This field is required'),
});

const fieldLabels = {
  text: 'Text Field',
  checkbox: 'Checkbox',
  radio: 'Radio Button',
  file: 'File Upload',
};

const DynamicForm = () => {
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [fields, setFields] = useState([]);
  const [radioGroup, setRadioGroup] = useState(null); // For handling radio button selection

  const addField = (type) => {
    if (type) {
      setFields((prevFields) => [...prevFields, { id: Date.now(), type }]);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="App">
      <select onChange={(e) => addField(e.target.value)} defaultValue="">
        <option value="" disabled>Select Field Type</option>
        <option value="text">Text Field</option>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio Button</option>
        <option value="file">File Upload</option>
      </select>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div className="field-container" key={field.id}>
            <label className="field-label">{fieldLabels[field.type]}</label>
            <Controller
              control={control}
              name={`field-${field.id}`}
              render={({ field: { ref, ...rest } }) => {
                switch (field.type) {
                  case 'text':
                    return (
                      <>
                        <input 
                          {...rest} 
                          className="dynamic-input" 
                          placeholder="Text Field" 
                          ref={ref} 
                        />
                        {errors[`field-${field.id}`] && (
                          <span className="error">{errors[`field-${field.id}`]?.message}</span>
                        )}
                      </>
                    );
                  case 'checkbox':
                    return (
                      <div>
                        <input 
                          type="checkbox" 
                          {...rest} 
                          className="dynamic-checkbox" 
                          ref={ref} 
                        />
                        <span className="field-label">{fieldLabels.checkbox}</span>
                        {errors[`field-${field.id}`] && (
                          <span className="error">{errors[`field-${field.id}`]?.message}</span>
                        )}
                      </div>
                    );
                  case 'radio':
                    return (
                      <div>
                        <input 
                          type="radio" 
                          name="radio-group" 
                          {...rest} 
                          value={field.id} 
                          className="dynamic-radio" 
                          ref={ref} 
                          onChange={() => setRadioGroup(field.id)} 
                        />
                        <span className="field-label">{fieldLabels.radio}</span>
                        {errors[`field-${field.id}`] && (
                          <span className="error">{errors[`field-${field.id}`]?.message}</span>
                        )}
                      </div>
                    );
                  case 'file':
                    return (
                      <>
                        <input 
                          type="file" 
                          {...rest} 
                          className="dynamic-file" 
                          ref={ref} 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setValue(`field-${field.id}`, file); 
                          }} 
                        />
                        {errors[`field-${field.id}`] && (
                          <span className="error">{errors[`field-${field.id}`]?.message}</span>
                        )}
                      </>
                    );
                  default:
                    return null;
                }
              }}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
