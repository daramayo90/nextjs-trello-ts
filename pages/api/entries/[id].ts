import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry } from '../../../interfaces';
import { EntryModel, IEntry } from '../../../models';

type Data = { message: string } | Entry | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Not a valid id: ' + id });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: 'Method does not exist' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await EntryModel.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: 'There is no entry with id: ' + id });
  }

  const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;

  /*
  const updatedEntry = await EntryModel.findByIdAndUpdate(
    id,
    { description, status },
    { runValidators: true, new: true },
  );

  res.status(200).json(updatedEntry!);
  */

  try {
    entryToUpdate.description = description;
    entryToUpdate.status = status;
    await entryToUpdate.save();
    await db.disconnect();
    res.status(200).json(entryToUpdate!);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: 'Bad request: ' + error.errors.status.message });
  }
};
