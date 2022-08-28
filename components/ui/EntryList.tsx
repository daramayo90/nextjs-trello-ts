import { DragEvent, FC, useContext, useMemo } from 'react';

import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

/** Drop */
export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, setIsDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries],
  );

  /**
   * Spifies where draggable object can be dropped
   * Check EntryCard to understand 'dataTransfer' method
   */
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('card');
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status; // This is the status received from the Component propierty
    updateEntry(entry);
    setIsDragging(false);
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}>
        <List sx={{ opacity: isDragging ? 0.4 : 1, transition: 'all 0.3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
