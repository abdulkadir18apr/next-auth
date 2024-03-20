"use client"

import React from 'react';
import { Icon } from '@iconify/react';

const CustomIcon = ({ icon, size = '24', color = 'currentColor' }) => {
  return <Icon icon={icon} width={size} height={size} color={color} />;
};

export default CustomIcon;
