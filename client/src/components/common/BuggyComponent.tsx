const BuggyComponent = () => {
  throw new Error("Test error - toto je testovacia chyba");
  return null;
};

export default BuggyComponent;
