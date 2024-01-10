/* eslint-disable */
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";

import { SPFI } from "@pnp/sp";
const listName = "PeoplePickerList";

const getlistItems = async (sp: SPFI) => {
  try {
    const res = await sp.web.lists
      .getByTitle(listName)
      .items.select(
        "ID",
        "Case",
        "Event",
        "Manager/Title,Manager/Id",
        "Role1/Title,Role1/Id",
        "Role2/Title,Role2/Id"
      )
      .expand("Manager", "Role1", "Role2")
      .getAll();

    return res; 
  } catch (error) {
    console.log(error);
    return null; 
  }
};

// Adding new Item in Sp list
const addNewItem = async (feildsValue: any, sp: any) => {
  const listName = "PeoplePickerList";
  try {
    const managerUserIds = feildsValue.Manager.map((x: any) => x.id);
    const role1UserId = feildsValue.Role1.map((x: any) => x.id);
    const role2UserId = feildsValue.Role2.map((x: any) => x.id);

    await sp.web.lists.getByTitle(listName).items.add({
      Case: feildsValue.CaseName,
      ManagerId: managerUserIds.length > 0 ? managerUserIds : null,
      Role1Id: role1UserId.length > 0 ? role1UserId : null,
      Role2Id: role2UserId.length > 0 ? role2UserId : null,
    });

    // const casenumberid = items.data.Id;

    // await sp.web.lists.getByTitle("People").items.add({
    //   CasenumberId: casenumberid,
    //   ManagerId: managerUserIds.length > 0 ? managerUserIds : null,
    // });

    // return { casenumberid };
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

// Adding event in selected row with id

const addEventItem = async (
  sp: any,
  viewData: any,
  feildsValue: any,
  setFeildsValue: any,
  navigate: any,
  setIsAdd: any,
  setIsUpdate:any,
  setEventValue:any

) => {
  try {
    const id = viewData.map((Items: any) => Items.Id);

    if (id > 0) {
      await sp.web.lists
        .getByTitle("PeoplePickerList")
        .items.getById(id)
        .update({
          Event: feildsValue.Event,
        });
    }
    setFeildsValue({ ...feildsValue, Event: "" });
    setIsUpdate(false);
    setIsAdd(false);
    setEventValue("")
    alert("Event added");

    navigate(`/events/${id}`);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

export { addEventItem, getlistItems, addNewItem };