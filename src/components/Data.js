import moment from 'moment'
 import "moment/locale/pt-br";

const Data = (date) => {
  const data = moment(date.date).format("ll");   

  return <div>{`${data}`}</div>;
}

export default Data
