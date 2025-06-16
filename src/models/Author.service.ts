import AuthorModel from "../schema/Author.model";

class AuthorService {
  private readonly authorModel;

  constructor() {
    this.authorModel = AuthorModel;
  }
}

export default AuthorService;
