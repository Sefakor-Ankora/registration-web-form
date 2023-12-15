import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import './styles.css';

export function Input({
  name,
  children,
  example,
  type,
  required = true,
  value,
  onChange,
  disabled = false,
  readOnly = false,
}) {
  const [v, setV] = useState('');
  if (type === 'number') {
    example = 9999.99;
  }

  if (!onChange) {
    onChange = (e) => {
      setV(e.target.value);
    };
  }

  useEffect(() => {
    if (value) {
      setV(value);
    }
  }, [type, value, onChange]);
  return (
    <div key={name}>
      <small className="text-muted">
        <label htmlFor={name} className="form-label">
          {children} {required ? <span className="text-danger"> * </span> : ''}
        </label>
      </small>
      <input
        type={type}
        className="form-control form-control-md"
        name={name}
        placeholder={example}
        required={required}
        value={v}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
}

export function File({
  name,
  children,
  example,
  required = true,
  accept,
  onChange,
}) {
  if (!onChange) {
    onChange = () => {};
  }
  return (
    <>
      <div>
        <small className="text-muted">
          <label htmlFor={name} className="form-label">
            {children}{' '}
            {required ? <span className="text-danger"> * </span> : ''}
          </label>
        </small>
        <input
          type="file"
          className="form-control form-control-md"
          name={name}
          placeholder={example}
          required={required}
          accept={accept}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export function Textarea({
  name,
  children,
  example,
  rows = 5,
  required = true,
  value,
  onChange,
}) {
  const [v, setV] = useState('');
  if (!onChange) {
    onChange = (e) => {
      setV(e.target.value);
    };
  }
  useEffect(() => {
    if (value) {
      setV(value);
    }
  }, [value, onChange]);
  return (
    <>
      <div>
        <small className="text-muted">
          <label htmlFor={name} className="form-label">
            {children}{' '}
            {required ? <span className="text-danger"> * </span> : ''}
          </label>
        </small>
        <textarea
          rows={rows}
          className="form-control form-control-md"
          name={name}
          placeholder={example}
          required={required}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export function Submit({ children, loadingState = false }) {
  return (
    <>
      <button
        type="submit"
        className="form-control btn btn-lg btn-primary mt-3"
      >
        {loadingState ? <Spinner size="md" my={0} text="white" /> : children}
      </button>
    </>
  );
}

export function Select({
  name,
  required = true,
  children,
  items = [],
  onChange,
  value,
}) {
  const [v, setV] = useState('');
  if (!onChange) {
    onChange = (e) => {
      setV(e.target.value);
    };
  }
  useEffect(() => {
    if (value) {
      setV(value);
    }
  }, [value, onChange]);
  return (
    <div>
      <small className="text-muted">
        <label htmlFor={name} className="form-label">
          {children} {required ? <span className="text-danger"> * </span> : ''}
        </label>
      </small>
      <select
        className="form-select"
        name={name}
        aria-label={name}
        required={required}
        onChange={onChange}
        value={v}
      >
        {items.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
