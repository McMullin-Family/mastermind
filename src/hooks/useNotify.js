import { useState, useEffect, useCallback } from 'react';

export const useNotify = () => {
  const [message, setMessage] = useState(null);

  const notify = useCallback((message) => {
    console.log('notify', message);
    setMessage(message);
  }, []);

  useEffect(() => {
    if (message) {
      alert(message);
      console.log(message);
      setMessage(null);
    }
  }, [message]);

  return notify;
}