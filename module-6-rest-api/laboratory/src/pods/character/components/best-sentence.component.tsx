import React from 'react';
import { Button } from '@mui/material';
import { ListItemComponent } from './list-item.component';
import { Form, Formik } from 'formik';
import { TextFieldComponent } from '#common/components';
import * as classes from '../character.styles';
import { CharacterEntityVm } from '../character.vm';
import { formValidation } from '../character.validations';

interface BestSentenceProps {
  character: CharacterEntityVm;
  onSave: (character: CharacterEntityVm) => void;
}

export const BestSentenceComponent: React.FC<BestSentenceProps> = ({
  character,
  onSave,
}) => {
  const isMockMode = import.meta.env.VITE_USE_MOCK_SERVER === 'true';

  if (!isMockMode || !character) {
    return null;
  }

  return (
    <>
      <ListItemComponent
        item="Best sentence"
        value={character.bestSentence || 'No sentence yet'}
      />

      <Formik
        initialValues={{ bestSentence: character.bestSentence || '' }}
        enableReinitialize
        validate={formValidation.validateForm}
        onSubmit={(values) => {
          onSave({ ...character, bestSentence: values.bestSentence });
        }}
      >
        {() => (
          <Form className={classes.root}>
            <TextFieldComponent
              name="bestSentence"
              label="Añade o actualiza su mejor frase"
            />
            <Button type="submit" variant="contained" color="primary">
              Guardar 💾
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
