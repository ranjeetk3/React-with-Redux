import database from "./config";

const BookRef = database.ref("books");
export const createComment = (data) => {
  const book = data.book;
  const commentArray = data.comment || [];
  BookRef.child(book)
    .child("comments")
    .push(commentArray, function (err) {
      if (err) {
        return {
          status: false,
          message: "Somthing went wrong",
          error: err,
        };
      } else {
        return {
          status: true,
          message: "Commented",
          data: data,
        };
      }
    });
};

export const commentLike = (id, book, likes) => {
  try {
    BookRef.child(book).child("comments").child(id).child("likes").set(likes);
    const likedComment = JSON.parse(localStorage.getItem("likedComment")) || [];
    likedComment.push(id);
    localStorage.setItem("likedComment", JSON.stringify(likedComment));
  } catch (err) {
    return err;
  }
};

export const getAllComments = async () => {
  const res = await BookRef.orderBy("datetime", "desc").get();
  console.log(res);
  /*  BookRef.on("value", snapshot => {
    if (snapshot.val() !== null) {
      return {
        status: true,
        message: "Comments Fetched",
        data: snapshot.val()
      };
    }
  }); */
};

export const createLike = (book, like) => {
  try {
    BookRef.child(book).child("likes").push(like);
  } catch (err) {
    console.log(err);
  }
};
