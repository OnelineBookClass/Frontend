import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
export const ScrollContainer = styled(Box)({
    display: 'flex',
    overflowX: 'auto',
    padding: '1rem 0',
    gap: '1rem',
    maxWidth: '100%',
});

export const Title = styled('div')`
    font-weight: bold;
    font-size: clamp(1rem, 5vw, 2rem);
    text-align: left;
    margin-bottom: 1rem;
    margin-left: 3rem;
`;

export const StyledHr = styled('hr')`
  width: 100%;
  border: 0;
  border-top: 2px solid #ccc;
  margin: 0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
`;
