import React from 'react';
import { Typography } from '@mui/material';

interface CharacterInfoProps {
  info: string;
  value: string;
}

export const CharacterInfoComponent: React.FC<CharacterInfoProps> = ({
  info,
  value,
}) => {
  return (
    <Typography variant="subtitle1" gutterBottom>
      <strong>{info}:</strong> {value}
    </Typography>
  );
};
