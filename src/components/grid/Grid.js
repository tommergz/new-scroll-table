import React, { useEffect, useRef, useState } from 'react'
import './Grid.css'

export const Grid = ({ columns, rows, rowHeight }) => {
  const rootRef = useRef(null);
  const [start, setStart] = useState(0);
  const [table, setTable] = useState([]);
  const timeOut = 100
  
  function getTopHeight() {
    return rowHeight * start;
  }
  function getBottomHeight() {
    return rowHeight * (table.length - (start + 10 + 1));
  }

  useEffect(() => {
    function makeTableData(w, h) {
      return new Array(h).fill(0).map((_, row) => {
        const obj = {}
        for(let i = 0; i < w; i++) {
          obj[i] = i === 0 ? row : null
        }
        return obj;
      });
    }
    const tableData = makeTableData(columns, rows)
    setTable(tableData)
  }, [columns, rows])
  
  useEffect(() => {
    function onScroll(e) {
      setTimeout(() => {
        setStart(
          Math.floor(e.target.scrollTop / rowHeight)
        );
      }, timeOut);
    }

    rootRef.current.addEventListener('scroll', onScroll);

    return () => {
      rootRef.current.removeEventListener('scroll', onScroll);
    }
  }, [table.length, rowHeight, rootRef]);
  
  return (
    <div style={{ height: rowHeight * 10 + 1, overflow: 'auto' }} ref={rootRef}>
      <div style={{ height: getTopHeight() }} />
      
      <table>
        <tbody>
          {table.slice(start, start + 10 + 1).map((row, rowIndex) => (
            <tr
              style={{ height: rowHeight }}
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
