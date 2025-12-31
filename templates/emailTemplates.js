const accountCreationEmail = (user) => `
    <div>
        <h1 style="text-align: center; color: #00008b;">Account created successfully</h1>
        <p>Dear ${user.fullname},</p>
        <p>You have successfully created your Account</p>
        <p>Do not share your password with no one and do not reply to this email</p>
        <p>Best regards</p>
        <a href="#" style="text-align: center; color: #00008b;">Trackwise Expense</a>
    </div>
`;

const accountVerifiedEmail = (user) => `
    <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
            <tr>
                <td style="padding: 0;">
                    <table role="presentation" style="width: 100vw; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 1px;">
                                    📚 PATHLEARN
                                </h1>
                                <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">
                                    Your Journey to Knowledge Starts Here
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Main Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 24px; font-weight: 600;">
                                    Account Verified Successfully 🎉
                                </h2>
                                
                                <p style="margin: 0 0 16px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                    Hello <strong>${user.name || "Learner"}</strong>,
                                </p>
                                
                                <p style="margin: 0 0 16px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                    Congratulations! Your email has been successfully verified and your <strong>PathLearn</strong> account is now fully active.
                                </p>
                                
                                <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                    You can now access thousands of courses, connect with expert instructors, and start building your skills today!
                                </p>

                                <!-- Success Icon -->
                                <div style="text-align:center;margin:30px 0;">
                                    <div style="display:inline-block;width:80px;height:80px;border-radius:50%;background-color:#ddd6fe;line-height:80px;text-align:center;">
                                        <span style="font-size:40px;color:#8b5cf6;">✔️</span>
                                    </div>
                                </div>

                                <!-- CTA -->
                                <table role="presentation" style="margin: 30px 0;">
                                    <tr>
                                        <td style="text-align: center;">
                                            <a href="https://pathlearn.com/dashboard" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);">
                                                Start Learning Now
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                    Need help getting started? Our support team is here for you at 
                                    <a href="mailto:support@pathlearn.com" style="color: #6366f1; text-decoration: none;">support@pathlearn.com</a>.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f9fafb; padding: 30px; text-align: center;">
                                <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">
                                    Follow us on social media
                                </p>

                                <table role="presentation" style="margin: 0 auto;">
                                    <tr>
                                        ${["📘", "🐦", "📸", "💼"]
                                            .map(
                                                (icon) => `
                                                <td style="padding: 0 10px;">
                                                    <a href="#" style="color: #6366f1; text-decoration: none; font-size: 24px;">${icon}</a>
                                                </td>
                                            `
                                            )
                                            .join("")}
                                    </tr>
                                </table>

                                <p style="margin: 20px 0 10px 0; color: #9ca3af; font-size: 13px; line-height: 1.6;">
                                    &copy; 2025 PathLearn. All rights reserved.
                                </p>

                                <p style="margin: 0; color: #6b7280; font-size: 12px;">
                                    Empowering Learners Worldwide<br>
                                    <a href="#" style="color: #6366f1; text-decoration: none;">Unsubscribe</a> | 
                                    <a href="#" style="color: #6366f1; text-decoration: none;">Privacy Policy</a>
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </div>
`;

const resendOtpVerificationEmail = (user, otp) => `
    <div style="background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #6366f1; color: #ffffff; border-top-left-radius: 6px; border-top-right-radius: 6px;">
                    <h1 style="margin: 0; font-size: 24px;">📚 PathLearn</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                        Hello, ${user.name}!
                    </p>
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                        You requested a new verification code. Use the following OTP to verify your account: <strong>${otp}</strong>
                    </p>
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                        This code is valid for 5 minutes.
                    </p>
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                        If you did not request this email, please ignore it.
                    </p>
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                        Happy learning!
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #f3f4f6; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                        &copy; 2025 PathLearn. All rights reserved.
                    </p>
                </td>
            </tr>
        </table>
    </div>
`;

const sendResetPasswordLinkEmail = (user, resetLink) => `
    <div style="background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #6366f1; color: #ffffff; border-top-left-radius: 6px; border-top-right-radius: 6px;">
                    <h1 style="margin: 0; font-size: 24px;">📚 PathLearn</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="margin-bottom: 10px; color: #6b7280; font-size: 14px;">Hello, <strong>${user.name}</strong>!</p>
                    <p style="margin-bottom: 10px; color: #6b7280; font-size: 14px;">We received a request to reset your password. Click the button below to create a new one:</p>
                    <p style="text-align: center; margin: 20px 0;">
                        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 14px;">Reset Password</a>
                    </p>
                    <p style="margin-bottom: 10px; color: #6b7280; font-size: 14px;">If you didn't request this, please ignore this email. Your account remains secure.</p>
                    <p style="margin-bottom: 0; color: #6b7280; font-size: 14px;">Keep learning with <strong>PathLearn</strong>!</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 15px; text-align: center; background-color: #f3f4f6; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">&copy; ${new Date().getFullYear()} PathLearn. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </div>
`;

const loginAlertEmail = (loginDetails) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="padding: 20px; text-align: center; background-color: #6366f1; color: #ffffff; border-top-left-radius: 6px; border-top-right-radius: 6px;">
            <h2 style="margin: 0;"> 🚨Trackwise Security Alert</h2>
        </div>
        <div style="padding: 20px;">
            <h3 style="color: 00008b; margin-top: 0;">New Login Detected</h3>
            <p style="color: 00008b; line-height: 1.6;">A new login was detected on your Trackwise account.</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 5px 0; color: #4b5563;"><strong>Time:</strong> ${loginDetails.time}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>IP Address:</strong> ${loginDetails.ip}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Device:</strong> ${loginDetails.device}</p>
            </div>
            <p style="color: #dc2626; line-height: 1.6; font-weight: 500;">If this wasn't you, please change your password immediately and contact our support team.</p>
            <p style="text-align: center; margin: 20px 0;">
                <a href="mailto:support@Trackwise.com" style="display: inline-block; padding: 10px 20px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 14px;">Contact Support</a>
            </p>
        </div>
        <div style="padding: 15px; text-align: center; background-color: #f3f4f6; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
            <p style="margin: 0; color: 00008b; font-size: 12px;">&copy; ${new Date().getFullYear()} Trackwise. All rights reserved.</p>
        </div>
    </div>
`;

export { accountCreationEmail, accountVerifiedEmail, resendOtpVerificationEmail, sendResetPasswordLinkEmail, loginAlertEmail };
