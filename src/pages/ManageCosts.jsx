import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { WaveSpinner } from "react-spinners-kit";
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const ManageCosts = () => {
  let history = useHistory();
  const importExelRef = useRef(null);

  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request_section();
  }, [])

  const request_section = () => {
    Axios.get('/get_section_cost').then((response) => {
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

  const handelExelImport = (event) => {
    const file = importExelRef.current.files[0];
    console.log({ file });
    var formData = new FormData();
    formData.append("exel", file);
    Axios.post('/import_cost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      request_section();
    }).catch(({ err }) => {
      console.log({ err });
    });
  }

  const handleClickOnImportExel = () => {
    importExelRef.current.click();
  }

  const goToCosts = (section) => {
    history.push({
      pathname: '/listCosts',
      state: { section }
    });
  }

  const goToSectionTahsim = (section) => {
    history.push({
      pathname: '/sectionTahsim',
      state: { section }
    });
  }

  let renderTable;

  if (isLoading) {
    renderTable = (
      <tr>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
      </tr>
    );
  } else {
    renderTable = sections.map((section) => {
      return (
        <tr key={section.id} className={"font-medium text-center hover:bg-gray-300"}>
          <td>{section.id}</td>
          <td>{section.name}</td>
          <td>{section.group_id}</td>
          <td>{section.users}</td>
          <td>{section.produce}</td>
          <td className={"flex flex-col"}>
            <button onClick={() => goToCosts(section)} className={"w-full h-auto p-2 text-white bg-blue-800 border border-gray-200 border-none font-small hover:bg-blue-500"}>مدریت هزینه</button>
            <button onClick={() => goToSectionTahsim(section)} className={"w-full h-auto p-2 text-white border border-gray-200 border-none bg-violet-800 font-small hover:bg-violet-500"}>گزارش تسهیم</button>
          </td>
        </tr >
      )
    });
  }

  return (
    <div className={"flex flex-row w-full h-auto overflow-hidden"}>
      <div className={"flex flex-col w-10/12 h-screen overflow-y-auto bg-gray-300"}>
        <div className={"w-full h-12 bg-gray-200 "}>
          <Link to={'addNewSection'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>افزودن مرکز هزینه </button>
          </Link>
          <button onClick={handleClickOnImportExel} className={"w-auto h-auto p-3 text-center text-white bg-green-600 hover:bg-green-500"}>Exel ورودی</button>
        </div>
        <div className={"flex items-center justify-center w-full h-auto mt-2 bg-gray-300"}>
          <input onChange={handelExelImport} ref={importExelRef} type="file" name="exel" id="" className={"hidden"} multiple />
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tbody>
              <tr className={"text-gray-700 border border-gray-300"}>
                <th className={"p-4 font-bold"}>ردیف</th>
                <th className={"p-4 font-bold"}>نام مرکز</th>
                <th className={"p-4 font-bold"}>گروه</th>
                <th className={"p-4 font-bold"}>تعداد پرسنل</th>
                <th className={"p-4 font-bold"}>میزان تولید</th>
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

export default ManageCosts
