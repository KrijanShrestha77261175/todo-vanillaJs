// function for local storage
 const setLocalArr = (key) => {
  let taskDataStr = JSON.stringify(key);
  localStorage.setItem("todoTask", taskDataStr);
};

const getLocalArr = (key) => {
  let retString = localStorage.getItem(key);
  return  JSON.parse(retString)??[];
};

// export {setLocalArr, getLocalArr};
