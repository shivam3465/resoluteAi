const arr = [
  {
    isCompleted: false,
    title: "ac",
    desc: "c",
    dueDate: "2023-06-10",
    id: "E8jZf8TQKJLTeBtQ7yKZ",
  },

  {
    title: "ab",
    isCompleted: true,
    dueDate: "2023-06-14",
    desc: "Next task is to make login page look good ",
    id: "W9xBsIswRsHeL1XGiY3Q",
  },

  {
    title: "aa",
    desc: "a",
    isCompleted: true,
    dueDate: "2023-06-12",
    id: "f242bptCuYCnxW1D7chE",
  },

  {
    dueDate: "2023-06-10",
    title: "bb",
    desc: "b",
    isCompleted: true,
    id: "hchqFUOul1a6pMNvalQs",
  },

  {
    isCompleted: false,
    desc: "ba",
    title: "cd",
    dueDate: "2023-06-14",
    id: "kY42iD4HwnZBTem9RQTE",
  },
  {
    dueDate: "2023-06-10",
    isCompleted: true,
    desc: "cb",
    title: "bc",
    id: "l7yZLYPG536WkLvEWYE3",
  },
];

newArr=arr.sort((a,b)=>{
    let fa = a.isCompleted,
        fb = b.isCompleted;

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
})


console.log(newArr);