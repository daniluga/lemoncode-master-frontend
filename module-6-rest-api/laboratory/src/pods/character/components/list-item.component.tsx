import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

interface ListItemProps {
  item: string;
  value: string;
}

export const ListItemComponent: React.FC<ListItemProps> = ({ item, value }) => {
  return (
    <ListItem>
      <ListItemText primary={item} secondary={value} />
    </ListItem>
  );
};
