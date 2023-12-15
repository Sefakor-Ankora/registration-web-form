import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextInput = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <ReactQuill
      value={text}
      onChange={handleChange}
      modules={RichTextInput.modules}
      formats={RichTextInput.formats}
      style={{ border: '1px solid #ccc' }}
    />
  );
};

// Configuration options for modules and formats
RichTextInput.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    ['link', 'image'],
    ['clean'],
  ],
};

RichTextInput.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'align',
  'list',
  'script',
  'link',
  // 'image',
];

export default RichTextInput;
