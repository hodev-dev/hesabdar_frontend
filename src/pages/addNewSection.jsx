import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const Home = () => {
  const [name, setName] = useState('');
  const [group, setGroup] = useState(0);
  const [workers, setWorkers] = useState(0);
  const [produce, setProduce] = useState(0);

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value)
  }

  const handleGroup = (event) => {
    setGroup(event.target.value);
  }

  const handleWorkers = (event) => {
    setWorkers(event.target.value);
  }
  const handleProduce = (event) => {
    setProduce(event.target.value);
  }

  const onSubmit = async () => {
    console.log(name, group, workers, produce);
    const response = await Axios.post('/add_section', { name });
    console.log(response);
  }

  return (
    <div className={"flex flex-row w-full h-auto"}>
      <div className={"flex flex-col w-10/12 h-screen bg-gray-300"}>
        <div className={"w-full h-auto bg-gray-200 "}>
          <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>بازگشت</button>
        </div>
        <div className={"flex flex-col items-center justify-center w-full h-screen mt-0.5 bg-gray-300"}>
          <div className={'flex flex-col items-center justify-center w-6/12 mx-auto '}>
            <input onChange={handleName} defaultValue={name} type="text" className={"w-8/12 h-10 p-4 mt-2"} placeholder={"نام مرکز هزینه"} dir={'rtl'} />
            <select onChange={handleGroup} defaultChecked={0} defaultValue={produce} name="sellect" className={"w-8/12 h-10 p-1 mt-4 bg-gray-100"} id="" dir={'rtl'}>
              <option value="0">تولید</option>
              <option value="1">خدمات</option>
              <option value="2">اداری</option>
            </select>
            <input onChange={handleWorkers} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"تعداد پرسنل"} dir={'rtl'} />
            <input onChange={handleProduce} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"میزان تولید"} dir={'rtl'} />
            <button onClick={onSubmit} className={"w-8/12 p-2 mt-4 mb-4 text-xl text-white bg-blue-500"}>ثبت</button>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default Home
