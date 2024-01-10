/* eslint-disable */
import * as React from "react";
import styles from "../Demoform.module.scss";
import { PeoplePicker } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { addNewItem } from "../SPService";


type Props = {
  context: any;
  fieldsValue: any;
  setFieldsValue: any;
  initialFieldsValue: any;
  SetIsOpen: any;
  SetIsDashBoard: any;
  sp: any;
};

const AddForm = (props: Props): JSX.Element => {

  const [errors, setErrors] = React.useState({
    CaseName: "",
    Manager: "",
    Role1: "",
    Role2: "",
   
  });

  const {
    fieldsValue,
    setFieldsValue,
    initialFieldsValue,
    context,
    SetIsOpen,
    SetIsDashBoard,
  } = props;

  const handleForm = (e: any): void => {
    e.preventDefault();
  };

  const handleCaseChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setFieldsValue({ ...fieldsValue, CaseName: value });
  };

  const handleManagerChange = (items: any[]): void => {
    const tempUser: any[] = [];
    items.map((item) => {
      tempUser.push(item);
    });
    setFieldsValue({ ...fieldsValue, Manager: tempUser });
  };

  const handleRole1Change = (items: any[]): void => {
    const tempRole1: any[] = [];
    items.map((item) => {
      tempRole1.push(item);
    });
    setFieldsValue({ ...fieldsValue, Role1: tempRole1 });
  };

  const handleRole2Change = (items: any[]): void => {
    const tempRole2: any[] = [];
    items.map((item) => {
      tempRole2.push(item);
    });

    setFieldsValue({ ...fieldsValue, Role2: tempRole2 });
  };

  const handleSubmit = async () => {
    if (
      fieldsValue.CaseName === "" ||
      fieldsValue.Manager.length === 0 ||
      fieldsValue.Role1.length === 0 ||
      fieldsValue.Role2.length === 0
    ) {
      // Update error state 
      setErrors({
        ...errors,
        CaseName: fieldsValue.CaseName === "" ? "Case Name is required." : "",
        Manager: fieldsValue.Manager.length === 0 ? "Manager is required." : "",
        Role1: fieldsValue.Role1.length === 0 ? "Role 1 is required." : "",
        Role2: fieldsValue.Role2.length === 0 ? "Role 2 is required." : "",
      });      
      console.error("Please fill in all required fields.");
      return;
    }
    try {
      await addNewItem(fieldsValue,props.sp);
      alert("form submitted successfully");
      setFieldsValue(initialFieldsValue);
      SetIsOpen(false);
      SetIsDashBoard(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleCancel = (): void => {
    setFieldsValue(initialFieldsValue);
    SetIsOpen(false);
    SetIsDashBoard(true);
  };

  return (
    <>
      <div>
        <form onSubmit={handleForm}>
          <div className={styles["form-container1"]}>
            <label htmlFor="caseName" className={styles.label}>
              Case
            </label>
            <input
              placeholder="Enter Your Case"
              className={styles["input-field"]}
              type="text"
              id="caseName"
              name="caseName"
              value={fieldsValue.CaseName}
              onChange={handleCaseChange}
            />
            {errors.CaseName && (
              <span className={styles.error}>{errors.CaseName}</span>
            )}
          </div>
          <div className={styles["form-container"]}>
            <label htmlFor="manager" className={styles.label}>
              Manager
            </label>
            <PeoplePicker
              context={context}
              placeholder="Select Your Manager"
              personSelectionLimit={3}
              required={true}
              principalTypes={[PrincipalType.User]}
              onChange={handleManagerChange}
              ensureUser={true}
              defaultSelectedUsers={fieldsValue.Manager}
            />
            {errors.Manager && (
              <span className={styles.error}>{errors.Manager}</span>
            )}
          </div>
          <div className={styles["form-container"]}>
            <label htmlFor="role1" className={styles.label}>
              Role 1
            </label>
            <PeoplePicker
              context={context}
              placeholder="Select Your Role1"
              personSelectionLimit={1}
              required={true}
              // {...register("Role1",{required:true})}
              principalTypes={[PrincipalType.User]}
              onChange={handleRole1Change}
              ensureUser={true}
              defaultSelectedUsers={fieldsValue.Role1}
            />
            {errors.Role1 && (
              <span className={styles.error}>{errors.Role1}</span>
            )}
          </div>
          <div className={styles["form-container"]}>
            <label htmlFor="role2" className={styles.label}>
              Role 2
            </label>
            <PeoplePicker
              context={context}
              placeholder="Select Your Role 2"
              personSelectionLimit={1}
              required={true}
              principalTypes={[PrincipalType.User]}
              onChange={handleRole2Change}
              ensureUser={true}
              defaultSelectedUsers={fieldsValue.Role2}
            />
            {errors.Role2 && (
              <span className={styles.error}>{errors.Role2}</span>
            )}
          </div>
          <div className={styles["button-container"]}>
            <button
              type="submit"
              className={styles["submit-button"]}
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className={styles["cancel-button"]}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddForm;
