import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={"flex flex-col w-2/12 h-screen bg-gray-200"}>
      <Link to={'/'}>
        <button className={"w-full h-auto p-3 text-right border border-gray-300 font-small hover:bg-blue-100"}>مدریت مرکز هزینه ها</button>
      </Link>
    </div>
  )
}

export default Sidebar
