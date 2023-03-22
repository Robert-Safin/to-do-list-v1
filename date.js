


const getDay = () => {

let day = new Date();
let options = {
  weekday: "long",
  day: "numeric",
  month: "long",
};

day = day.toLocaleDateString("en-US", options);
return day
}

export default getDay;
