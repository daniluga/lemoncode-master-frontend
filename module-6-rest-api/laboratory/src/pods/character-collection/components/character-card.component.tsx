import * as React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import * as classes from './character-card.styles';
import { CharacterEntityVm } from '../character-collection.vm';
import { CharacterInfoComponent } from './character-info.component';
import { CharacterCardActionsComponent } from './character-card-actions.component';

interface CharacterProps {
  character: CharacterEntityVm;
  onDetail: (id: number) => void;
}

export const CharacterCard: React.FunctionComponent<CharacterProps> = (
  props
) => {
  const { character, onDetail } = props;
  const isMockMode = import.meta.env.VITE_USE_MOCK_SERVER === 'true';

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="character-id" sx={{ bgcolor: 'primary.main' }}>
            {character.id}
          </Avatar>
        }
        title={character.name}
        subheader={character.species}
      />
      <CardContent>
        <div className={classes.content}>
          <CardMedia
            image={character.image}
            title={character.name}
            style={{ height: 0, paddingTop: '56.25%' }}
          />
          <CharacterInfoComponent info="Status" value={character.status} />
          <CharacterInfoComponent
            info="Episodios"
            value={character.episode.length.toString()}
          />
          {isMockMode && (
            <CharacterInfoComponent
              info="Best sentence"
              value={character.bestSentence}
            />
          )}
        </div>
      </CardContent>
      <CharacterCardActionsComponent
        character={character}
        onDetail={onDetail}
      />
    </Card>
  );
};
