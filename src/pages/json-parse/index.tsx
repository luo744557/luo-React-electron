import React, { useState } from 'react';
import { Button } from 'antd';
import JSONEditor from '../../component/json-editor';

const Welcome = () => {
  // const { initialState } = useModel('@@initialState');
  const [mode, setMode] = useState('tree');
  const [text, setText] = useState({});
  const json = {
    'array': [1, 2, 3],
    'boolean': true,
    'null': null,
    'number': 'four',
    'object': {'a': 'b', 'c': 'd'},
    'string': 'Hello World'
  };

  const modes: Array<string> = ['tree', 'form', 'view', 'code', 'text'];

  const onModeChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const onChangeText = () => {
    setText(json);
  };

  return (
    <div className="contents">
      <Button onClick={onChangeText}>change text</Button>
      <div className="mode">
        mode: <select aria-label="select mode" value={mode} onChange={onModeChangeSelect}>
          {
            modes.map(mode => <option key={mode} value={mode}>{mode}</option>)
          }
        </select>
      </div>
      <JSONEditor value={text} onChange={onChangeText} />
    </div>
  );
};

export default Welcome;
