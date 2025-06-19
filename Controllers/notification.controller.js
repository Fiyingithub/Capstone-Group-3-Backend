import User from "../Models/user.model.js";
import admin from "../Utils/firebase.js";


export const sendDailyReminders = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { fcmToken: { [Op.not]: null } },
    });
    const tokens = users.map((u) => u.fcmToken).filter(Boolean);

    if (!tokens.length) return res.json({ message: "No tokens available" });

    const response = await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title: "Daily Budget Reminder 💰",
        body: "New day, new budget! Track your spending goals for today.",
      },
    });

    res.json({
      sent: response.successCount,
      failed: response.failureCount,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred",
      error: true,
    });
  }
};
