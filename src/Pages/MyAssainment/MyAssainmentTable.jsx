import React from 'react';

const MyAssainmentTable = ({assignment }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Submitted Assignments</h2>
      {assignment.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
             
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Marks</th>
              <th className="px-4 py-2">Obtained Marks</th>
              <th className="px-4 py-2">Feedback</th>
              <th className="px-4 py-2">Submission Date</th>
            </tr>
          </thead>
          <tbody>
           
              <tr key={assignment._id}>
               
                <td className="px-4 py-2">{assignment.status}</td>
                <td className="px-4 py-2">{assignment.mark || 'N/A'}</td>
                <td className="px-4 py-2">
                  {assignment.obtainedMarks || 'Not graded yet'}
                </td>
                {/* <td className="px-4 py-2">
                  {assignment.feedback || 'No feedback'}
                </td> */}
                <td className="px-4 py-2">
                  {new Date(assignment.submissionDate).toLocaleString()}
                </td>
              </tr>
         
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAssainmentTable;
