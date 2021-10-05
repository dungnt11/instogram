class Store {
  user = {
    _id: '',
    username: '',
    displayName: '',
    avatar: '',
    posts: [],
    currentID: '',
    reRender: -1,
  }

  setRerender() {
    this.user.reRender = Math.random();
  }

  delUser() {
    this.user = {
      _id: '',
      username: '',
      displayName: '',
      avatar: '',
      posts: [],
      currentID: '',
    }
  }

  setUser(user) {
    this.user = user;
  }

  addNewPost(post) {
    if (!this.user.posts) this.user.posts = [];
    this.user.posts.push(post);
  }

  get userInfo() {
    return this.user;
  }
}

const store = new Store();

export { store };



