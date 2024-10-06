import { Center, Stack } from 'native-base';
import React, { useContext, useState } from 'react';

import Board from '../components/Board';
import Cext from '../components/Cext';
import Cinput from '../components/Cinput';
import Cutton from '../components/Cutton';
import { ConfigContext } from '../contexts/ConfigContext';

const Error = () => {
  const { error, config, retryLoadConfig, setConfigValue, debug, toggleDebug } =
    useContext(ConfigContext);
  const [text, setText] = useState(config.url);

  return (
    <Board>
      <Stack flex={1} alignItems={'center'} justifyContent={'center'}>
        {debug ? (
          <Stack space={1}>
            <Cext>E: {error}</Cext>
            <Cext>url: {config.url}</Cext>
            <Cinput
              label={'endpoint'}
              value={text}
              onChangeText={(v) => setText(v)}
            />
            <Cutton
              title={'setEndPoint'}
              onPress={() => setConfigValue('url', text)}
            ></Cutton>

            <Cutton title={'reload'} onPress={() => retryLoadConfig()}></Cutton>
            <Cutton
              title={'setDebugFalse'}
              onPress={() => toggleDebug(false)}
            ></Cutton>
          </Stack>
        ) : (
          <Center>
            <Cext>E: {error}</Cext>
            <Cutton title={'reload'} onPress={() => retryLoadConfig()}></Cutton>
          </Center>
        )}
      </Stack>
    </Board>
  );
};

export default Error;
