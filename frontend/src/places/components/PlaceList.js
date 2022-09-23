import classes from "./PlaceList.module.css";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={`${classes["place-list"]} center`}>
        <Card>
          <h2>No Places Found ! Maybe visit a new place !</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className={classes["place-list"]}>
      {props.items.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={props.onDeletePlace}
          ></PlaceItem>
        );
      })}
    </ul>
  );
};

export default PlaceList;
