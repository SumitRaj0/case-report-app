/* eslint-disable */
import *as React from 'react'
import { ReactNode, createContext, useState } from 'react'

export type data ={
    displayData:any
    setDisplayData:any;
    hasEvent:any;
    setHasEvent:any;
    isAdd:any;
    setIsAdd:any;
    isUpdate:any;
    setIsUpdate:any;
    eventValue:any;
    setEventValue:any
}
export const FormContext = createContext({} as data)

export const ContextApi = ({children} : ReactNode ):JSX.Element => {
    const [displayData, setDisplayData] = useState<any>([]);
    const [hasEvent, setHasEvent]  = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate,setIsUpdate]  = useState(false);
    const [eventValue, setEventValue] = useState("");
  return (
    <FormContext.Provider
        value={{displayData, setDisplayData,
          hasEvent, setHasEvent,
          isAdd, setIsAdd,
          isUpdate,setIsUpdate,
          eventValue,setEventValue
        }}
    >{children}</FormContext.Provider>
  )
}

export default ContextApi;
