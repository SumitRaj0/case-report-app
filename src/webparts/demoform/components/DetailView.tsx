/* eslint-disable */
import * as React from "react";
import styles from "./Demoform.module.scss";
import { SPFI } from "@pnp/sp";
import { addEventItem } from "./SPService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FormContext } from "../context/ContextApi";
import { useContext } from "react";

type Props = {
  viewData: any;
  initialFieldsValues: any;
  setViewData: any;
  setIsDetailsView: any;
  setIsDashBoard: any;
  fieldsValue: any;
  setFeildsValue: any;
  sp: SPFI;
};

const DetailView = (props: Props): JSX.Element => {
  const [isEvent, setIsEvent] = React.useState(false);

  const navigate = useNavigate();
  const selectedRowId = useParams();

  const {
    displayData,
    setIsAdd,
    isAdd,
    isUpdate,
    setIsUpdate,
    eventValue,
    setEventValue,
  } = useContext(FormContext);

  const {
    viewData,
    setViewData,
    initialFieldsValues,
    setIsDetailsView,
    setIsDashBoard,
    fieldsValue,
    setFeildsValue,
    sp,
  } = props;

  const Member = (): void => {
    navigate(`/members/${selectedRowId.itemId}`);
  };

  const Event = (EventId: any) => {
    const filteredEvent: any[] = ([] = displayData.filter(
      (row: any) => row.Id === parseInt(EventId)
    ));
    if (filteredEvent[0].Event && filteredEvent[0].Event.length > 0) {
      navigate(`/events/${EventId}`);
    } else {
      setIsEvent(true);
    }
  };

  const Add = (): void => {
    setIsAdd(true);
  };

  // Handing cancel
  const handleCancel = (): void => {
    setViewData(initialFieldsValues);
    setIsDetailsView(false);
    setIsDashBoard(true);
    navigate(`/`);
  };
  const handleUpdateCancel = () => {
    navigate(`/events/${selectedRowId.itemId}`);
  };

  const handleEventChange = (e: any): void => {
    setFeildsValue({ ...fieldsValue, Event: e.target.value });
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
  };

  //Adding event to sp list
  const handleSubmit = async () => {
    await addEventItem(
      sp,
      viewData,
      fieldsValue,
      setFeildsValue,
      navigate,
      setIsAdd,
      setIsUpdate,
      setEventValue
    );
  };

  return (
    <>
      <div>
        <div className={styles.Case1}>
          <button className={styles["cancel-button1"]} onClick={handleCancel}>
            🔙
          </button>
          {viewData.map((item: any) => (
            <h4 className={styles.RenderCase} key={item.Id}>
              <span>Case Name : {item.Case}</span>
            </h4>
          ))}
        </div>
        <div className={styles.Div2}>
          <div className={styles.navbar}>
            <button className={styles["nav-btn"]} onClick={Member}>
              Member
            </button>
            <button
              className={styles["nav-btn"]}
              onClick={() => Event(selectedRowId.itemId)}
            >
              Event
            </button>
            {isEvent && (
              <button className={styles["nav-btn"]} onClick={Add}>
                Add+
              </button>
            )}
          </div>
          {isAdd && (
            <div className={styles.add}>
              <form onSubmit={handleForm}>
                <label className={styles.lblAdd}>
                  {isUpdate === true ? (
                    <h4>Update Event</h4>
                  ) : (
                    <h4>Add Event</h4>
                  )}
                  <input
                    className={styles.inpAdd}
                    type="text"
                    defaultValue={eventValue}
                    onChange={handleEventChange}
                  />
                </label>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.eventSubmit}
                    type="button"
                    value="Submit"
                    onClick={handleSubmit}
                  >
                    {isUpdate === true ? (
                      <span>Update</span>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                  {isUpdate && (
                    <button
                      className={styles.eventSubmit}
                      type="button"
                      value="Cancel"
                      onClick={handleUpdateCancel}
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {/* <button
                  className={styles.eventSubmit}
                  type="button"
                  value="Submit"
                  onClick={handleSubmit}
                >
                  {isUpdate === true ? (
                    <span>Update</span>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
                {isUpdate && (
                  <button
                    className={styles.eventSubmit}
                    type="button"
                    value="Cancel"
                    onClick={handleUpdateCancel}
                  >
                    Cancel
                  </button>
                )} */}
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailView;
