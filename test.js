  const fullDate = new Date();
  const year = fullDate.getFullYear().toString();
  const month = (fullDate.getMonth() + 1).toString().padStart(2, "0");
  const day = fullDate.getDate().toString().padStart(2, "0");

  console.log(year,month,day)