import Users from '../models/users.models';
import { Request, Response} from 'express';
import { User } from '../types';


async function collectUserInfo(req: Request, res: Response) {
  if (req.body.email) {
    try {
      //looks to see if email exists,
      const result = await Users.findOne({ email: req.body.email });
      //if it doesn't create a new 'user' in table with that email
      if (!result) {
        const newdoc = await Users.create({ email: req.body.email });
        res.status(200).send({ data: newdoc, error: null });
      } else {
        await result.populate('birdSightingsIds');
        // console.log("found")
        res.status(200).send({ data: result, error: null });
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).send({ data: null, error: err.message });
    }
  } else {
    res.status(500).send({ data: null, error: 'No email supplied.' });
  }
}

export default { collectUserInfo };