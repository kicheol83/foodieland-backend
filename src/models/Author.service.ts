import Errors, { Message } from "../libs/Errors";
import AuthorModel from "../schema/Author.model";
import { HttpCode } from "../libs/Errors";
import { Author, AuthorInput, AuthorUpdateInput } from "../libs/types/author";
import { shapeIntoMogooseObjectId } from "../libs/config";

class AuthorService {
  private readonly authorModel;

  constructor() {
    this.authorModel = AuthorModel;
  }

  public async getAllAuthors(): Promise<Author[]> {
    const result = await this.authorModel.find().lean().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async getAuthorById(authorId: string): Promise<Author> {
    const objectId = shapeIntoMogooseObjectId(authorId);
    const result = await this.authorModel.findById(objectId).exec();
    if (!result)
      throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG);
    return result;
  }

  public async createAuthor(input: AuthorInput) {
    try {
      return await this.authorModel.create(input);
    } catch (err) {
      console.error("Erorr. model:createAuthor", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public updateAuthor = async (
    authorId: string,
    input: AuthorUpdateInput
  ): Promise<Author> => {
    const _id = shapeIntoMogooseObjectId(authorId);

    const result = await AuthorModel.findOneAndUpdate({ _id }, input, {
      new: true,
      runValidators: true,
    }).exec();

    if (!result) {
      throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    }

    return result;
  };

  public async deleteAuthor(id: string) {
    const result = await this.authorModel.findByIdAndDelete(id);
    if (!result)
      throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG);
    return result;
  }

  public async findByNick(nick: string) {
    return await this.authorModel.findOne({ authorNick: nick });
  }
}

export default AuthorService;
