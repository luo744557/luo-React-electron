import React, { useEffect, useRef, } from 'react';
import JSONEditorLib, { JSONEditorOptions, JSONEditorMode } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './index.less';

interface Props {
  value: string | number | boolean | object | [];
  onChange: (value: string) => void;
  options?: JSONEditorOptions;
  style?: React.CSSProperties;
}

interface optionProps {
  mode: JSONEditorMode,
  modes?: Array<JSONEditorMode>,
  onChangeJSON?: (value: string) => void;
}
const JSONEditor = (props: Props) => {
  const container: any = useRef<HTMLInputElement | null>(null);
  const jsoneditorRef: any = useRef<any | null>(null);
  const { value, onChange } = props;
  useEffect(() => {
    const options: optionProps = {
      mode: 'code',
      modes: ['code', 'tree', 'form', 'view', 'text'],
      onChangeJSON: onChange,
    };
    jsoneditorRef.current = new JSONEditorLib(container.current, options);
    jsoneditorRef.current.set(value);

    return () => {
      if (jsoneditorRef.current) {
        jsoneditorRef.current.destroy();
      }
    };
  }, [value, onChange]);

  useEffect(() => {
    if (jsoneditorRef.current) {
      jsoneditorRef.current.update(value || {});
    }
  }, [value]);
  
  return (
    <div id="jsoneditor" className="jsoneditor-react-container" ref={container}>
    </div>
  )
}

export default JSONEditor;