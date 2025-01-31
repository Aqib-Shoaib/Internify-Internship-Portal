/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const KeywordsArray = styled.div`
  display: flex;
  width: 100%;
  gap: 3px;
  flex-wrap: wrap;
  padding: 5px;
  box-sizing: border-box;

  .item {
    display: flex;
    gap: 2px;
    align-items: center;
    justify-content: center;
    color: var(--color-medium-light);
    font-size: var(--fs-small);
    font-weight: var(--fw-light);
    background-color: var(--color-medium-dark);
    border-radius: 5px;
  }
`;

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
    <>
      <input
        className='input'
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <KeywordsArray>
        {keywords.map((keyword, index) => (
          <div key={index} className='item'>
            <span>{keyword}</span>
            <button
              type='button'
              onClick={() => removeKeyword(index)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              ×
            </button>
          </div>
        ))}
      </KeywordsArray>
    </>
  );
}

export default KeywordsInput;
