import React, { useEffect, useRef, useState } from 'react'

const App = ({ columns, rows }) => {
  const rootRef = useRef();
  const [start, setStart] = useState(0);
  const [table, setTable] = useState([])
  
  function getTopHeight() {
    return 40 * start;
  }
  function getBottomHeight() {
    return 40 * (table.length - (start + 10 + 1));
  }

  useEffect(() => {
    function makeTableData(w, h) {
      return new Array(h).fill(0).map((_, row) => {
        const obj = {}
        for(let i = 0; i < w; i++) {
          obj[i] = i === 0 ? row : i
        }
        return obj;
      });
    }
    const tableData = makeTableData(columns, rows)
    setTable(tableData)
  }, [])
  
  useEffect(() => {
    function onScroll(e) {
      setStart(
        Math.floor(e.target.scrollTop / 40)
      );
    }
    rootRef.current.addEventListener('scroll', onScroll);

    return () => {
      rootRef.current.removeEventListener('scroll', onScroll);
    }
  }, [table.length]);
  
  return (
    <div style={{ height: 40 * 10 + 1, overflow: 'auto' }} ref={rootRef}>
    <div style={{ height: getTopHeight() }} />
    <table>
      <tbody>
        {table.slice(start, start + 10 + 1).map((row, rowIndex) => (
          <tr
            style={{ height: 40 }}
            key={start + rowIndex}
          >{Object.values(row).map((text, colIndex) => (
            <td key={start + '' + rowIndex + colIndex}>{text}</td>
          ))}</tr>
        ))}
      </tbody>
    </table>
    <div style={{ height: getBottomHeight() }} />  
    </div>
  )
}

export default App