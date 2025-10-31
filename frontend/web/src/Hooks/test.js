import { useState } from "react";

export function useTest(){
  let [test,setTest]=useState("test");

  return [test,setTest];
}