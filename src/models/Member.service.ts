import { shapeIntoMogooseObjectId } from "../libs/config";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { Message, HttpCode } from "../libs/Errors";
import {
  Member,
  MemberInput,
  LoginInput,
  MemberUpdate,
} from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import * as bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  /** SPA  **/

  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toObject();
    } catch (err) {
      console.error("Erorr. model:signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    // TODO: Consider member status later
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1, memberEmail: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    if (member.memberEmail !== input.memberEmail) {
      throw new Errors(HttpCode.NOT_FOUND, Message.IS_NOT_EMAIL);
    }

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const fullMember = await this.memberModel.findById(member._id).exec();
    if (!fullMember)
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    return fullMember.toObject();
  }

  /** BSSR ADMINKA **/

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.SHEF,
      })
      .exec();

    if (!exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    console.log("password:", input.memberPassword);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toObject();
    } catch (err) {
      console.log("rocessSignup:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1, memberEmail: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    if (member.memberEmail !== input.memberEmail) {
      throw new Errors(HttpCode.NOT_FOUND, Message.IS_NOT_EMAIL);
    }

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const fullMember = await this.memberModel.findById(member._id).exec();
    if (!fullMember)
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    return fullMember.toObject();
  }

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({ memberType: MemberType.USER })
      .exec();

    if (!result || result.length === 0) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    }

    const users: Member[] = result.map((doc: any) => doc.toObject());
    return users;
  }

  public async updateChosenUser(input: MemberUpdate): Promise<Member> {
    input._id = shapeIntoMogooseObjectId(input._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result.toObject();
  }
}

export default MemberService;
