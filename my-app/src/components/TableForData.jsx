import React from 'react'

const TableForData = ({ tableRows, values }) => {
  console.log('table has been send', tableRows);
  console.log('table has been send', values);
  return (
    <div>


      {tableRows.length > 0 && (
        <div className="table_container">
          <br />
          <table>
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return <th key={index}>{rows}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {values.map((value, index) => {
                return (
                  <tr key={index}>
                    {value.map((val, i) => {
                      return <td key={i}>{val}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableForData
