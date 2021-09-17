import styled from '@emotion/styled';
export const Wrapper = styled.div`
  text-align: center;
`;

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 300px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
