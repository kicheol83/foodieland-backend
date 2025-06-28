import ViewModel from "../schema/View.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }

  public async checkViewExistence(input: ViewInput): Promise<View | null> {
    const view = await this.viewModel
      .findOne({
        memberId: input.memberId,
        viewRefId: input.viewRefId,
      })
      .exec();

    if (!view) return null;
    return view.toObject();
  }

  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      const view = await this.viewModel.create(input);
      return view.toObject();
    } catch (err) {
      console.log("ERROR, model:insertMemberView", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ViewService;
