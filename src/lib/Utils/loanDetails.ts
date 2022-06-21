import moment from 'moment';
type LoanDetails = {
  reliefAmount: number;
  payBackDate: any;
  startDate: any
};

const loanDetails = ({reliefAmount, payBackDate, startDate }: LoanDetails) => {
  const interestRate: number = 15;
  //   const reliefAmount: number = 2000;
    // const today = moment().format('YYYY-MM-DD');
    // const payBackDate = moment('2023-06-19');
  const interest: number = (interestRate / 100) * reliefAmount;
  const totalPayment: number = interest + reliefAmount;

  console.log(payBackDate.diff(startDate, 'month'));
  return { interest } as const;
};

export default loanDetails;
