import React, { useState } from "react";
interface CustomInputProps {
  type: "text" | "number" | "email" | "password" | "date";
  placeholder?: string;
  label?: string;
  onInputChange?: (value: string) => void;
}

const FloatingInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  label,
  onInputChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [delayedBlur, setDelayedBlur] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onInputChange) {
      onInputChange(newValue);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    if (!inputValue) {
      setDelayedBlur(true);
      setTimeout(() => {
        setDelayedBlur(false);
        setIsFocused(false);
      }, 300); // Delay in milliseconds
    }
  };

  return (
    <div className="relative mt-6">
      <input
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className={`w-full p-3 border-solid border-2  focus:outline-none ${
          isFocused ? " border-blue-800" : "border-gray-300"
        } `}
        placeholder={isFocused ? "" : placeholder}
      />
      <label
        className={`absolute left-3 -top-3 px-1 bg-white text-blue-800 font-medium ${
          isFocused || inputValue ? "text-sm" : "hidden"
        } ${
          delayedBlur
            ? "transition-transform delay-300"
            : "transition-transform"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
