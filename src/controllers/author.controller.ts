import { T } from "../libs/types/common";
import { Request, Response } from "express";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import AuthorService from "../models/Author.service";

const authorController: T = {};
const authorService = new AuthorService();



export default authorController;
