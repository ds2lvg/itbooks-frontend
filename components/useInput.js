import React, { useState } from 'react';

const useInput = (initialValue, validators) => {
  const [value, setValue] = useState(initialValue);
  let onChange = null;
  if(validators) { // 밸리데이션 필요한 경우
    try {
      if(!Array.isArray(validators) || typeof validators[0] !== "function"){
        throw new Error("second parameter must be array includes function");
      }
    } catch (error) {
      console.error(error)
    }

    let willUpdate = [];
    validators.forEach((v, i)=> willUpdate[i]=true);

    onChange = e => {
      const {target: {value}} = e;

      validators.forEach((valid, i)=> willUpdate[i] = valid(value));

      if(willUpdate.every((v) => v === true)) setValue(value); 
    };
  } else {
    onChange = e => {
      const {target: {value}} = e;
      setValue(value);
    }
  }
  return { value, onChange };
};

export default useInput;