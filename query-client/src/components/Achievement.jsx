import React from 'react'

const Achievement = ({counts}) => {
  return (
    <div className='p-2'>
        <div className="mt-5 bg-gray-100 p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Number Achievement</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-xl font-bold text-blue-600">{counts.queryCount}</p>
              <p className="text-gray-500">Queries</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-purple-600">{counts.recommendationCount}</p>
              <p className="text-gray-500">Recommendations</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-600">{counts.queryCount + counts.recommendationCount}</p>
              {/* <p className="text-xl font-bold text-green-600">{counts.activityCount}</p> */}
              <p className="text-gray-500">Activity</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-yellow-500">{counts.userCount}</p>
              <p className="text-gray-500">Users</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Achievement