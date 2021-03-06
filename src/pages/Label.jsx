import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const Label = () => {
  let history = useHistory();
  const importExelRef = useRef(null);
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request_label();
  }, [])

  const request_label = () => {
    Axios.get('/get_label').then((response) => {
      setLabels(response.data);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleRemove = ({ id }) => {
    Axios.post('/remove_label', { 'id': id }).then((response) => {
      request_label();
    });
  }

  let renderTable;

  if (isLoading) {
    renderTable = (
      <tr>
        <td>loading</td>
      </tr>
    );
  } else {
    renderTable = labels.map((label) => {
      return (
        <tr key={label.id} className={"font-medium text-center"}>
          <td>{label.id}</td>
          <td>{label.code}</td>
          <td>{label.group_code}</td>
          <td>{label.name}</td>
          <td className={"flex flex-col"}>
            <button onClick={() => handleRemove(label)} className={"w-full h-auto p-2 bg-red-300 border border-gray-200 border-none font-small hover:bg-red-500"}>حذف</button>
          </td>
        </tr >
      )
    });
  }

  const handelExelImport = (event) => {
    const file = importExelRef.current.files[0];
    console.log({ file });
    var formData = new FormData();
    formData.append("exel", file);
    Axios.post('/import_label', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log({ response });
      request_label();
    }).catch(({ err }) => {
      console.log({ err });
    });
  }

  const handleExportExcel = () => {
    Axios.get('/export_label').then((response) => {
      const link = document.createElement('a');
      link.href = Axios.defaults.baseURL + '/export_label/';
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch(({ err }) => {
      console.log({ err });
    });
  }

  const handleClickOnImportExel = () => {
    importExelRef.current.click();
  }

  return (
    <div className={"flex flex-row w-full bg-gray-200"}>
      <div className={"flex flex-col w-10/12 h-screen bg-gray-300"}>
        <div className={"w-full h-auto bg-gray-200 "}>
          <Link to={'addLabel'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-500"}>افزودن شرح هزینه </button>
            {/* <button className={"w-auto h-auto p-3 text-center text-white bg-green-600 hover:bg-blue-400"}>exel خروجی</button> */}
          </Link>
          <button onClick={handleClickOnImportExel} className={"w-auto h-auto p-3 text-center text-white bg-green-600 hover:bg-green-500"}>Exel ورودی</button>
          <button onClick={handleExportExcel} className={"w-auto h-auto p-3 text-center text-white bg-green-600 hover:bg-green-500"}>Exel خروجی</button>
        </div>
        <div className={"flex items-center justify-center w-full h-auto mt-2 bg-gray-300"}>
          <input onChange={handelExelImport} ref={importExelRef} type="file" name="exel" id="" className={"hidden"} multiple />
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tbody>
              <tr className={"text-gray-700 border border-gray-300"}>
                <th className={"p-4 font-bold"}>ردیف</th>
                <th className={"p-4 font-bold"}>کد</th>
                <th className={"p-4 font-bold"}>کد گروه</th>
                <th className={"p-4 font-bold"}>شرح هزینه</th>
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

export default Label
