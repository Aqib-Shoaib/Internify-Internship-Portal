/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "@/components/ui/input";

function KeywordsInput({ onKeywordsChange, placeholder }) {
  const [inputValue, setInputValue] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newKeyword = inputValue.trim();
      if (newKeyword && !keywords.includes(newKeyword)) {
        const updatedKeywords = [...keywords, newKeyword];
        setInputValue("");
        setKeywords(updatedKeywords);
        onKeywordsChange(updatedKeywords); // Pass the updated keywords to the parent
      }
    }
  };

  const removeKeyword = (index) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(updatedKeywords);
    onKeywordsChange(updatedKeywords); // Pass the updated keywords to the parent
  };

  return (
    <div className='flex flex-col gap-3'>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='border-border text-foreground px-3 py-2 rounded-lg focus:ring focus:ring-ring/50'
      />
      <div className='flex flex-wrap gap-2 mt-2'>
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className='flex items-center gap-1 bg-accent text-accent-foreground py-1 px-2 rounded-md'
          >
            <span>{keyword}</span>
            <button
              type='button'
              onClick={() => removeKeyword(index)}
              className='text-destructive text-xl'
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeywordsInput;
