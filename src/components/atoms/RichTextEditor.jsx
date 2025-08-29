import React, { forwardRef, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/utils/cn';

const RichTextEditor = forwardRef(({
  value = '',
  onChange,
  placeholder = 'Start writing...',
  className,
  label,
  error,
  helperText,
  readOnly = false,
  height = '200px',
  ...props
}, ref) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'align', 'link', 'image'
  ];

  const handleChange = (content, delta, source, editor) => {
    if (onChange) {
      onChange(content);
    }
  };

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(quillRef.current);
      } else {
        ref.current = quillRef.current;
      }
    }
  }, [ref]);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-2">
          {label}
        </label>
      )}
      <div 
        className={cn(
          "rich-text-editor bg-surface/60 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden transition-all duration-200",
          error && "border-error focus-within:border-error",
          !error && "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
          className
        )}
        style={{ minHeight: height }}
      >
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={readOnly}
          modules={modules}
          formats={formats}
          style={{
            height: height,
            color: 'white'
          }}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-400 mt-1">{helperText}</p>
      )}

      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          background: rgba(24, 24, 27, 0.8);
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px;
        }

        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: rgba(255, 255, 255, 0.7);
        }

        .rich-text-editor .ql-toolbar .ql-fill {
          fill: rgba(255, 255, 255, 0.7);
        }

        .rich-text-editor .ql-toolbar button:hover .ql-stroke {
          stroke: #7C3AED;
        }

        .rich-text-editor .ql-toolbar button:hover .ql-fill {
          fill: #7C3AED;
        }

        .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: #7C3AED;
        }

        .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
          fill: #7C3AED;
        }

        .rich-text-editor .ql-container {
          background: rgba(24, 24, 27, 0.6);
          border: none;
          color: white;
          font-family: Inter, sans-serif;
        }

        .rich-text-editor .ql-editor {
          color: white;
          padding: 16px;
          min-height: 150px;
          line-height: 1.6;
        }

        .rich-text-editor .ql-editor.ql-blank::before {
          color: rgba(156, 163, 175, 0.7);
          font-style: normal;
        }

        .rich-text-editor .ql-tooltip {
          background: rgba(24, 24, 27, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(8px);
          border-radius: 8px;
        }

        .rich-text-editor .ql-tooltip input {
          background: rgba(24, 24, 27, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px;
          border-radius: 4px;
        }

        .rich-text-editor .ql-tooltip a.ql-action::after,
        .rich-text-editor .ql-tooltip a.ql-remove::after {
          color: #7C3AED;
        }

        .rich-text-editor .ql-picker-options {
          background: rgba(24, 24, 27, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          border-radius: 8px;
          padding: 4px;
        }

        .rich-text-editor .ql-picker-item:hover {
          background: rgba(124, 58, 237, 0.2);
          color: white;
        }

        .rich-text-editor .ql-picker-label {
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;