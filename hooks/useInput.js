import React, { useCallback, useState } from "react";

const useInput = ({ initialValue = "" }) => {
  const [value, setState] = useState(initialValue);
  const onChange = useCallback((e) => {
    setState(e.target.value);
  }, []);
  return [value, onChange];
};

export default useInput;
