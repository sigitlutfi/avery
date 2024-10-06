// src/helpers/DynamicIcon.js
import React from 'react';
import * as Iconly from 'react-native-iconly';

const Iconl = ({
  iconName,
  set = 'bold',
  color = 'black',
  size = 'medium',
}) => {
  const IconComponent = Iconly[iconName];

  if (!IconComponent) {
    return null; // or return a default icon or text
  }

  return <IconComponent set={set} primaryColor={color} size={size} />;
};

export default Iconl;
