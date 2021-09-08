import {useState} from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
    
  function transition(mode, replace=false) {
    setMode(mode);
    const newHistory = replace ? history.slice(0, history.length -1) : [...history];
    newHistory.push(mode);
    setHistory(newHistory);
  }

  function back() {
   
    if(history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length-1]);
    }
  }

  return { mode, transition, back };
 
}