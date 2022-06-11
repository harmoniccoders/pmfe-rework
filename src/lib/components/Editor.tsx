import React, { useState } from 'react';

// Components
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const Editor = dynamic<EditorProps>(
  //@ts-ignore
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';

const WYSIWYGEditor = (props: any) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
    console.log('PROPS ==> ', props);
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <>
      <div className="editor">
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </>
  );
};

export default WYSIWYGEditor;
