/*eslint-disable */
export interface IListData{
    id:string,
    CaseName:string,
    Event:string,
    Manager:Array<any>,
    Role1:Array<any>,
    Role2:Array<any>,
}
export const initialFieldsValue: IListData = {
    id: "",
    Event: "",
    CaseName: "",
    Manager: [],
    Role1: [],
    Role2: [],
  };