const initState = {};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_COMMENT":
      console.log("added comment", action.comment);
      return state;
    case "CREATE_COMMENT_ERROR":
      console.log("added post", action.err);
      return state;
    default:
      console.log("Default");
      return state;
  }
};

export default commentReducer;