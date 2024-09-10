import { Center } from "native-base";
import React from "react";
import Board from "../../components/Board";
import Cext from "../../components/Cext";
import Header from "../../components/Header";

const Tryout = () => {
  return (
    <Board>
      <Header />
      <Center flex={1}>
        <Cext>tryout</Cext>
      </Center>
    </Board>
  );
};

export default Tryout;
