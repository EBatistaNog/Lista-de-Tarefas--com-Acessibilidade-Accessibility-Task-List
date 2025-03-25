import React from 'react';
import { splitWordBySyllables } from '@utils/syllableUtils';

interface DyslexiaWordProps {
  word: string;
}

export function DyslexiaWord({ word }: DyslexiaWordProps) {
  const syllables = splitWordBySyllables(word);

  return (
    <span style={{ display: 'inline-block', fontWeight: 600, fontSize: '1.1rem' }}>
      {syllables.map((syllable, index) => (
        <span key={index} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span>{syllable}</span>
          {index < syllables.length - 1 && (
            <span
              style={{
                margin: '0 3px',
                color: '#bbb',
                fontWeight: 'normal',
                fontSize: '0.9rem'
              }}
            >
              -
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
