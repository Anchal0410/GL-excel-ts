import React from 'react';

interface PreviewTableProps {
  data: any[];
}

const PreviewTable: React.FC<PreviewTableProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Get headers from the first row
  const headers = Object.keys(data[0]).filter(key => key !== '_raw');

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">File Preview</h3>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.slice(0, 10).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {String(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 10 && (
          <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
            Showing first 10 rows of {data.length} total rows
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewTable;