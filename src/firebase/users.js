import database from "./config";
const UserRef = database.ref("users");
export const UsersTable = UserRef;
/* export const userComment = (commentObj) => {
  const commentData = {};
  commentData.comments = commentObj.dataForUserComment;
  commentData.email = commentObj.email;
  UserRef.child(commentObj.id).push(commentData, function (err) {
    if (err) {
      return {
        status: false,
        message: "Somthing went wrong",
        error: err,
      };
    } else {
      return {
        status: true,
        message: "Comment added",
        data: commentData,
      };
    }
  });
}; */

export const userComment = (loggedInUserId, obj) => {
  try {
    UserRef.child(loggedInUserId).child("comments").push(obj);
  } catch (err) {
    console.log(err);
  }
};

export const addFriend = (friendObj, loggedInUserId) => {
  UserRef.child(loggedInUserId).update(friendObj, function (err) {
    if (err) {
      return {
        status: false,
        message: "Somthing went wrong",
        error: err,
      };
    } else {
      return {
        status: true,
        message: "Comment added",
        data: friendObj,
      };
    }
  });
};

export const ApproveFriendRequest = (loggedInUserId, id, friend) => {
  UserRef.child(loggedInUserId)
    .child("friends")
    .child(id)
    .set(friend, function (err) {
      if (err) {
        return {
          status: false,
        };
      } else {
        return {
          status: true,
        };
      }
    });
};

export const RemoveFriendRequest = (loggedInUserId, id) => {
  UserRef.child(loggedInUserId).child("friends").child(id).remove();
};

export const RemoveFriendFromList = (loggedInUserId, id) => {
  UserRef.child(loggedInUserId).child("friends").child(id).remove();
  UserRef.child(id).child("friends").child(loggedInUserId).remove();
};

export const updateUserAboutInfo = (loggedInUserId, account) => {
  UserRef.child(loggedInUserId)
    .child("account")
    .set(account, function (err) {
      if (err) {
        return {
          status: false,
        };
      } else {
        return {
          status: true,
        };
      }
    });
};

export const updateUserAboutInfoSpecificValue = (
  loggedInUserId,
  key,
  value
) => {
  try {
    UserRef.child(loggedInUserId).child("account").child(key).set(value);
  } catch (err) {
    console.log(err);
  }
};

export const uploadPicturesPath = (loggedInUserId, srcObj) => {
  try {
    UserRef.child(loggedInUserId).child("pictures").push(srcObj);
  } catch (err) {
    console.log(err);
  }
};

export const RemovePicturesPath = (loggedInUserId, imgId) => {
  try {
    UserRef.child(loggedInUserId).child("pictures").child(imgId).remove();
  } catch (err) {
    console.log(err);
  }
};

export const uploadVideoPath = (loggedInUserId, srcObj) => {
  try {
    UserRef.child(loggedInUserId).child("videos").push(srcObj);
  } catch (err) {
    console.log(err);
  }
};

export const sendFeedPost = (loggedInUserId, srcObj) => {
  try {
    UserRef.child(loggedInUserId).child("pageFeed").push(srcObj);
  } catch (err) {
    console.log(err);
  }
};

export const removeUserFeed = (loggedInUserId, key) => {
  try {
    UserRef.child(loggedInUserId).child("pageFeed").child(key).remove();
  } catch (err) {
    console.log(err);
  }
};

export const feedComment = (loggedInUserId, firebaseId, obj) => {
  try {
    UserRef.child(loggedInUserId)
      .child("pageFeed")
      .child(firebaseId)
      .child("comments")
      .push(obj);
  } catch (err) {
    console.log(err);
  }
};

export const removeUserAllFeed = (loggedInUserId) => {
  try {
    UserRef.child(loggedInUserId).child("pageFeed").remove();
  } catch (err) {
    console.log(err);
  }
};

export const addMemberAnnouncements = (loggedInUserId, obj) => {
  try {
    UserRef.child(loggedInUserId).child("memberAnnouncements").push(obj);
  } catch (err) {
    console.log(err);
  }
};

export const addCaseStudies = (loggedInUserId, obj) => {
  try {
    UserRef.child(loggedInUserId).child("caseStudies").push(obj);
  } catch (err) {
    console.log(err);
  }
};

export const updateCaseStudies = (loggedInUserId, objId, obj) => {
  try {
    UserRef.child(loggedInUserId).child("caseStudies").child(objId).update(obj);
  } catch (err) {
    console.log(err);
  }
};

export const deleteCaseStudies = (loggedInUserId, objId) => {
  try {
    UserRef.child(loggedInUserId).child("caseStudies").child(objId).remove();
  } catch (err) {
    console.log(err);
  }
};

export const updateCaseStudiesNote = (loggedInUserId, objId, key, value) => {
  try {
    UserRef.child(loggedInUserId)
      .child("caseStudies")
      .child(objId)
      .child("referenceTags")
      .child(key)
      .child("note")
      .set(value);
  } catch (err) {
    console.log(err);
  }
};

export const updateCaseStudiesTags = (loggedInUserId, objId, obj) => {
  try {
    UserRef.child(loggedInUserId)
      .child("caseStudies")
      .child(objId)
      .child("referenceTags")
      .update(obj);
  } catch (err) {
    console.log(err);
  }
};

export const updateNameInfo = (loggedInUserId, key, value) => {
  try {
    UserRef.child(loggedInUserId).child(key).set(value);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserAccount = (loggedInUserId) => {
  try {
    UserRef.child(loggedInUserId).remove();
  } catch (err) {
    console.log(err);
  }
};

/* export const addUserAction = (loggedInUserId, actionType, obj) => {
  try {
    UserRef.child(loggedInUserId).child(actionType).push(obj);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserAction = (loggedInUserId, actionType, objId, obj) => {
  try {
    UserRef.child(loggedInUserId).child(actionType).child(objId).update(obj);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserAction = (loggedInUserId, actionType, objId) => {
  try {
    UserRef.child(loggedInUserId).child(actionType).child(objId).remove();
  } catch (err) {
    console.log(err);
  }
}; */

export const userRegistration = (value) => {
  try {
    UserRef.child("allUser").push(value);
  } catch (err) {
    console.log(err);
  }
};

export const userName = (userId, obj) => {
  try {
    UserRef.child(userId).set(obj);
  } catch (err) {
    console.log(err);
  }
};
