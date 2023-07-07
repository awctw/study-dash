import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import {
  Button,
  Card,
  Dialog,
  Input,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import thunk from "../../store/TODOList/thunk";
import { REQUEST_STATE } from "../../store/utils";

// AddTODOItem component provides a form to add new TODOItems
const AddTODOItem = () => {
  const dispatch = useDispatch();
  const { addTODOItem, error, categories } = useSelector(
    (state) => state.todoReducer
  );

  // The current logged-in user of the application.
  // This is where we obtain the userID attribute
  const { user } = useSelector((state) => state.loginReducer);

  // openAddTODO is used to control the visibility of the addTODO dialog popup.
  const [openAddTODO, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // formData state variable is used to store the values entered in the form.
  const [formData, setFormData] = useState({
    title: "",
    startDate: null,
    endDate: null,
    description: "",
    category: "",
  });

  // Assign red to the AM time options in DatePicker.
  // Assign green to the PM values of the time menu
  const assignTimeColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const [errMessage, setErrMessage] = useState("");

  const handleOpen = () => {
    setOpen(!openAddTODO);
    resetFormHandler();
  };

  // Create a single reusable function to handle the input changes for all attributes
  // apart from dueDate.
  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // handleStartDateInput function is responsible for updating the startDate field
  // in the formData state when the value of the DatePicker component changes.
  const handleStartDateInput = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: date,
    }));
  };

  // handleEndDateInput function is responsible for updating the endDate field
  // in the formData state when the value of the DatePicker component changes.
  const handleEndDateInput = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      endDate: date,
    }));
  };

  // The handleSubmit function is called when the form is submitted.
  // It performs validation on the input fields to ensure that the required
  // fields are not empty. If any of the required fields are empty, an error
  // message is set in the error state variable.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, startDate, endDate, description, category } = formData;

    if (!title || !startDate || !endDate || !description || !category) {
      setErrMessage("Please provide all required fields.");
      return;
    }

    const newTodo = {
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      category: category,
      userID: user.userID
    };

    setLoading(true);
    const success = await dispatch(thunk.addTODOItemAsync(newTodo));
    setLoading(false);

    if (success) {
      setOpen(false);
    }
  };

  const resetFormHandler = () => {
    setFormData({
      title: "",
      startDate: null,
      endDate: null,
      description: "",
      category: "",
    });
    setErrMessage("");
  };

  useEffect(() => {
    if (addTODOItem === REQUEST_STATE.FULFILLED) {
      resetFormHandler();
    }

    if (addTODOItem === REQUEST_STATE.REJECTED && error) {
      setErrMessage(error);
    }
  }, [addTODOItem, error]);

  return (
    <>
      <Button
        id="AddNewTODOButton"
        className="bg-indigo-300 text-white m-2"
        size="sm"
        onClick={handleOpen}
      >
        Add
      </Button>
      <Dialog
        size="lg"
        open={openAddTODO}
        handler={handleOpen}
        className="addTODODialog shadow-none"
      >
        <Card className="addTODOForm">
          <h2>Add TODO Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputField">
              <label htmlFor="add-title">TODO:</label>
              <Input
                id="add-title"
                name="title"
                value={formData.title}
                label="title"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <label htmlFor="add-startDate">Start Date:</label>
              <DatePicker
                id="add-startDate"
                name="startDate"
                className="bg-orange-200"
                showTimeSelect
                selected={formData.startDate}
                onChange={handleStartDateInput}
                timeClassName={assignTimeColor}
              />
            </div>
            <div className="inputField">
              <label htmlFor="add-endDate">End Date:</label>
              <DatePicker
                id="add-endDate"
                name="endDate"
                className="bg-orange-200"
                showTimeSelect
                selected={formData.endDate}
                onChange={handleEndDateInput}
                timeClassName={assignTimeColor}
              />
            </div>
            <div className="inputField">
              <label htmlFor="add-description">Description:</label>
              <Textarea
                id="add-description"
                name="description"
                label="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <label htmlFor="add-category">Category:</label>
              <Input
                id="add-category"
                name="category"
                label="category"
                value={formData.category}
                list="categoryOptions"
                onChange={handleInputChange}
              />
              <datalist id="categoryOptions">
                {categories.map((category) => (
                  <option key={category._id} value={category.category}></option>
                ))}
              </datalist>
            </div>

            {loading && <Spinner className="h-10 w-10" />}
            {errMessage && <p className="error-msg">{errMessage}</p>}

            <div className="AddTODOButtons">
              <Button color="light-blue" size="sm" type="submit">
                Confirm
              </Button>
              <Button
                color="gray"
                size="sm"
                type="reset"
                onClick={resetFormHandler}
              >
                Clear
              </Button>
              <Button color="red" size="sm" type="button" onClick={handleOpen}>
                Close
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  );
};

export default AddTODOItem;
