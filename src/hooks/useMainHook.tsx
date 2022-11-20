import React, { useState, useEffect } from 'react';

const useMainHook = () => {
  const [isOnline, setIsOnline] = useState(null);
  
  return isOnline ? 'Online' : 'Offline';
}

export default useMainHook