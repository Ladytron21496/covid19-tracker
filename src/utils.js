let sortByCases = (data) => data.sort((a, b) => (a.cases > b.cases ? -1 : 1));

export { sortByCases };
