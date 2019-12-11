const initState = {};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("created post", action.post);
      return state;
    case "CREATE_POST_ERROR":
      console.log("created post", action.err);
      return state;
    default:
      console.log("Default");
      return state;
  }
};

export default postReducer;
