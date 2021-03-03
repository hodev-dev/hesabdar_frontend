import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div className={"flex flex-row w-full h-auto"}>
      <div className={"flex flex-col w-10/12 h-screen bg-gray-300"}>
        <div className={"w-full h-auto bg-gray-200 "}>
          <Link to={'addNewSection'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>افزودن مرکز هزینه </button>
          </Link>
        </div>
        <div className={"flex items-center justify-center w-full h-auto mt-2 bg-gray-300"}>
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tr className={"text-gray-700 border border-gray-300"}>
              <th className={"p-4 font-bold"}>ردیف</th>
              <th className={"p-4 font-bold"}>نام مرکز</th>
              <th className={"p-4 font-bold"}>گروه</th>
              <th className={"p-4 font-bold"}>تعداد پرسنل</th>
              <th className={"p-4 font-bold"}>میزان تولید</th>
              <th className={"p-4 font-bold"}>عملیات</th>
            </tr>
            <tr className={"font-medium text-center"}>
              <td>۱</td>
              <td>قیچی</td>
              <td>تولید</td>
              <td>۲۰۰۰</td>
              <td>۶۰۰۰۰</td>
              <td className={"flex flex-col"}>
                <button className={"w-full h-auto p-2 bg-yellow-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>ویرایش</button>
                <button className={"w-full h-auto p-2 bg-red-300 border border-gray-200 border-none font-small hover:bg-red-500"}>حذف</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default Home
