import { TweetService } from "../services/index.js";

const tweetService = new TweetService();

const createTweet = async (req, res) => {
  try {
    const data=req.body
    let payload={
      content:data.content,
      imageUrl:req.file.location
    }
    const response = await tweetService.create(payload);
    return res.status(201).json({
      message: "tweet created",
      data: response,
      success: "True",
      err: {},
    });
  } catch (error) {
    return res.status(401).json({
      message: "something went wrong, check your code Dumb",
      success: "Fail",
      err: error,
    });
  }
};

export { createTweet };
