import React, { useState } from 'react';
import { Button, Row, Col, Input, Select, message } from 'antd';
import JSONEditor from '../../component/json-editor';
import './index.less';

const { TextArea } = Input;
const Welcome = () => {
  // const { initialState } = useModel('@@initialState');
  const [mode, setMode] = useState('tree');
  const [inputJson, setInputJson] = useState({});
  const [text, setText] = useState({});

  const modes: Array<string> = ['tree', 'form', 'view', 'code', 'text'];

  const onModeChangeSelect = (val: string) => {
    console.log(val);
    setMode(val);
  };

  const onChangeText = () => {
    setText(inputJson);
  };

  const isJSON = (str: string | Object): Boolean => {
    console.log(str, typeof str)
    if (typeof str === 'string') {
      try {
        var obj = JSON.parse(str);
        console.log(obj)
        if(typeof obj === 'object' && obj ){
          return true;
        } else{
          return false;
        }
      } catch(e) {
        console.log('error：'+str+'!!!'+e);
        return false;
      }
    } else if (typeof str === 'object') {
      return true;
    }
    return false;
  }
  const textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    
    if (!e.target.value) {
      setInputJson({});
    } else {
      const val = e.target.value;
      setInputJson(JSON.parse(val));
      // if (isJSON(val)) {
      //   setInputJson(JSON.parse(val));
      // } else {
      //   message.error('请输入正确的JSON格式内容');
      // }
    }
      // setInputJson(JSON.parse(e.target.value));
  };

  return (
    <div className="json-parse">
      <Row justify="space-between">
        <Col span={8}>
          <Button size='small' type="primary" onClick={onChangeText}>解析JSON</Button>
          <TextArea onBlur={textAreaChange} style={{ height: '75vh', resize: 'none' }} autoSize={false} allowClear placeholder="请填写JSON文本" />
        </Col>
        <Col span={14}>
          <div className="json-container">
            <div className="mode">
              mode: 
              <Select size='small' onChange={onModeChangeSelect} defaultValue={mode}>
                {
                  modes.map(mode => <Select.Option key={mode} value={mode}>{mode}</Select.Option>)
                }
              </Select>
            </div>
            <JSONEditor value={text} onChange={onChangeText} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
