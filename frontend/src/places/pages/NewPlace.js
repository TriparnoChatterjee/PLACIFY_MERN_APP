import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hook";
import classes from "./PlaceForm.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const [isLoading, error, sendRequest, clearError] = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image:{
        value:null,
        isValid:false,
      }
    },
    false
  );
  const navigate = useNavigate();
  const placeSubmitHandler = async (event) => {

    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      // formData.append('creator',auth.userId);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+'/places',
        "POST",
        formData,
        {Authorization:'Bearer '+auth.token,
        // 'Access-Control-Allow-Origin':'*'
      }
      );
      navigate("/");
    } catch (e) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
      <form className={classes["place-form"]} onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={"Enter a valid title"}
          onInput={inputHandler}
        ></Input>
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText={"Please Enter a valid description.(at least 5 characters)"}
          onInput={inputHandler}
        ></Input>
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={"Please Enter a valid address."}
          onInput={inputHandler}
        ></Input>
        <ImageUpload
          id="image"
          onInput={inputHandler} 
          errorText="Please provide an image"
        ></ImageUpload>
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};
export default NewPlace;
