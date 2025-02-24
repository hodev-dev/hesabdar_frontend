import PN from 'persian-number';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const Home = () => {
  let history = useHistory();
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request_section();
  }, [])

  const request_section = () => {
    Axios.get('/get_section').then((response) => {
      setSections(response.data);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleRemove = ({ id }) => {
    Axios.post('/remove_section', { 'id': id }).then((response) => {
      console.log({ response });
      request_section();
    });
  }

  const goToUpdate = (section) => {
    history.push({
      pathname: '/updateSection',
      state: { section }
    });
  }
  const createLabel = ({ tahsimlable_id }) => {
    if (tahsimlable_id === 1) {
      return 'بر اساس پرسنل';
    } else if (tahsimlable_id === 2) {
      return 'بر اساس تولید';
    } else {
      return '-';
    }
  }

  let renderTable;

  if (isLoading) {
    renderTable = (
      <tr>
        <td>loading</td>
      </tr>
    );
  } else {
    renderTable = sections.map((section) => {
      return (
        <tr key={section.id} className={"font-medium text-center hover:bg-gray-300"}>
          <td className={"p-1 font-mono text-lg"}>{PN.convertEnToPe(Number(section.id))}</td>
          <td className={"p-1 font-mono text-lg"}>{PN.convertEnToPe(Number(section.code))}</td>
          <td className={"p-1 font-mono text-lg"}>{section.name}</td>
          <td className={"p-1 font-mono text-lg"}>{PN.convertEnToPe(Number(section.group_id))}</td>
          <td className={"p-1 font-mono text-lg"}>{PN.convertEnToPe(Number(section.users))}</td>
          <td className={"p-1 font-mono text-lg"}>{PN.convertEnToPe(Number(section.produce).toLocaleString())}</td>
          <td className={"p-1 font-mono text-lg"}>{(Number(section.sharable) === 1) ? 'تسهیم شده' : '-'}</td>
          <td className={"p-1 font-mono text-lg"}>{PN.convertEnToPe(Number(section.share_order))}</td>
          <td className={"p-1 font-mono text-lg"}>{createLabel(section)}</td>
          <td className={"p-1 font-mono text-lg"} className={"flex flex-col"}>
            <button onClick={() => goToUpdate(section)} className={"w-full h-auto p-2 bg-yellow-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>ویرایش</button>
            {/* <button onClick={() => handleRemove(section)} className={"w-full h-auto p-2 bg-red-300 border border-gray-200 border-none font-small hover:bg-red-500"}>حذف</button> */}
          </td>
        </tr >
      )
    });
  }

  return (
    <div className={"sticky top-0 flex flex-row w-full h-auto overflow-hidden bg-red-400"}>
      <div className={"flex flex-col w-10/12 h-screen overflow-y-scroll bg-gray-300"}>
        <div className={"w-full h-auto bg-gray-200 "}>
          {/* <Link to={'addNewSection'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>افزودن مرکز هزینه </button>
          </Link> */}
        </div>
        <div className={"flex items-center justify-center w-full h-auto mt-2 bg-gray-300"}>
          <table className={"w-11/12 h-auto p-2 bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tbody>
              <tr className={"text-gray-700 border border-gray-300"}>
                <th className={"p-4 font-bold"}>ردیف</th>
                <th className={"p-4 font-bold"}>کد</th>
                <th className={"p-4 font-bold"}>نام مرکز</th>
                <th className={"p-4 font-bold"}>گروه</th>
                <th className={"p-4 font-bold"}>تعداد پرسنل</th>
                <th className={"p-4 font-bold"}>میزان تولید</th>
                <th className={"p-4 font-bold"}>وضعیت تسهیم</th>
                <th className={"p-4 font-bold"}>ترتیب تسهیم</th>
                <th className={"p-4 font-bold"}>روش تهسیم</th>
                <th className={"p-4 font-bold"}>عملیات</th>
              </tr>
              {renderTable}
            </tbody>
          </table>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default Home
