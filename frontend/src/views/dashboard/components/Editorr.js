import React from 'react'
import {  Tooltip } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import CircularProgress from '@mui/material/CircularProgress';

import '../Tickets/TicketModal.css'; 

export const Editorr = ({ editorState, setEditorState, handleAddImage, isuplading }) => {
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName="editor-toolbar"

        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'link',
            'embedded',
          ],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          list: { options: ['unordered', 'ordered'] },
          textAlign: { options: ['left', 'center', 'right', 'justify'] },
          embedded: { options: ['embedded'] },
        }}
        toolbarCustomButtons={[
          <Tooltip title="Add an image" key="image-tooltip">
            <CropOriginalIcon
              onClick={handleAddImage}
              style={{
                cursor: 'pointer',
                width: '25px',
                marginTop: '5px',
                overflow: 'clip',
              }}
            />
            {isuplading && (
              <CircularProgress
                key="spinner"
                style={{ marginLeft: '10px', width: '25px' }}
              />
            )}
          </Tooltip>,
        ]}
        wrapperClassName="editor-wrapper"
        editorClassName="editor-content"
      />
    );
  };