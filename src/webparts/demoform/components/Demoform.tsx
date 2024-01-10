/*eslint-disable*/
import * as React from "react";

import type { IDemoformProps } from "./IDemoformProps";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import Dashboard from "./Dashboard";
import { useState } from "react";
import { spfi, SPFx } from "@pnp/sp";
import DetailView from "./DetailView";
import { HashRouter, Route, Routes } from "react-router-dom";
import Members from "./Members";
import Event from "./Event";
import styles from "./Demoform.module.scss";
import ContextApi from "../context/ContextApi";
import { IListData, initialFieldsValue } from "./Interface/IListDataInterface";

const Demoform = (props: IDemoformProps): JSX.Element => {
  const sp = spfi().using(SPFx(props.context));

  const [fieldsValue, setFieldsValue] = useState<IListData>(initialFieldsValue);
  const [isDetailsView, setIsDetailsView] = useState(false);
  const [isdashBoard, setIsDashBoard] = useState(true);
  const [viewData, setViewData] = useState<any>([]);

  return (
    <ContextApi>
      <HashRouter>
        <header className={styles.p1}>Case Report Form</header>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                initialFieldsValue={initialFieldsValue}
                fieldsValue={fieldsValue}
                setFieldsValue={setFieldsValue}
                context={props.context as any}
                SetIsDetailsView={setIsDetailsView}
                isdashBoard={isdashBoard}
                sp={sp}
                SetIsDashBoard={setIsDashBoard}
                setViewData={setViewData}
                viewData={viewData}
              />
            }
          />
          <Route
            path="/detailView/:itemId"
            element={
              isDetailsView && (
                <DetailView
                  viewData={viewData}
                  setViewData={setViewData}
                  fieldsValue={fieldsValue}
                  initialFieldsValues={initialFieldsValue}
                  setIsDetailsView={setIsDetailsView}
                  setIsDashBoard={setIsDashBoard}
                  setFeildsValue={setFieldsValue}
                  sp={sp}
                />
              )
            }
          />
          <Route path="/members/:selectedManagerId" element={<Members />} />
          <Route path="/events/:selectedEventId" element={<Event sp={sp} />} />
        </Routes>
      </HashRouter>
    </ContextApi>
  );
};

export default Demoform;
