import database from "./config";
const PublicAnnouncementsRef = database.ref("publicAnnouncements");
export const PublicAnnouncements = PublicAnnouncementsRef;

export const createPublicAnnouncement = data => {
  PublicAnnouncementsRef.push(data, function(err) {
    if (err) {
      return {
        status: false,
        message: "Somthing went wrong",
        error: err
      };
    } else {
      return {
        status: true,
        message: "Public announcements added successfully!",
        data
      };
    }
  });
};
