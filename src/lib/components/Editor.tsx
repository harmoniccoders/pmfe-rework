import React, { useEffect, useState } from 'react';

// Components
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
const htmlToDraft =
  typeof window === 'object' && require('html-to-draftjs').default;
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';

const Editor = dynamic<EditorProps>(
  //@ts-ignore
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const WYSIWYGEditor = ({ onChange, value }: { onChange: any; value: any }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : '';
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const onEditorStateChange = (editorState: any) => {
    setUpdated(true);
    setEditorState(editorState);
    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
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
