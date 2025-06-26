import { T } from "../libs/types/common";
import { Request, Response } from "express";
import Errors, { Message } from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import AuthorService from "../models/Author.service";
import { AuthorInput, AuthorUpdateInput } from "../libs/types/author";

import fs from "fs";
import path from "path";

const authorController: T = {};
const authorService = new AuthorService();

authorController.getAllAuthors = async (req: Request, res: Response) => {
  try {
    console.log("getAllAuthors");
    const authors = await authorService.getAllAuthors();
    res.render("author", { authors });
  } catch (err) {
    console.log("Error, getAllAuthors:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

authorController.getAuthorById = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;
    if (!authorId)
      throw new Errors(HttpCode.BAD_REQUEST, Message.IS_NOT_PARAMS_ID);

    console.log("getAuthorById for id:", authorId);

    const result = await authorService.getAuthorById(authorId);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getAuthorById:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

authorController.createAuthor = async (req: Request, res: Response) => {
  try {
    console.log("createAuthor");
    const file = req.file;
    if (!file) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const newAuthor: AuthorInput = req.body;
    newAuthor.authorImage = file.path.replace(/\\/g, "/");

    const existing = await authorService.findByNick(newAuthor.authorNick);
    if (existing) {
      // Faylni o'chirish
      fs.unlink(path.resolve(file.path), (err) => {
        if (err) console.error("Failed to delete uploaded file:", err);
      });
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_ALREADY_AUTHOR_NICK);
    }

    if (typeof newAuthor.authorInterview === "string") {
      newAuthor.authorInterview = JSON.parse(newAuthor.authorInterview);
    }

    const result = await authorService.createAuthor(newAuthor);
    res.redirect("/admin/recipe/all");
  } catch (err) {
    console.log("Error, createAuthor:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

authorController.updateAuthor = async (req: Request, res: Response) => {
  try {
    console.log("updateMember");
    console.log("req.body =>", req.body);
    const authorId = req.params.id;
    const input: AuthorUpdateInput = req.body;
    if (req.file) input.authorImage = req.file.path.replace(/\\/, "/");
    const result = await authorService.updateAuthor(authorId, input);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateMember:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

authorController.deleteAuthor = async (req: Request, res: Response) => {
  try {
    console.log("deleteAuthor");
    await authorService.deleteAuthor(req.params.id);
    res.send("succesfull deleted");
  } catch (err) {
    console.log("Error, deleteAuthor:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default authorController;
