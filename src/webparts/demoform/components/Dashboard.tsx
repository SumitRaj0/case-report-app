/* eslint-disable */
import * as React from "react";
import styles from "./Demoform.module.scss";
import ReactPaginate from "react-paginate";
import Addform from "./Operations/Addform";
import { SPFI } from "@pnp/sp";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/ContextApi";
import { useContext, useEffect } from "react";
import { getlistItems } from "./SPService";


type Props = {
  initialFieldsValue: any;
  SetIsDetailsView: any;
  fieldsValue: any;
  setFieldsValue: any;
  context: any;
  isdashBoard: any;
  SetIsDashBoard: any;
  sp: SPFI;
  setViewData: any;
  viewData: any;
};

const Dashboard = (props: Props): JSX.Element => {
  const { displayData, setDisplayData } = useContext(FormContext);
  const {
    initialFieldsValue,
    fieldsValue,
    setFieldsValue,
    context,
    SetIsDetailsView,
    isdashBoard,
    sp,
    SetIsDashBoard,
    setViewData,
    viewData,
  } = props;

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

  const [isOpen, SetIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const [itemOffset, setItemOffset] = React.useState(0);

  const itemsPerPage = 11;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = displayData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(displayData.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % displayData.length;
    setItemOffset(newOffset);
  };

  //Handle View
  const View = (item: any) => {
    setViewData(initialFieldsValue);
    setViewData([...viewData, item]);
    SetIsDetailsView(true);
    // SetIsDashBoard(false);
    // SetIsOpen(false);
    let itemId = item.Id;
    navigate(`/detailView/${itemId}`);
  };

  const showCreateForm = () => {
    SetIsOpen(true);
    SetIsDashBoard(false);
  };

  return (
    <>
      {isOpen && (
        <Addform
        fieldsValue={fieldsValue}
        setFieldsValue={setFieldsValue}
          context={context}
          initialFieldsValue={initialFieldsValue}
          sp={sp}
          SetIsOpen={SetIsOpen}
          SetIsDashBoard={SetIsDashBoard}
        />
      )}
      {isdashBoard && (
        <div>
          <button className={styles["view-btn"]} onClick={showCreateForm}>
            Create➕
          </button>
          <table className={styles.tbl}>
            <tr className={styles.tblTr1}>
              <th className={styles.tblTH}>Case</th>
              <th className={styles.tblTH}>Manager</th>
              <th className={styles.tblTH}>Role 1</th>
              <th className={styles.tblTH}>Role 2</th>
              <th className={styles.tblTH}>Option</th>
            </tr>
            {currentItems.map((item: any) => (
              <tr className={styles.tblTr} key={item.id}>
                <td className={styles.tblTD}>{item.Case}</td>
                <td className={styles.tblTD}>
                  {item.Manager?.map((x: any, index: number) => (
                    <span key={index}>
                      {x.Title}
                      {index < item.Manager.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td className={styles.tblTD}>
                  {item.Role1?.map((x: any) => x.Title)}
                </td>
                <td className={styles.tblTD}>
                  {item.Role2?.map((x: any) => x.Title)}
                </td>
                <td className={styles.tblTD}>
                  <button
                    type="submit"
                    className={styles["view-btn2"]}
                    onClick={() => View(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="<Previous"
            renderOnZeroPageCount={null}
            containerClassName={styles.pagination}
            pageLinkClassName={styles.pageNum}
            previousLinkClassName={styles.pageNum}
            nextClassName={styles.pageNum}
            activeLinkClassName={styles.active}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
