/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBtn = styled.div`
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-light);
  padding: 4px;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-dark);
    transform: translateX(-1rem);
  }
`;

const ImageContainer = styled.div`
  width: 25px;
  border-radius: 50%;
  padding: 2px;
`;

const TextContainer = styled.div`
  color: var(--color-light);
  font-size: var(--fs-small);
  font-weight: var(--fw-medium);
`;

function ProfileBtn({ userObject }) {
  const splitArray = userObject.displayName.split(" ");
  const finalName = splitArray[0] + " " + splitArray[1][0] + ".";
  const navigate = useNavigate();

  return (
    <StyledBtn onClick={() => navigate("/profile")}>
      <ImageContainer>
        <img src={userObject.photo} alt='user photo or logo' />
      </ImageContainer>
      <TextContainer>
        <span>{finalName}</span>
      </TextContainer>
    </StyledBtn>
  );
}

export default ProfileBtn;
