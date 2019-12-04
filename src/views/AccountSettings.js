import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { API_ROOT } from "../app/app-helpers";
import { useProfileState } from "../profile/profile-context";
import { useAuthState } from "../auth/auth-context";
import ProfileSettings from "../user/components/ProfileSettings";
import SavedLocations from "../user/components/SavedLocations";
import PrivacySettings from "../user/components/PrivacySettings";
import SecuritySettings from "../user/components/SecuritySettings";
import Spinner from "../app/components/Spinner";
import Button from "../app/components/Button";
import { checkJwt } from "../auth/auth-helpers";

function UserSettings({ history }) {
  const { profileData } = useProfileState();
  const { jwt, userAddress } = useAuthState();
  // Profile settings
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newBio, setNewBio] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [newStationData, setNewStationData] = useState([]);
  const [newStationNames, setNewStationNames] = useState({});
  const [newStationNotes, setNewStationNotes] = useState({});
  const [deletedStations, setDeletedStations] = useState([]);

  console.log(`newStationNames = `, newStationNames);
  console.log(`newStationNotes`, newStationNotes);
  console.log(`deleted stations`, deletedStations);

  useEffect(() => {
    // TODO - pull station data from profileData when API is set up
    const {
      user_name,
      email,
      user_location,
      user_bio,
      observation_stations
    } = profileData;
    // Add the current values so that they appear in input fields when user is editing
    setNewUsername(user_name);
    setNewEmail(email);
    setNewLocation(user_location);
    setNewBio(user_bio);
    setNewStationData(observation_stations); // used to render the saved locations table
  }, [profileData]);

  const submitEdit = async () => {
    setIsError(false);
    setIsloading(true);
    // checks if jwt is valid and hasn't expired
    checkJwt(jwt);
    // Post the edits
    try {
      await axios.post(
        `${API_ROOT}/editProfile`,
        JSON.stringify({
          jwt: jwt,
          address: userAddress,
          username: newUsername,
          email: newEmail,
          bio: newBio,
          location: newLocation,
          new_station_names: newStationNames,
          new_station_notes: newStationNotes,
          deleted_stations: deletedStations
        })
      );
    } catch (error) {
      setIsError(true);
    }
    // After edit, kick user back to their profile and refresh browser to show changes
    history.push(`/profile/${userAddress}`);
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("trusat-jwt");
    localStorage.removeItem("trusat-allow-cookies");
    history.push(`/`);
    window.location.reload();
  };

  return isError ? (
    <p className="app__error-message">Something went wrong...</p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <div className="account-settings__wrapper">
      <h1 className="account-settings__header">Account Settings</h1>
      <section className="profile-settings__wrapper">
        <ProfileSettings
          newUsername={newUsername}
          setNewUsername={setNewUsername}
          newEmail={newEmail}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
          newBio={newBio}
          setNewBio={setNewBio}
          submitEdit={submitEdit}
        />

        <SavedLocations
          newStationData={newStationData}
          setNewStationData={setNewStationData}
          newStationNames={newStationNames}
          setNewStationNames={setNewStationNames}
          newStationNotes={newStationNotes}
          setNewStationNotes={setNewStationNotes}
          deletedStations={deletedStations}
          setDeletedStations={setDeletedStations}
          submitEdit={submitEdit}
        />
      </section>

      <PrivacySettings />

      {/* Only show prompt to make move to metamask if they dont have plugin installed */}
      {window.etherem ? null : <SecuritySettings />}
      <Button
        color="white"
        text="logout"
        addStyles="account-settings__log-out-button"
        onClick={logout}
      ></Button>
    </div>
  );
}

export default withRouter(UserSettings);

// const observation_stations = [
//   {
//     station_name: "my backyard",
//     notes: "",
//     latitude: "12345",
//     longitude: "-54321",
//     altitude: "100",
//     station_id: "T0001",
//     observation_count: "500"
//   },
//   {
//     station_name: "Dads house",
//     notes: "at the beach",
//     latitude: "78901",
//     longitude: "-10987",
//     altitude: "150",
//     station_id: "T0002",
//     observation_count: "250"
//   },
//   {
//     station_name: "Cascades camping",
//     notes: "",
//     latitude: "23232",
//     longitude: "-32322",
//     altitude: "200",
//     station_id: "T0003",
//     observation_count: "100"
//   }
// ]
