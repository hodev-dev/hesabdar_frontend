import React, { useEffect } from 'react';

const temp = () => {
  const { section } = props.location.state;
  useEffect(() => {
    setId(section.id);
    setName(section.name);
    setGroup(section.group_id);
    setWorkers(section.users);
    setProduce(section.produce);
  }, [])
  return (
    <div>

    </div>
  )
}

export default temp
