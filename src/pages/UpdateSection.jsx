import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const UpdateSection = (props) => {
  const { section } = props.location.state;

  let history = useHistory();
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [group, setGroup] = useState(1);
  const [workers, setWorkers] = useState(0);
  const [produce, setProduce] = useState(0);

  useEffect(() => {
    setId(section.id);
    setName(section.name);
    setGroup(section.group_id);
    setWorkers(section.users);
    setProduce(section.produce);
  }, [])

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value)
  }

  const handleGroup = (event) => {
    console.log('group', event.target.value);
    setGroup(event.target.value);
  }

  const handleWorkers = (event) => {
    setWorkers(event.target.value);
  }
  const handleProduce = (event) => {
    setProduce(event.target.value);
  }

  const onSubmit = async () => {
    const response = await Axios.post('/update_section', { id, name, group, workers, produce });
    history.push('/');
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
            <select value={group} defaultValue={group} onChange={handleGroup} defaultChecked={0} name="sellect" className={"w-8/12 h-10 p-1 mt-4 bg-gray-100"} id="" dir={'rtl'}>
              <option value="1">تولید</option>
              <option value="2">خدمات</option>
              <option value="3">اداری</option>
            </select>
            <input value={workers} onChange={handleWorkers} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"تعداد پرسنل"} dir={'rtl'} />
            <input value={produce} onChange={handleProduce} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"میزان تولید"} dir={'rtl'} />
            <button onClick={onSubmit} className={"w-8/12 p-2 mt-4 mb-4 text-xl text-white bg-blue-500"}>ویرایش رکورد</button>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default UpdateSection
