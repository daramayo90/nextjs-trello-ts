import { DragEvent, FC, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { setIsDragging } = useContext(UIContext);
  /**
   * Update the state to indicate where the draggable action can be done
   * Works in the same way as localStorage (setData - getData) - (key, value)
   * Check EntryList
   */
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('card', entry._id);
    setIsDragging(true);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Card sx={{ marginBottom: 1 }} draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ displayFlex: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>30 minutes ago</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
