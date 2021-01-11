import styled from "styled-components";

export const Card = styled.div`
  width: 150px;
  margin: 10px;
  button {
    cursor: pointer;
    height: 270px;
    width: 100%;
    border: none;
    background: none;
  }
  button:hover {
    height: 320px;
    width: 120%;
  }
`;
export const Title = styled.span`
  width: 120px;
  text-align: left;
`;
export const Image = styled.img`
  height: 200px;
  width: 120px;
  /* border-radius: 20px; */
`;

// export const CardVazio = styled.div`
//   background: black;
//   height: 10%;
//   width: 10%;
// `;
