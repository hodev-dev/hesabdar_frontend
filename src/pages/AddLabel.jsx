import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const AddLabel = () => {
  let history = useHistory();
  const [name, setName] = useState('');

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value)
  }
  const onSubmit = async () => {
    const response = await Axios.post('/add_label', { name });
    history.push('/label');
  }

  return (
    <div className={"flex flex-row w-full h-auto"}>
      <div className={"flex flex-col w-10/12 h-screen bg-gray-300"}>
        <div className={"w-full h-auto bg-gray-200 "}>
          <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>بازگشت</button>
        </div>
        <div className={"flex flex-col items-center justify-center w-full h-screen mt-0.5 bg-gray-300"}>
          <div className={'flex flex-col items-center justify-center w-6/12 mx-auto '}>
            <input onChange={handleName} defaultValue={name} type="text" className={"w-8/12 h-10 p-4 mt-2"} placeholder={"نام شرح هزینه"} dir={'rtl'} />
            <button onClick={onSubmit} className={"w-8/12 p-2 mt-4 mb-4 text-xl text-white bg-blue-500"}>ثبت</button>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default AddLabel
