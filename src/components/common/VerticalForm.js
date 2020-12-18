import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const VerticalForm = ({ fields, layout, data }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState(layout);
  const [formData, setFormData] = useState(data);

  const onSubmit = e => {
    e.preventDefault();
    setFormData(formData);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === layout
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const buttonItemLayout =
    formLayout === layout
      ? {
          wrapperCol: { span: 14, offset: 4 },
        }
      : null;

  return (
    <div>
      <Form
        onSubmit={e => {
          onSubmit(e);
        }}
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
        {fields.map(field => (
          <Form.Item
            key={field.data}
            name={field.data}
            label={field.displayName}
          >
            <Input
              name={field.data}
              onChange={e => onChange(e)}
              value={formData[field.data]}
            />
            <></>
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};
export default VerticalForm;
