/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import Profile from './Profile/Profile';
import { JSX } from 'react';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {


  return (
    <Profile route={undefined} navigation={undefined} />
  );
}


export default App;
