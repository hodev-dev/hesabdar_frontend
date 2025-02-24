import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={"flex flex-col w-2/12 h-auto bg-gray-200 print:hidden"}>
      <Link to={'/'}>
        <button className={"w-full h-auto p-3 text-right border border-gray-300 font-small hover:bg-blue-800 hover:text-white"}>مدریت مرکز هزینه ها</button>
      </Link>
      <Link to={'/label'}>
        <button className={"w-full h-auto p-3 text-right border border-gray-300 font-small hover:bg-blue-800 hover:text-white"}>مدریت شرح هزینه</button>
      </Link>
      <Link to={'/manageCosts'}>
        <button className={"w-full h-auto p-3 text-right border border-gray-300 font-small hover:bg-blue-800 hover:text-white"}>مدریت هزینه ها</button>
      </Link>
      {/* <Link to={'/tahsimLabel'}>
        <button className={"w-full h-auto p-3 text-right border border-gray-300 font-small hover:bg-blue-800 hover:text-white"}>مدریت شرح تسهیم</button>
      </Link> */}
      <Link to={'/sectionSum'}>
        <button className={"w-full h-auto p-3 text-right border border-gray-300 font-small hover:bg-blue-800 hover:text-white"}>گزترش ثانویه تسهیم</button>
      </Link>
      {/* <Link to={'/tahsimLog'}>
        <button className={"w-full h-auto p-3 text-right border border-gray-300 font-small hover:bg-blue-800 hover:text-white"}>گزارش کلی تسهیم</button>
      </Link> */}
    </div>
  )
}

export default Sidebar
