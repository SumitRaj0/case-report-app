/* eslint-disable*/
import * as React from "react";
import { useParams } from "react-router-dom";
import styles from "./Demoform.module.scss";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/ContextApi";
import { useContext, useEffect } from "react";
import { getlistItems } from "./SPService";

type Props = {
  sp: any;
};

const Event = (props: Props): JSX.Element => {
  const { sp } = props;
  const { selectedEventId } = useParams();

  const {
    displayData,
    setDisplayData,
    setHasEvent,
    setIsAdd,
    setIsUpdate,
    setEventValue,
    eventValue,
  } = useContext(FormContext);

  const navigate = useNavigate();

  // Handing Update Event
  const handleUpdateEvent = (Event: any) => {
    setIsUpdate(true);
    setIsAdd(true);
    setEventValue(Event);
    navigate(`/detailView/${selectedEventId}`);
  };
  console.log(eventValue);
  // Handing Back Button
  const handleBackButtonClick = () => {
    setHasEvent(false);
    navigate(`/detailView/${selectedEventId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getlistItems(sp);
        setDisplayData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sp]);

  let filteredEvents: any[] = [];
  if (selectedEventId) {
    filteredEvents = displayData.filter(
      (item: any) => item.Id === parseInt(selectedEventId)
    );
  } else {
    console.log("selectedManagerId is undefined or null");
  }

  return (
    <div>
      <div className={styles.Case1}>
        <button className={styles["cancel-button1"]} onClick={handleBackButtonClick}>
          🔙
        </button>
        {filteredEvents.map((item: any) => (
          <h4 className={styles.RenderCase} key={item.Id}>
            <span>Case Name : {item.Case}</span>
          </h4>
        ))}
      </div>
      <h4>Event Table</h4>
      <table className={styles.tableEvent}>
        <tr>
          <th className={styles.thEvent}>Event</th>
          <th className={styles.thEvent}>Option</th>
        </tr>

        {filteredEvents.map((x: any) => (
          <tr key={x.Id}>
            <td className={styles.tdEvent}>
              <span>{x.Event}</span>
            </td>
            <td className={styles.tdEvent}>
              <button
                className={styles["update-button"]}
                onClick={() => handleUpdateEvent(x.Event)}
              >
                Update
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Event;
