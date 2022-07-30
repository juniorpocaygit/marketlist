const SumTotal = ({produtos}) => {

      //Sum itens unitary
      const unitary = produtos.filter((e) => {
        return e.unity == "un";
      });
      const total = unitary.reduce(getTotal, 0);
      function getTotal(total, item) {
        return total + item.value * item.qtd;
      }

      //Sum itens grams
      const grams = produtos.filter((e) => {
        return e.unity == "g";
      });
      const sumgrams = grams
        .map((item) => item.value)
        .reduce((prev, curr) => prev + curr, 0);

      const sumall = (total + sumgrams).toFixed(2).toString().replace(".", ",");
    
  return <>{`${sumall ? (sumall) : ('0')} `}</>;
}

export default SumTotal