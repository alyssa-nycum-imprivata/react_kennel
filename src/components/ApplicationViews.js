import { Route, Redirect } from "react-router-dom";
import React from "react";
import Home from "./home/Home";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import OwnerList from "./owner/OwnerList";
import AnimalDetail from "./animal/AnimalDetail";
import LocationDetail from "./location/LocationDetail";
import EmployeeDetail from "./employee/EmployeeDetail";
import OwnerDetail from "./owner/OwnerDetail";
import AnimalForm from './animal/AnimalForm';
import LocationForm from './location/LocationForm';
import EmployeeForm from './employee/EmployeeForm';
import OwnerForm from './owner/OwnerForm';
import AnimalEditForm from './animal/AnimalEditForm';
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
      <Route
        exact
        path="/animals"
        render={(props) => {
          if (isAuthenticated()) {
            return <AnimalList {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        path="/animals/new"
        render={(props) => {
          if (isAuthenticated()) {
            return <AnimalForm {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        exact
        path="/animals/:animalId(\d+)"
        render={props => {
          if (isAuthenticated()) {
            return (
              <AnimalDetail
                animalId={parseInt(props.match.params.animalId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        path="/animals/:animalId(\d+)/edit"
        render={props => {
          if (isAuthenticated()) {
            return <AnimalEditForm {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        exact
        path="/locations"
        render={(props) => {
          if (isAuthenticated()) {
            return <LocationList {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        path="/locations/new"
        render={(props) => {
          if (isAuthenticated()) {
            return <LocationForm {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        path="/locations/:locationId(\d+)"
        render={(props) => {
          if (isAuthenticated()) {
            return (
              <LocationDetail locationId={parseInt(props.match.params.locationId)}
                {...props}
              />
            )
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        exact
        path="/employees"
        render={props => {
          if (isAuthenticated()) {
            return <EmployeeList {...props} />;
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        path="/employees/new"
        render={(props) => {
          if (isAuthenticated()) {
            return <EmployeeForm {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        path="/employees/:employeeId(\d+)"
        render={(props) => {
          if (isAuthenticated()) {
            return (
              <EmployeeDetail employeeId={parseInt(props.match.params.employeeId)}
                {...props}
              />
            )
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        exact
        path="/owners"
        render={props => {
          if (isAuthenticated()) {
            return <OwnerList {...props} />;
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        path="/owners/new"
        render={(props) => {
          if (isAuthenticated()) {
            return <OwnerForm {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        path="/owners/:ownerId(\d+)"
        render={(props) => {
          if (isAuthenticated()) {
            return (
              <OwnerDetail ownerId={parseInt(props.match.params.ownerId)}
                {...props}
              />
            )
          } else {
            return <Redirect to="/login" />
          }
        }}
      />
      <Route
        path="/login"
        component={Login}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;