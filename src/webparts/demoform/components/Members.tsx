/*eslint-disable*/
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormContext } from "../context/ContextApi";
import { useContext } from "react";
import styles from "./Demoform.module.scss";

const Members = (): JSX.Element => {
 
  const { displayData } = useContext(FormContext);

  const navigate = useNavigate();
  const { selectedManagerId } = useParams();
  
  const handleBack = () => {
    navigate(`/detailView/${selectedManagerId}`);
  };

  let filteredData: any[] = [];
  if (selectedManagerId) {
    filteredData = displayData.filter(
      (item: any) => item.Id === parseInt(selectedManagerId)
    );
  } else {
    console.log("selectedManagerId is undefined or null");
  }
  return (
    <>
      <div className={styles.Case1}>
        <button className={styles["cancel-button1"]} onClick={handleBack}>
          🔙
        </button>
        {filteredData.map((item: any) => (
          <h4 className={styles.RenderCase} key={item.Id}>
            <span>Case Name : {item.Case}</span>
          </h4>
        ))}
      </div>
      <div className={styles.memberdiv}>
        <table className={styles["vertical-table"]}>
          {filteredData.map((items: any) => (
            <tbody className={styles.tbody}>
              <tr>
                <th>Managers</th>
                <td>
                  <ul>
                    <li>
                      {items.Manager?.map((x: any, index: number) => (
                        <span key={index}>
                          {x.Title}
                          {index < items.Manager.length - 1 && ", "}
                        </span>
                      ))}
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>Role 1</th>
                <td>{items.Role1?.map((x: any) => x.Title)}</td>
              </tr>
              <tr>
                <th>Role 2</th>
                <td> {items.Role2?.map((x: any) => x.Title)}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default Members;
