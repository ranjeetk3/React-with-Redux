import database from "./config";
const MobileAlertsRef = database.ref("mobileAlerts");
export const MobileAlertsTable = MobileAlertsRef;

export const mobileAllUsersAlert = (device, obj) => {
  try {
    MobileAlertsRef.child(device).child("allUsers").set(obj);
  } catch (err) {
    console.log(err);
  }
};

export const mobileMembersOnlyAlert = (device, obj) => {
  try {
    MobileAlertsRef.child(device).child("membersOnly").set(obj);
  } catch (err) {
    console.log(err);
  }
};

export const mobileOption = (device, obj) => {
  removeBothOption();
  setTimeout(function () {
    try {
      MobileAlertsRef.child(device).child("options").set(obj);
    } catch (err) {
      console.log(err);
    }
  }, 1000);
};

const removeBothOption = () => {
  MobileAlertsRef.child("android").child("options").remove();
  MobileAlertsRef.child("ios").child("options").remove();
};

export const removeMobileAllUsersAlert = () => {
  MobileAlertsRef.child("android").child("allUsers").remove();
  MobileAlertsRef.child("ios").child("allUsers").remove();
};

export const removeMobileMembersOnlyAlert = () => {
  MobileAlertsRef.child("android").child("membersOnly").remove();
  MobileAlertsRef.child("ios").child("membersOnly").remove();
};
