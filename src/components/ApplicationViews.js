import { Route, Redirect } from "react-router-dom";
import React from "react";
import Home from "./home/Home";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import OwnerList from "./owner/OwnerList";
import AnimalDetail from "./animal/AnimalDetail";
import LocationDetail from "./location/LocationDetail";
import AnimalForm from './animal/AnimalForm';
import Login from "./auth/Login";


const ApplicationViews = () => {
  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={props => {
          return <Home />;
        }}
      />
      <Route exact path="/animals" render={(props) => {
        if(isAuthenticated()){
          return <AnimalList {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }}
      />
      <Route path="/animals/new" render={(props) => {
        return <AnimalForm {...props} />
      }}
      />
      <Route
        path="/animals/:animalId(\d+)"
        render={props => {
          return (
            <AnimalDetail
              animalId={parseInt(props.match.params.animalId)}
              {...props}
            />
          );
        }}
      />
      <Route exact path="/locations" render={(props) => {
        return <LocationList />
      }} />
      <Route path="/locations/:locationId(\d+)" render={(props) => {
        return <LocationDetail locationId={parseInt(props.match.params.locationId)}
          {...props}
        />
      }} />
      <Route
        path="/employees"
        render={props => {
          return <EmployeeList />;
        }}
      />
      <Route
        path="/owners"
        render={props => {
          return <OwnerList />;
        }}
      />
      <Route path="/login" component={Login} />
    </React.Fragment>
  );
};

export default ApplicationViews;