import { ChangeEvent, useState, useContext } from 'react';

import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  // const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const { addNewEntry } = useContext(EntriesContext);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='New Entry'
            autoFocus
            multiline
            label='New Entry'
            helperText={inputValue.length <= 0 && touched && 'Add new value'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => setTouched(true)}
          />
          <Box
            display='flex'
            justifyContent='space-between'
            onClick={() => setIsAddingEntry(false)}>
            <Button variant='text'>Cancel</Button>
            <Button
              variant='outlined'
              color='secondary'
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}>
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          fullWidth
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={() => setIsAddingEntry(true)}>
          Add new task
        </Button>
      )}
    </Box>
  );
};
