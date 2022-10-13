import React from 'react';

const useInput = (initialValue: any) => {
  const [value, setValue] = React.useState(initialValue);
  const [isDirty, setDirty] = React.useState(false);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onBlur = (e: any) => {
    setDirty(true);
  };

  return { value, onChange, onBlur };
};

export default useInput;
