import React from 'react';
import { CharacterEntityVm } from './character.vm';
import { Box, List, Paper, Typography } from '@mui/material';
import { BestSentenceComponent, ListItemComponent } from './components';

interface CharacterProps {
  character: CharacterEntityVm;
  onSave: (character: CharacterEntityVm) => void;
}

export const CharacterComponent: React.FunctionComponent<CharacterProps> = ({
  character,
  onSave,
}) => {
  return (
    <Box>
      <Box
        component="header"
        sx={{
          backgroundImage: `url(${character.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: 300, md: 450 },
          width: '100%',
        }}
      />

      <Box p={{ xs: 2, md: 4 }} maxWidth="md" margin="0 auto">
        <Typography variant="h3" gutterBottom textAlign="center">
          {character.name}
        </Typography>

        <Paper elevation={2} sx={{ mt: 3, p: 2, borderRadius: 2 }}>
          <List>
            <ListItemComponent item="Estado" value={character.status} />
            <ListItemComponent item="Especie" value={character.species} />
            <ListItemComponent item="Género" value={character.gender} />
            <ListItemComponent
              item="Tipo"
              value={character.type === '' ? 'N/A' : character.type}
            />
            <ListItemComponent item="Origen" value={character.origin.name} />
            <ListItemComponent
              item="Última ubicación"
              value={character.location.name}
            />
            <ListItemComponent
              item="Número de episodios"
              value={character.episode.length.toString()}
            />
            <BestSentenceComponent character={character} onSave={onSave} />
          </List>
        </Paper>
      </Box>
    </Box>
  );
};
