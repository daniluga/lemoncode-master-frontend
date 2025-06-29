import React from 'react';
import { Button, CardActions, Typography } from '@mui/material';
import { CharacterEntityVm } from '../character-collection.vm';

interface CharacterCardActionsProps {
  character: CharacterEntityVm;
  onDetail: (id: number) => void;
}

export const CharacterCardActionsComponent: React.FC<
  CharacterCardActionsProps
> = ({
  character,
  onDetail,
}: CharacterCardActionsProps & {
  onDetail: (id: number) => void;
}) => {
  return (
    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        aria-label="Detail"
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => onDetail(character.id)}
      >
        Más información
      </Button>
    </CardActions>
  );
};
